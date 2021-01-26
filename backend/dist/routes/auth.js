"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var router = express_1.default.Router();
router.post('/login', function (req, res, next) {
    passport_1.default.authenticate('local', { session: false }, function (err, user) {
        if (err || !user)
            return res.status(200).json({
                code: 400,
                message: '사용자 정보가 없습니다.',
            });
        console.log(user);
        req.login(user, { session: false }, function (error) {
            if (error)
                next(error);
            var token = jsonwebtoken_1.default.sign({
                username: user.username,
            }, process.env.JWT_KEY || '', { expiresIn: '5m' });
            return res.json({ token: token });
        });
    })(req, res);
});
exports.default = router;
//# sourceMappingURL=auth.js.map