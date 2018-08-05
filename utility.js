const _ = require('lodash');

class Utility{
    static onlyNotEmpty(req) {
        const out = {};
        _(req.body).forEach((value, key) => {
            if (!_.isEmpty(value)) {
                out[key] = value;
            }
        });

        return out;
    }
}
module.exports=Utility