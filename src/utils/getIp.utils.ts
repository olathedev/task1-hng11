import { Request } from "express";

export const getIp = (req: Request) => {
    const forwarded = req.headers['x-forwarded-for'] as string | undefined;
    const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;
    console.log(ip)
    return ip;
}