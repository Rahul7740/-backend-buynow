const cartModel = (sequelize, DataTypes) => {
  return sequelize.define("carts", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    qty: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
  });
};
export default cartModel;
