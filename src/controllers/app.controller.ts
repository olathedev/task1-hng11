import { Request, Response } from "express";

export const sayHello = async (req: Request, res: Response) => {
    const userIp = req.socket.remoteAddress
    const userName = req.query.visitors_name

    try {
        console.log(userIp)
        const userLocation = await fetch(`https://api.ip-api.com/json/${userIp}?fields=city,country`)

        const resObj = {
            clientIp: userIp,
            location: userLocation,
            greeting: `hello ${userName}`
        }

        res.status(200).json(resObj)
    } catch (error) {
        console.log(error)
    }
}