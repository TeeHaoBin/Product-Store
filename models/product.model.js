import mongoose from "mongoose";

/*
    Create a schema for the product
*/
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true    // automatically create "createdAt" and "updatedAt" fields
});


/*
    Create a model from the schema
*/
const Product = mongoose.model('Product', productSchema);   // 'Product' should be singular and capital letter because it will be converted to plural and lowercase in MongoDB automatically

export default Product;     // to be imported in different files