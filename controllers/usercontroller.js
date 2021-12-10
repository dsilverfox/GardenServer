const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const { UserModel } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// User test - Verified
router.get('/test', (req, res) => {
    res.send('You have reached the usercontroller!')
});

//User Register
router.post("/register", async (req, res) => {
    let { email, password } = req.body.user;
    console.log(req.body.user);
    try {
        const User = await UserModel.create({
            email: email,
            password: bcrypt.hashSync(password, 13)
        });
        console.log(User)
       
        let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24,
        });

        res.status(201).json({
            message: "User successfully registered",
            user: User,
            sessionToken: token,
        });

    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            });
        } else {
            res.status(500).json({
                message: "Failed to register user",
            });
        }
    }
});

//User Login
router.post("/login", async (req, res) => {
    let { email, password } = req.body.user;

    try {
        const loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
        });
        if (loginUser) {
            let passwordComparison = await bcrypt.compare(
                password,
                loginUser.password
            );

            if (passwordComparison) {
                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24,
                });

                res.status(200).json({
                    message: "User successfully logged in!",
                    user: loginUser,
                    sessionToken: token,
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password",
                });
            }
        } else {
            res.status(401).json({
                message: "Incorrect email or password",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "No login for you!",
        });
    }
});


module.exports = router;