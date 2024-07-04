const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: 'UserSchema',
        required: [true, 'User Id is required']
    },
    tableNumber: {
        type: Number,
        required: [true, 'Table number is required']
    },
    items: [{
        name: {
            type: String,
            required: [true, 'Name of item is required']
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity of the item is required'],
            default: 1
        },
        price: {
            type: Number,
            required: [true, 'Price of one item is required']
        }
    }],
    totalAmount: {
        type: Number,
        required: [true, 'Total price of the order is required']
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    }
});

module.exports = mongoose.model("Order", OrderSchema);