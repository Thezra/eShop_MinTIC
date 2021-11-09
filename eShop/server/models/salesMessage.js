import mongoose from 'mongoose';

const salesSchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    price: String,
    state: String,
    selectedFile: String,
})

var SaleMessage = mongoose.model('SaleMessage', salesSchema);

export default SaleMessage;