const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    description: {
        required: true,
        type: String,
        maxlength: 10000
    },
    price: {
        required: true,
        type: Number,
        maxlength: 255
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    },
    shipping: {
        required: true,
        type: Boolean
    },
    available: {
        required: true,
        type: Boolean
    },
    wood: {
        type: Schema.Types.ObjectId,
        ref: "Wood",
        required: true
    },
    // frets: {
    //     required: true,
    //     type: String,
    //     maxlength: 255
    // },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    publish: {
        required: true,
        type: Boolean
    },
    images:{
        type: Array,
        default:[]
    }
},{timestamps:true}); 

const Product = mongoose.model('Product', productSchema);
module.exports = { Product };