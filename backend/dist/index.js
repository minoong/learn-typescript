"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_session_1 = __importDefault(require("express-session"));
var dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var passport_1 = __importDefault(require("passport"));
var index_1 = __importDefault(require("./passport/index"));
var mongoose_1 = __importDefault(require("mongoose"));
var User_1 = require("./entity/User");
var auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config();
typeorm_1.createConnection()
    .then(function (connection) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // console.log('Inserting a new user into the database...');
                // const user = new User();
                // user.firstName = 'Timber';
                // user.lastName = 'Saw';
                // user.age = 25;
                // await connection.manager.save(user);
                // console.log('Saved a new user with id: ' + user.id);
                console.log('Loading users from the database...');
                return [4 /*yield*/, connection.manager.find(User_1.User)];
            case 1:
                users = _a.sent();
                console.log('Loaded users: ', users);
                console.log('Here you can setup and run express/koa/any other framework.');
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (error) { return console.log(error); });
var _a = process.env, PORT = _a.PORT, MONGO_URI = _a.MONGO_URI;
mongoose_1.default
    .connect(MONGO_URI || '', {
    useNewUrlParser: true,
    useFindAndModify: false,
    dbName: 'api3',
})
    .then(function () {
    console.log();
    console.log('Connected to MongoDB');
})
    .catch(function (e) {
    console.error(e);
});
var app = express_1.default();
app.set('port', process.env.PORT || 8001);
app.use(morgan_1.default('dev'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default(process.env.COOKIE_KEY));
app.use(express_session_1.default({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_KEY || 'LMW',
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport_1.default.initialize());
index_1.default();
// session 사용시
// app.use(passport.session());
app.use('/auth', auth_1.default);
// jwt test
app.get('/', passport_1.default.authenticate('jwt', { session: false }), function (req, res, next) {
    console.log('hello');
    res.status(200).json({
        code: 200,
        message: 'logined',
    });
});
app.listen(app.get('port'), function () {
    console.log("server is started [" + app.get('port') + "]");
});
//# sourceMappingURL=index.js.map