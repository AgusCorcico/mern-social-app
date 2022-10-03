const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt"); //para encriptar las passwords



//REGISTER
router.post("/register", async(req,res)=>{
    try{
        //gererando nueva password
        const salt = await bcrypt.genSalt(10); //para que el algoritmo hash no sea predecible la misma password ya no genera el mismo hash.
                                                // a mayor valor del genSalt mas tiempo tarda el algoritmo hash
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        //creando newUser 
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword,
        })
        //guardando y retornando newUser
        const user = await newUser.save();
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
});

//LOGIN
router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email}); //findOne porque solo hay un usuario que va a coincidir con el req
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")

        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err)
    }

});


module.exports = router;