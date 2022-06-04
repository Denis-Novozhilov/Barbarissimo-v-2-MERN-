const { Schema, model } = require('mongoose');

const schema = new Schema({
    russian: { type: String, required: true},
    spanish: { type: String, required: true},
    english: { type: String, required: true},
    german: { type: String, required: true},
    additional: { type: String}
});

module.exports = model('CommonPhrase', schema);