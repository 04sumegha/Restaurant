const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const register = async(req, res) => {
    const body = req.body;
    
    if(!body.name){
        return res.status(400).json({message: "Please enter your name"});
    }
    if(!body.email){
        return res.status(400).json({message: "Please enter your email"});
    }
    if(!body.password){
        return res.status(400).json({message: "Please enter the password"});
    }

    let user = await User.findOne({email: body.email});
    if(user){
        return res.status(400).json({message: "User already exists"});
    }

    user = new User({
        name: body.name,
        email: body.email,
        password: body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(body.password, salt);

    try {
        await user.save();
    } 
    
    catch (error) {
        return res.status(500).json({message: "Could not save user"});
    }

    let token;
    
    try {
        token = jwt.sign({userId: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: "1d"});
    } 
    
    catch (error) {
        return res.status(500).json({message: "Token not generated"});
    }

    return res.status(201).json({success: true, data: {userId: user._id, email: user.email, token: token}});
}
module.exports.register = register;

const login = async(req, res) => {
    const body = req.body;

    if(!body.email){
        return res.status(400).json({message: "Please enter your email"});
    }
    if(!body.password){
        return res.status(400).json({message: "Please enter your password"});
    }

    let user = await User.findOne({email: body.email});
    if(!user){
        return res.status(400).json({message: "User does not exist with this email. Please check your credentials again"});
    }
    
    const isMatch = await bcrypt.compare(body.password, user.password);
    if(!isMatch){
        return res.status(400).json({message: "Invalid password"});
    }

    let token;
    
    try {
        token = jwt.sign({userId: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: "1d"});
    } 
    
    catch (error) {
        return res.status(500).json({message: "Token not generated"})    
    }

    return res.status(200).json({success: true, data: {userId: user._id, email: user.email, token: token}});
}
module.exports.login = login;