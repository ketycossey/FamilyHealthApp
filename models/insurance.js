'use strict';
module.exports = (sequelize, DataTypes) => {
  const Insurance = sequelize.define('Insurance', {
    front_pic: DataTypes.STRING,
    back_pic: DataTypes.STRING,
    care_provider_name: DataTypes.STRING,
    member_id: DataTypes.INTEGER
  }, {});
  Insurance.associate = function(models) {
    // associations can be defined here
  };
  return Insurance;
};