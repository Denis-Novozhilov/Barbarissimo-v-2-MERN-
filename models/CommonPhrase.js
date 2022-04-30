const { Schema, model } = require('mongoose');

const schema = new Schema({
    Russian: { type: String, required: true},
    Spanish: { type: String, required: true},
    English: { type: String, required: true},
    German: { type: String, required: true},
    Additional: { type: String}
});

module.exports = model('CommonPhrase', schema);