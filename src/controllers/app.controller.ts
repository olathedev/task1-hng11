import { Request, Response } from "express";
import axios from "axios"
import { getIp } from "../utils/getIp.utils";


export const sayHello = async (req: Request, res: Response) => {
    // const userIp = req.ip
    const userIp = getIp(req)
    const userName = req.query.visitors_name || "anonymous user"

    try {
        console.log(userIp, "sent a request")

        const {data} = await axios.get(`http://ip-api.com/json/${userIp}`)
        // console.log(data)
        const {data: weather}: any = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=${data.city}`)
        
        const resObj = {
            client_ip: userIp,
            location: data.city,
            greeting: `Hello, ${userName}!, the current weather is, ${weather.current.temp_c} degrees Celcius in ${data.city}`,
        }

        res.status(200).json(resObj)
    } catch (error: any) {
        // console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}