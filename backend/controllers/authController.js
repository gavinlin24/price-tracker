const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: "All fields required"})
    }

    const user = await User.findOne({ username }).exec()

    if(!user) {
        return res.status(401).json({ message: "Unauthorized User"})
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        return res.status(401).json({ message: "Incorrect Password"})
    }

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": user.username
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '60s'}
    )

    const refreshToken = jwt.sign(
        { "username": user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.json({ accessToken })
})

const refresh = (req, res) => {
    const cookies = req.cookies
    
    if(!cookies?.jwt) {
        console.log("this ran");
        return res.status(401).json({ message: "Unauthorized User"})
    }

    const refreshToken = cookies.jwt

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async(err, decoded) => {
            if(err) {
                return res.status(403).json({ message: "Forbidden" })
            }
            
            const user = await User.findOne({ username: decoded.username })

            if(!user) {
                console.log("second this ran");
                return res.status(401).json({ message: "Unauthorized User"})
            }

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": user.username
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s'}
            )

            res.json({ accessToken })
        })
    )
}

const logout = (req, res) => {
    const cookies = req.cookies

    if(!cookies?.jwt) {
        return res.sendStatus(204)
    }

    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    })

    res.json({ message: "Cookie cleared" })
}

module.exports = {
    login,
    refresh,
    logout
}