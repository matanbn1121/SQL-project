"use strict";
// src/server.ts - Express MySQL User Registration
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
exports.__esModule = true;
var express_1 = require("express");
var promise_1 = require("mysql2/promise");
var bcrypt_1 = require("bcrypt");
var dotenv_1 = require("dotenv");
var jwt = require('jwt-simple');
var cors_1 = require("cors");
dotenv_1["default"].config();
// Create the Express application
var app = express_1["default"]();
var PORT = process.env.PORT || 3000;
var myPassword = process.env.myPassword;
var secret = process.env.secret;
app.use(cors_1["default"]({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
    credentials: true
}));
// Configure middleware
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
// Create MySQL connection pool
var pool = promise_1["default"].createPool({
    host: 'localhost',
    user: 'root',
    password: myPassword,
    database: 'ecommerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// Define route handlers with the correct type
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, email, saltRounds, hashedPassword, result, insertResult, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, username = _a.username, password = _a.password, email = _a.email;
                console.log(username, email, password);
                // Basic validation
                if (!username || !email || !password) {
                    res.status(400).json({ message: 'All fields are required' });
                    return [2 /*return*/];
                }
                saltRounds = 10;
                return [4 /*yield*/, bcrypt_1["default"].hash(password, saltRounds)];
            case 1:
                hashedPassword = _b.sent();
                return [4 /*yield*/, pool.execute('insert into users (user_name, user_password, user_email) values (?, ?, ?)', [username, hashedPassword, email])];
            case 2:
                result = (_b.sent())[0];
                console.log("results", result);
                insertResult = result;
                res.status(201).json({
                    success: true,
                    message: 'User registered successfully',
                    userId: insertResult.insertId
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error('Registration error:', error_1);
                res.status(500).json({
                    success: false,
                    message: 'Error registering user',
                    error: error_1.message
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, rows, users, user, isMatch, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                console.log(email);
                console.log(password);
                // Basic validation
                if (!email || !password) {
                    res.status(400).json({ message: 'Email and password are required' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, pool.execute('SELECT * FROM users WHERE user_email = ?', [email])];
            case 1:
                rows = (_b.sent())[0];
                users = rows;
                console.log(users);
                if (users.length === 0) {
                    res.status(401).json({ message: 'Invalid credentials' });
                    return [2 /*return*/];
                }
                user = users[0];
                return [4 /*yield*/, bcrypt_1["default"].compare(password, user.user_password)];
            case 2:
                isMatch = _b.sent();
                if (!isMatch) {
                    res.status(401).json({ message: 'Invalid credentials' });
                    return [2 /*return*/];
                }
                token = jwt.encode({ id: user.user_id }, secret, 'HS256', 'none');
                res.cookie('token', token, { httpOnly: true, secure: false });
                res.status(200).json({
                    success: true,
                    message: 'Login successful'
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error('Login error:', error_2);
                res.status(500).json({
                    success: false,
                    message: 'Error during login',
                    error: error_2.message
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var AddProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, products_name, products_price, products_description, products_imageUrl, result, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, products_name = _a.products_name, products_price = _a.products_price, products_description = _a.products_description, products_imageUrl = _a.products_imageUrl;
                console.log(products_name);
                console.log(products_price);
                console.log(products_description);
                console.log(products_imageUrl);
                if (!products_description || !products_imageUrl || !products_name || !products_price) {
                    res.status(400).json({ message: 'Data are required' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, pool.execute('insert into products (products_name, products_price, products_description, products_imageUrl) values (?, ?, ?, ?)', [products_name, products_price, products_description, products_imageUrl])];
            case 1:
                result = (_b.sent())[0];
                console.log("results", result);
                res.status(200).json({
                    success: true,
                    message: 'added product successful!'
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                console.error('insert new products error:', error_3);
                res.status(500).json({
                    success: false,
                    message: 'Error add products',
                    error: error_3.message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var ShowAllProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.execute('select * from products')];
            case 1:
                result = (_a.sent())[0];
                console.log("results", result);
                res.status(200).json({
                    success: true,
                    message: 'show all products',
                    result: result
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error('insert new products error:', error_4);
                res.status(500).json({
                    success: false,
                    message: 'Error add products',
                    error: error_4.message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Register routes
app.post('/api/users/register', registerUser);
app.post('/api/users/login', loginUser);
app.post('/api/products/addProduct', AddProduct);
app.get('/api/products/showAllProducts', ShowAllProducts);
// Create the users table if it doesn't exist
var initializeDatabase = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pool.execute("\n        CREATE TABLE IF NOT EXISTS users (\n        id INT AUTO_INCREMENT PRIMARY KEY,\n        username VARCHAR(50) NOT NULL,\n        email VARCHAR(100) NOT NULL UNIQUE,\n        password VARCHAR(255) NOT NULL,\n        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n      )\n    ")];
            case 1:
                _a.sent();
                console.log('Database initialized successfully');
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error('Database initialization failed:', error_5);
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Start the server
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, initializeDatabase()];
            case 1:
                _a.sent();
                app.listen(PORT, function () {
                    console.log("Server running on http://localhost:" + PORT);
                    console.log('Available routes:');
                    console.log('POST /api/users/register - Register a new user');
                    console.log('POST /api/users/login - Login a user');
                });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error('Server startup failed:', error_6);
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
startServer();
