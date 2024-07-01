import { Request, Response } from "express";
import axios from "axios"

export const sayHello = async (req: Request, res: Response) => {
    const userIp = req.socket.remoteAddress
    const userName = req.query.visitors_name

    try {
        console.log(userIp)
        const userLocation = await axios.get(`http://ip-api.com/json/${userIp}`)
        console.log(userLocation)

        const resObj = {
            clientIp: userIp,
            location: userLocation.data.city,
            greeting: `hello ${userName} the temprature is 11 in ${userLocation.data.city}`
        }

        res.status(200).json(resObj)
    } catch (error: any) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}