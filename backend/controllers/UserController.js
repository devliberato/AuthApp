const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const secret = process.env.KEY_AUTH_SECRET
const jwt = require("jsonwebtoken")

//helpers
const createToken = require("../helpers/create-token")
const getToken = require("../helpers/get-token")
const getTokenUser = require("../helpers/get-token-user")

module.exports = class UserController {
    static async register(req, res) {
        const {name, email, phone, password, confirmpassword} = req.body;

        if(!name) {
          return  res.status(422).json({message: "O nome é obrigatório"})
        }
        if(!email) {
           return res.status(422).json({message: "O email é obrigatório"})
        }
        
           const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+$/;
         if (!emailRegex.test(email)) {
    return res.status(422).json({ message: "Formato de e-mail inválido" });
        
}   
        if(!phone) {
           return res.status(422).json({message: "O número de telefone é obrigatório"})
            
        }
       
        if(!password) { 
           return  res.status(422).json({message: "A senha é obrigatória"})
        }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if(!passwordRegex.test(password)) {
          return  res.status(422).json({message: "A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial"})
            }
        
        if(!confirmpassword) {
          return  res.status(422).json({message: "A confirmação de senha é obrigatória"})
        }

        const userExists = await User.findOne({email: email});
        if(userExists) {
            return res.status(422).json({message: "Utilize outro e-mail para cadastro"})
        }

        if(password !== confirmpassword) {
           return  res.status(422).json({message: "As senhas não coicidem"})
        }
        
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {

            const newUser = user.save();
            await createToken(newUser, req, res);
            
            
        } catch (error) {
            res.status(500).json({message: error})
        }

        console.log(req.body);

    }

    static async login(req, res) {
        const {email, password} = req.body;

        if(!email) {
           return res.status(422).json({message: "O email é obrigatório para login!"})
        }
         if(!password) {
           return res.status(422).json({message: "A senha é obrigatória para login!"})
        }
       const user = await User.findOne({email: email})

       if(!user) {
        return res.status(422).json({message: "Esse email não existe, tente novamente!"})
       }
       const checkPassword = await bcrypt.compare(password, user.password);
       if(!checkPassword) {
        return res.status(422).json({message: "A senha está inválida, tente novamente!"})
       }

       await createToken(user, req, res);
    }


      static async checkUser(req, res) {
         let currentUser;
          
         if(req.headers.authorization) {
          const token = getToken(req);
          const decoded = jwt.verify(token, secret);
          currentUser = await User.findById(decoded.id)
          currentUser.password = null;
         } else {
          currentUser = null
         }
    
         res.status(200).send(currentUser);
    
    
        }

    static async getUserById(req, res) {
        const id = req.params.id;

        const user = await User.findById(id).select("-password");
        if(!user) {
            return res.status(422).json({message: "Usuário não foi encontrado"})
        }
        res.status(200).json( {user})
    }

    static async editProfile(req, res) {

        const token = getToken(req);
        const user = await getTokenUser(token);

        const {name, email, phone, password, confirmpassword} = req.body;

        if(req.file) {
            user.image = req.file.filename
        }


         if(!name) {
          return  res.status(422).json({message: "O nome é obrigatório"})
        }
        user.name = name;
        if(!email) {
           return res.status(422).json({message: "O email é obrigatório"})
        }
        
           const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+$/;
         if (!emailRegex.test(email)) {
    return res.status(422).json({ message: "Formato de e-mail inválido" });
        
}
const emailExists = await User.findOne({email: email});

if(user.email !== email && emailExists) {
  return  res.status(422).json({message: "Este e-mail já foi cadastrado, insira outro"})
}
user.email = email;


        if(!phone) {
            return res.status(422).json({message: "O número de telefone é obrigatório"})
        
            
        }
        user.phone = phone;

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if(!passwordRegex.test(password)) {
          return  res.status(422).json({message: "A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial"})
            }

      

            if(password !== confirmpassword) {
              return  res.status(422).json({message: "As senhas não coicidem"})
            } else if (password === confirmpassword && password !== null) {
                const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        user.password = passwordHash;

            }
        try {
         await User.findOneAndUpdate({
                _id: user._id,
            }, {$set: user}, {new: true})

            res.status(200).json({message: "Usuário atualizado!"})
            
        } catch (error) {
        res.status(500).json({message: error})
            
        }
       
        
    }
}