"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var passport_1 = __importDefault(require("passport"));
var passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
var Schema = mongoose_1.default.Schema;
console.log('@@@@@@@@@@@@@@@@@@@@@@@@@', mongoose_1.default.modelNames());
var UserModel = mongoose_1.default.model('user');
// const UserSchema = mongoose.model('User').schema;
UserModel.schema.plugin(passport_local_mongoose_1.default, {
    usernameField: 'email',
});
var passportConfig = function () {
    console.log('zzzz');
    passport_1.default.use(UserModel.createStrategy());
    passport_1.default.serializeUser(UserModel.serializeUser);
    passport_1.default.deserializeUser(UserModel.deserializeUser);
};
exports.default = passportConfig;
//# sourceMappingURL=passport.js.map