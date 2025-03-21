import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const {email, password, name} = req.body;   // data received from the user
    try {  
        if(!email || !password || !name) {      // if any field is missing
            throw new Error("All fields are required"); 
            // return res.status(400).json({message: "All fields are required"});  // 400->Bad Request
        }

        const userAlreadyExist = await User.findOne({email});   // check if user already exists
        if(userAlreadyExist) {
            // throw new Error("User already exists with this email");
            return res.status(400).json({success: false, message: "User already exists with this email"});  // 400->Bad Request
        }

        const hashedPassword = await bcryptjs.hash(password, 10);   // hash the password
        const verificatationToken = Math.floor(100000 + Math.random() * 900000).toString();  // generate verification token
        const user = new User({
            email: email,
            password: hashedPassword,
            name: name,
            verificationToken: verificatationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        });

        await user.save();   // save the user to the databaseq
        
        // jwt
        

    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}

export const login = async (req, res) => {
    res.send('login page');
}

export const logout = async (req, res) => {
    res.send('logout page');
}