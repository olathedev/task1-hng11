import { Request, Response } from "express";
import axios from "axios"
import { getIp } from "../utils/getIp.utils";

export const sayHello = async (req: Request, res: Response) => {
    // const userIp = req.ip
    const userIp = getIp(req)
    const userName = req.query.visitors_name

    try {
        console.log(userIp)
        const userLocation = await axios.get(`http://ip-api.com/json/102.91.49.211`)
        // console.log(userLocation)

        const resObj = {
            clientIp: userIp,
            location: userLocation.data.city,
            greeting: `hello ${userName}`
        }

        res.status(200).json(resObj)
    } catch (error: any) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}