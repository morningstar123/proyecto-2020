const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");


const User = require("../models/user");
/*
Rutas que entran al servidor de la API Node.js
encrypta la contraseña y guarda el usuario en la db
*/
router.post("/signup", (req,res,next)=>{
  bcrypt.hash(req.body.password,10).then(hash=>{
    const user= new User({
      email: req.body.email,
      password: hash
    });
    user.save()
    .then(result =>{
      res.status(201).json({
        message: 'User created',
        result: result
      });
    })
    .catch(err =>{
      res.status(500).json({
        error:err
      });
    });
  });
});


//rescata el usuario desde la db y genera token de sesión
router.post("/login", (req,res,next) =>{
  let fetchedUser;
      User.findOne({ email: req.body.email })
      .then(user =>{

        if(!user){
          return res.status(401).json({
            message: "Auth failed user"+user
          });

        } fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      }).then(result =>{
        if(!result){
          return res.status(401).json({
            message: "Auth failed result"
          });
        }
        const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id},
           'secret_this_should_be_longer',
            { expiresIn: "1h"}
            );
            console.log(token);
          res.status(200).json({

            token:token,
            message: "Auth Authorized",
            expiresIn: 3600
          })
      })
      .catch(err =>{
        console.log(err);
        return res.status(401).json({

          message: "Error"
        });
      });
    });

module.exports = router;
