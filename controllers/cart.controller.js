import db from "../db/index.js";

export const cartCreate = async (req, res) => {
  try {
    const { id, qty } = req.body;
    const checkID = await db.Products.findOne({ where: { id: id } });
    if (!checkID) {
      return res.status(400).json({ error: "product id does not find" });
    }

    const noRepeat = await db.Cart.findOne({ where: { id: id } });
    if (noRepeat) {
      const quantity = Number(noRepeat.qty)+1
       
      const cartData = await db.Cart.update(
        { qty: quantity },
        { where: { id } }
      );
      return res.status(200).json({ message: "successfully" });
    }
    const data = await db.Cart.create({ id, qty: 1 });
    res.status(200).json({ message: "add to cart successfully", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const cartGet = async (req, res) => {
  try {
    const data = await db.Cart.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const cartRemove = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
