import db from "../db/index.js";

export const cartCreate = async (req, res) => {
  try {
    const { id, qty, price } = req.body;
    const checkID = await db.Products.findOne({ where: { id: id } });
    if (!checkID) {
      return res.status(400).json({ error: "product id does not find" });
    }

    const noRepeat = await db.Cart.findOne({ where: { id: id } });
    if (noRepeat) {
      const quantity = Number(noRepeat.qty) + 1;
      const updatePrice = Number(price.slice(1, price.lenght)) * quantity;

      const cartData = await db.Cart.update(
        { qty: quantity, price: updatePrice },
        { where: { id } }
      );
      return res.status(200).json({ message: "successfully" });
    }
    const updatePrice = Number(price.slice(1, price.lenght));
    const data = await db.Cart.create({ id, qty: 1, price:updatePrice });
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
    const { id } = req.params;
    const checkID = await db.Cart.findOne({ where: { id: id } });
    if (!checkID) {
      return res.status(400).json({ error: "product id does not find" });
    }
    await checkID.destroy();
    res.status(200).json({ message: "remove successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const updateQty = async (req, res) => {
  try {
    const { id, qty, price } = req.body;
    const checkID = await db.Cart.findOne({ where: { id: id } });
    if (!checkID) {
      return res.status(400).json({ error: "product id does not find" });
    }
    const updatePrice = Number(price.slice(1, price.lenght)) * qty;
    await db.Cart.update({ qty: qty, price: updatePrice }, { where: { id } });
    res.status(200).json({ message: "update quantity" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
