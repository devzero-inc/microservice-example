import axios from "axios";
import { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";



const getMenuItems = () => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const hostname = process.env.API_GW != null ? process.env.API_GW : 'localhost';
        const response: AxiosResponse = await axios.get(`http://${hostname}:8333/menu-items`);
        res.status(response.status || 200).json(response.data);
    } catch (error: any) {
        console.log(error);
    }
};

export default getMenuItems();