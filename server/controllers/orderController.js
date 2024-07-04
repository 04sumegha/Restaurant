const express = require("express");
const Order = require("../models/order");
const User = require("../models/user");

const create = async (req, res) => {
    const body = req.body;
    
    const userId = req.userId;
    let userDetails = await User.findOne({email: req.email});

    if(!body.tableNumber){
        return res.status(400).json({message: "Table number is required"});
    }
    if(!body.items.name){
        return res.status(400).json({message: "Name of the item is required"});
    }
    if(!body.items.quantity){
        return res.status(400).json({message: "Quantity of the item is required"});
    }
    if(!body.items.price){
        return res.status(400).json({message: "Price of the item is required"});
    }
    if(!body.totalAmount){
        return res.status(400).json({message: "Total amount is required"});
    }

    let order = new Order({
        userId: userId,
        tableNumber: body.tableNumber,
        items: body.items,
        totalAmount: body.totalAmount
    });

    try {
        await order.save();
    } 
    
    catch (error) {
        return res.status(500).json({message: "Order could not be saved"});    
    }

    return res.status(201).json({
        success: true,
        data: {
          orderId: order._id,
          orderBy: userDetails.name,
          order: {
            tableNumber: order.tableNumber,
            items: order.items,
            totalAmount: order.totalAmount,
            status: order.status,
          },
        },
      });
}
module.exports.create = create;

const get = async (req, res) => {
    let orders;
    try {
        orders = await Order.find();
    } 
    
    catch (error) {
        return res.status(500).json({message: "Orders could not be found"});    
    }

    return res.status(200).json(orders);
}
module.exports.get = get;

const update = async(req, res) => {
    const orderId = req.query._id;

    let order;
    try {
        order = await Order.findById(orderId);
    } 
    
    catch (error) {
        return res.status(404).json({message: "Order could not be found"});    
    }

    order.status = "completed";
    
    try {
        await order.save();
    } 
    
    catch (error) {
        return res.status(500).json({message: "Order could not be updated"});    
    }

    return res.status(200).json(order);
}
module.exports.update = update;