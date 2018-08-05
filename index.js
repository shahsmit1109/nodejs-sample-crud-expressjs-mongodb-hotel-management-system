var cluster = require('cluster');
if (cluster.isMaster) {
    var numWorkers = require('os').cpus().length;
    console.log('Master cluster setting up ' + numWorkers + ' workers...');
    for (var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }
    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });
    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    var express = require('express');
    var path = require('path');
    var rfs = require('rotating-file-stream');
    var bodyParser = require('body-parser');
    var morgan = require('morgan');
    var compression = require('compression');
    var app = express();
    var fs = require('fs');
    var mongoose = require('mongoose');
    var swaggerUi = require('swagger-ui-express');
    var swaggerDocument = require('./swagger.json');
    var env = require('dotenv').config();
    var logger = require('./logger.js');

    mongoose.Promise = global.Promise;

    mongoose.connect('mongodb://localhost:27017/hms')
        .then(() => logger.info('connection succesful'))
        .catch((err) => {
            console.error(err);
            process.exit();
        });

    var logDirectory = path.join(__dirname, 'log');

    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    var accessLogStream = rfs('access.log', {
        interval: '1d', // rotate daily
        path: logDirectory
    })

    app.use(bodyParser.urlencoded({
        verify: rawBodySaver,
        extended: true
    }));

    app.use(bodyParser.json({
        verify: rawBodySaver
    }));

    app.use(bodyParser.raw({
        verify: rawBodySaver,
        type: true
    }));

    app.use(morgan('combined', {
        stream: accessLogStream
    }));

    app.use(express.static("."));

    app.use(require('./routes'));

    app.use(compression());

    app.use('/swagger',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    var rawBodySaver = function(req, res, buf, encoding) {
        if (buf && buf.length) {
            req.rawBody = buf.toString(encoding || 'utf8');
        }
    }
    app.listen(process.env.PORT, function() {
        logger.info('Magic happens on port 3001!');
    });
}