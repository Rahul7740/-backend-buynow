const cartModel = (sequelize, DataTypes) => {
  return sequelize.define("carts", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });
};
export default cartModel;
