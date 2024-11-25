import db from "../db/index.js";

export const createProducts = async (req, res) => {
  try {
    const {
      title,
      image,
      designRatting,
      designInstock,
      description,
      size,
      brand,
      colorsSelect,
      colors,
      styleName,
      speacialFeature, 
      conoatibleDevices,
      reviews,
    } = req.body;
    const checkProduct = await db.Products.findOne({ where: { title: title } });
    if (checkProduct) {
      return res.status(444).json({ error: "Product-Name already exists" });
    }
    const data = await db.Products.create({
      title,
      image,
      designRatting,
      designInstock,
      description,
      size,
      brand,
      colorsSelect,
      colors,
      styleName,
      speacialFeature,
      conoatibleDevices,
      reviews,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const data = await db.Products.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const checkId = await db.Products.findOne({ where: { id: id } });
    if (!checkId) {
      return res.status(444).json({ error: "productsId is not avalible" });
    }
    await checkId.destroy();
    res.status(200).json({ message: "Deleted sucessfully", id });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getSingleProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const checkId = await db.Products.findOne({ where: { id: id } });
    if (!checkId) {
      return res.status(444).json({ error: "productsId is not avalible" });
    }
    res.status(200).json(checkId);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    const { id, image } = req.body;
    
    const checkId = await db.Products.findOne({ where: { id: id } });
    if (!checkId) {
      return res.status(444).json({ error: "productsId is not avalible" });
    }
    await db.Products.update({ image }, { where: { id } });
    res.status(200).json({ message: "update sucessfully",id,image });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
