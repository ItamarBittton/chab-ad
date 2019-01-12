const joi = require('joi');
const adScheme = joi.object().keys({
    campaign_id: joi.string().required(),
    campaign_name: joi.string().allow('').optional(),
    ad_id: joi.string().required(),
    positions: joi.array().min(1).required(),
    url: joi.string().required(),
    onclick: joi.string().allow('').optional(),
    size: joi.string().required(),
    clicks: joi.number().required(),
    views: joi.number().required(),
    platform: joi.array().min(1).required(),
    sites: joi.array().min(1).required(),
    positions_names: joi.array().min(1).required(),
    expiration_date: joi.string().required(),
    starting_date:  joi.string().required()
});

const scheme = joi.object().keys({
    ads: joi.array().items(adScheme).required()
});

module.exports = (req, res, next) => {
    joi.validate(req.body, scheme, (err) => {
        if(err){
            res.status(400).send(err.details[0].message);
        } else {
            next();
        }
    });
}