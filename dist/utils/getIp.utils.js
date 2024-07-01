"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIp = void 0;
const getIp = (req) => {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;
    console.log(ip);
    return ip;
};
exports.getIp = getIp;
