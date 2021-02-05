const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {

        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({ message: 'Нет авторизации' })
        }

        const decoded = jwt.verify(token, "Alina secret str")
        req.user = decoded
        next()

    } catch (e) {
        res.status(401).json({ message: 'Нет авторизации' })
    }
}
