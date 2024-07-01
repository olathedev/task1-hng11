import { Request, Response } from "express";
import axios from "axios"


interface ExtendedRequest extends Request {
    headers: {
        'x-forwarded-for'?: string;
    };
}

export const sayHello = async (req: Request, res: Response) => {
    const userName = req.query.visitors_name
    const forwardedIPs: any = req.headers['x-forwarded-for'];
    let userIP: string | undefined;

    if (forwardedIPs) {
        // Extract the first IP from the comma-separated list (assuming the first is the user's)
        userIP = forwardedIPs.split(',')[0];
    } else {
        userIP = req.ip; // Fallback to req.ip if no X-Forwarded-For header
    }
    try {
        console.log(userIP)
        const userLocation = await axios.get(`http://ip-api.com/json/${userIP}`)
        console.log(userLocation)

        const resObj = {
            clientIp: userIP,
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