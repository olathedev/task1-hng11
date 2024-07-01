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
exports.sayHello = void 0;
const axios_1 = __importDefault(require("axios"));
const sayHello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIp = req.socket.remoteAddress;
    const userName = req.query.visitors_name;
    try {
        console.log(userIp);
        const userLocation = yield axios_1.default.get(`http://ip-api.com/json/${userIp}`);
        console.log(userLocation);
        const resObj = {
            clientIp: userIp,
            location: userLocation.data.city,
            greeting: `hello ${userName} the temprature is 11 in ${userLocation.data.city}`
        };
        res.status(200).json(resObj);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        });
    }
});
exports.sayHello = sayHello;
