'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema,
    cardSchema = new Schema({
        name: String,
        imgUrl: String
});

export default mongoose.model('Cards', cardSchema);