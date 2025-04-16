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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, number } = req.body;
        if (!name || !email || !number) {
            return res
                .status(400)
                .json({ message: "Please provide name, email, and number." });
        }
        const newUser = new user_1.default({ name, email, number });
        yield newUser.save();
        return res.status(201).json({ message: "User saved successfully!" });
    }
    catch (error) {
        console.error("Error saving user:", error);
        if (error.code === 11000) {
            return res.status(409).json({ message: "Email already exists." });
        }
        return res.status(500).json({ message: "Failed to save user." });
    }
});
exports.createUser = createUser;
