const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs')
const auth =require('../../middleware/auth');
const User = require('../../models/User');
const jwt= require('jsonwebtoken');
const config= require('config');


const {check,validationResult} = require('express-validator/check');
//@route     GET api/auth
//@desc      Test route
//@access    Public

router.get('/',auth, async(req,res)=>{                  
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
        console.log('a')
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error');

    }
});



//@route     POST api/user
//@desc      Authenticate User & get token
//@access    Public

router.post('/',[
    
    check('email','Please include a valid email').isEmail(),
    check('password','password is required').exists()
],
async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email,password} = req.body;
    try{
     //see if user exits
     let user =await User.findOne({email});
     
     if (!user){
        return res.status(400).json({errors : [{msg: 'Invalid Credentials'}]});
     }

    const isMatch = await bcrypt.compare(password,user.password);

    if (!isMatch){
        return res.status(400).json({errors : [{msg: 'Invalid Credentials'}]});

    }


    //return jsonwebtoken
    const payload ={
        user:{
            id: user.id
        }
    }

    jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn: 36000}, // before deploy change it to 360
        (err,token)=>{
            if (err)throw err;
            res.json({token});
        });

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }


    
});



module.exports = router;