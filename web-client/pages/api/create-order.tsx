import axios from "axios";
import { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";


const createOrder = () => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const hostname = process.env.API_GW != null ? process.env.API_GW : 'localhost';
        const response: AxiosResponse = await axios.post(`http://${hostname}:8333/orders`, req.body);
        res.status(response.status || 200).json(response.data);
    } catch (error: any) {
        console.log(error);
    }
};

export default createOrder();