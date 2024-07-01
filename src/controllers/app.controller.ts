import { Request, Response } from "express";
import axios from "axios"
import { getIp } from "../utils/getIp.utils";


const myApiKey = 'aaac1450c370507a325bb559024a67c5'

export const sayHello = async (req: Request, res: Response) => {
    // const userIp = req.ip
    const userIp = getIp(req)
    const userName = req.query.visitors_name

    try {
        console.log(userIp)
        const {data} = await axios.get(`http://ip-api.com/json/102.91.49.211`)
        // console.log(data)
        const getwWeather: any = await axios.get(`http://api.weatherapi.com/v1/current.json?key=866195130645470aa6d132613240107&q=${data.city}`)
        
        const resObj = {
            clientIp: userIp,
            location: data.city,
            greeting: `hello ${userName} the current weather is, ${getwWeather.data.current.temp_c}`,
        }

        res.status(200).json(resObj)
    } catch (error: any) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}