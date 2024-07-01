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
const getIp_utils_1 = require("../utils/getIp.utils");
const myApiKey = 'aaac1450c370507a325bb559024a67c5';
const sayHello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const userIp = req.ip
    const userIp = (0, getIp_utils_1.getIp)(req);
    const userName = req.query.visitors_name;
    try {
        console.log(userIp, "sent a request");
        const { data } = yield axios_1.default.get(`http://ip-api.com/json/102.91.49.211`);
        // console.log(data)
        const { data: weather } = yield axios_1.default.get(`http://api.weatherapi.com/v1/current.json?key=866195130645470aa6d132613240107&q=${data.city}`);
        const resObj = {
            clientIp: userIp,
            location: data.city,
            greeting: `hello ${userName}!, the current weather is, ${weather.current.temp_c} degrees celcius in ${data.city}`,
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
