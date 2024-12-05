"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = void 0;
exports.addClient = addClient;
exports.register = register;
exports.login = login;
const ClientModel_1 = require("../../model/clients/ClientModel");
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = Number(process.env.SALT_BCRYPT) || 10;
exports.secret = process.env.SECRET_JWT || "secret";
async function addClient(req, res) {
    try {
        const { firstName, password, lastName, email, phone, } = req.body;
        console.log(phone);
        //send request to DB
        const result = await ClientModel_1.ClientModel.create({
            firstName,
            password,
            lastName,
            email,
            phone,
        });
        console.log(result);
        if (!result) {
            return res.status(400).send({ error: "Couldn't create new user" });
        }
        return res.status(201).send({ message: "Client created successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
}
async function register(req, res) {
    try {
        const { firstName, lastName, email, password, phone } = req.body;
        if (!firstName || !lastName || !email || !password || !phone) {
            throw new Error('Please fill all fields');
        }
        //hash password
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        //send request to DB
        await ClientModel_1.ClientModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone
        });
        return res.status(201).send({ message: "User registered successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw new Error("Please fill all fields");
        // Find user by email
        const user = await ClientModel_1.ClientModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: "Invalid email or password" });
        }
        if (!user.password)
            throw new Error("Invalid email or password");
        //compare password
        const match = await bcrypt_1.default.compare(password, user.password);
        console.log("is match", match);
        if (!match) {
            return res.status(400).send({ error: "Invalid email or password" });
        }
        //encode user id and role in token
        const token = jwt_simple_1.default.encode({ id: user._id, role: "user" }, exports.secret);
        //send cookie to client
        res.cookie('user', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
        return res.status(200).send({ message: "Login successful" });
    }
    catch (error) {
        if (error.code = "11000") {
            res.status(400).send({ error: "user already exists" });
        }
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
}
