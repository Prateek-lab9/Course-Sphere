import { Order } from "../models/order.model.js";
import { Purchase } from "../models/purchase.model.js";

export const orderData = async (req, res) => {
  const order = req.body;
  try {
    const orderInfo = await Order.create(order);
    console.log("order", orderInfo);
    const userId = orderInfo?.userId;
    const courseId = orderInfo?.courseId;
    if (orderInfo) {
       const purchase = await Purchase.create({ userId, courseId });
    }
    res.status(201).json({ message: "Order Details: ", orderInfo});
  } catch (error) {
    console.log("Error in order: ", error);
    res.status(401).json({ errors: "Error in order creation" });
  }
};
