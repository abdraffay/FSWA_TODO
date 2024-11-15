const { UserRegistration } = require("../Models/Registration");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// METHOD     POST
//@API        https://localhost:5000/user

async function CreateUser(req, res) {
    try {
        const { userName, userEmail, userAge, userPassword } = req.body;

        const userName_checker = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
        const userEmail_checker = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const userExists = await UserRegistration.findOne({ userEmail });

        if (userExists) {
            return res.status(400).send({ "error": "This email is taken, try a different one" });
        }
        const userNameExists = await UserRegistration.findOne({ userName });
        
        if (userNameExists) {
            return res.status(400).send({ "error": "This username is taken, try a different one" });
        }

        if (!userName_checker.test(userName)) {
            return res.status(400).send({ "error": "User name can contain only letters" });
        }
        if (!userEmail_checker.test(userEmail)) {
            return res.status(400).send({ "error": "Invalid Email address" });
        }
        if (userPassword.length < 8) {
            return res.status(400).send({ "error": "Password must be 8 characters long" });
        }
        if (userAge < 15) {
            return res.status(400).send({ "error": "User must be 15 or older" });
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const user = await UserRegistration.create({
            userName: userName,
            userEmail: userEmail,
            userAge: userAge,
            userPassword: hashedPassword
        });

        if (user) {
            return res.status(201).send({ "message": "User registered successfully!" });
        } else {
            return res.status(500).send({ "error": "Failed to register user" });
        }
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

// METHOD     POST
//@API        https://localhost:5000/login

async function loginUser(req, res) {
    try {
        const { userName, userPassword } = req.body;
        console.log(userName);

        const user = await UserRegistration.findOne({ userName: userName });

        console.log(user);

        if (!user) {
            return res.status(400).send({ "error": "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
        if (!isPasswordValid) {
            return res.status(400).send({ "error": "Invalid password" });
        }

        const token = jwt.sign(
            { userId: user.id, userName: user.userName },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).send({ "message": "Login successful", token });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = { CreateUser, loginUser };
