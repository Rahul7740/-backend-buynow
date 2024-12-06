const UserModel = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    profile: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    mobileNo: {
      type: DataTypes.STRING,
      validate: {
        is: /^[0-9\-+()\s]*$/i, // Allow only valid phone number characters
      },
    },
    address: {
      type: DataTypes.TEXT,
    },
    secondAddress: {
      type: DataTypes.TEXT,
    },
    State: {
      type: DataTypes.STRING,
    },
    Gender: {
      type: DataTypes.STRING,
    },
  });
};
export default UserModel;
