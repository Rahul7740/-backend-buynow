import db from "../db/index.js";

export const cartCreate = async (req, res) => {
  try {
    const { id } = req.body;
    const checkID = await db.Products.findOne({ where: { id: id } });
    if (!checkID) {
      return res.status(400).json({ error: "product id does not find" });
    }
    const noRepeat = await db.Cart.findOne({ where: { id: id } });
    if (noRepeat) {
      return res.status(400).json({ error: "product id already exists" });
    }
    const data = await db.Cart.create({ id });
    res.status(200).json({ message: "add to cart successfully", data });
  } catch (error) {
    req.status(400).json({ error: error.message });
  }
};

export const cartGet = async (req, res) => {
  try {
    const data = await db.Cart.findAll();
    res.status(200).json(data);
  } catch (error) {
    req.status(400).json({ error: error.message });
  }
};
export const cartRemove = async (req, res) => {
  try {
  } catch (error) {
    req.status(400).json({ error: error.message });
  }
};
