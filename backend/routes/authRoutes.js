import express from "express";
const router =express.Router();


 router.get("/register", (req, res)=>{
    res.send("Register Routes");
 });

 router.get("/login", (req, res)=>{
    res.send("login Routes");
 });

 router.get("/logout", (req, res)=>{
    res.send("Logout Routes");
 });

 export default router;