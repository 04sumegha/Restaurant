const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Staff = require("../models/staff");

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

    let staff = await Staff.findOne({email: body.email});
    if(staff){
        return res.status(400).json({message: "Staff member already exists with this email"});
    }

    staff = new Staff({
        name: body.name,
        email: body.email,
        password: body.password
    });
    const salt = await bcrypt.genSalt(10);
    staff.password = await bcrypt.hash(body.password, salt);

    try {
        await staff.save();
    } 
    
    catch (error) {
        return res.status(500).json({message: "Staff could not be saved"});
    }

    let token;
    try {
        token = jwt.sign({staffId: staff._id, email: staff.email}, process.env.JWT_SECRET, {expiresIn: "1d"});
    } 
    
    catch (error) {
        return res.status(500).json({message: "Token not generated"});    
    }

    return res.status(201).json({success: true, data: {staffId: staff._id, email: staff.email, token: token}});
}
module.exports.register = register;

const login = async(req, res) => {
    const body = req.body;

    if(!body.email){
        return res.status(400).json({message: "Please enter your password"});
    }
    if(!body.password){
        return res.status(400).json({message: "Please enter your password"});
    }

    let staff = await Staff.findOne({email: body.email});
    if(!staff){
        return res.status(400).json({message: "Staff member does not exist with this email. Please check your credentials"});
    }

    let isMatch = await bcrypt.compare(body.password, staff.password);
    if(!isMatch){
        return res.status(400).json({message: "Incorrect password"});
    }

    let token;
    try {
        token = jwt.sign({staffId: staff._id, email: staff.email}, process.env.JWT_SECRET, {expiresIn: "1d"});
    } 
    
    catch (error) {
        return res.status(500).json({message: "Token not generated"});    
    }

    return res.status(200).json({success: true, data: {staffId: staff._id, email: staff.email, token: token}});
}
module.exports.login = login;