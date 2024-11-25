const ProductModel = (sequelize, DataTypes) => {
  return sequelize.define("products", {
    title: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    designRatting: {
      type: DataTypes.STRING,
    },
    designInstock: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.JSON,
    },
    brand:{
      type:DataTypes.STRING
    },
    colorsSelect:{
      type:DataTypes.JSON
    },
    colors: {
      type: DataTypes.JSON,
    },
    styleName: {
      type: DataTypes.JSON,
    },
    speacialFeature: {
      type: DataTypes.STRING,
    },
    conoatibleDevices: {
      type: DataTypes.STRING,
    },
    reviews: {
      type: DataTypes.JSON,
    },
    
  });
};
export default ProductModel;
