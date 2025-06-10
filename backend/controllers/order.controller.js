import { Order } from "../models/order.model.js";
import { Purchase } from "../models/purchase.model.js";

export const orderData = async (req, res) => {
    const order = req.body;
    try {
        const orderInfo = Order.create(order)
        console.log(orderInfo)
        const userId = orderInfo.userId;
        const courseId = orderInfo?.courseInfo
        res.status(200).json({message:"Order details ",orderInfo})
        if(orderInfo){
             const purchase = await Purchase.create({
                  userId,
                  courseId, 
                });
        }
    } catch (error) {
        console.log("Error in order" , error)
        req.status(401).json({errors:"Errorin order creation"})
    }
};
