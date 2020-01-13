'use strict';
module.exports = (sequelize, DataTypes) => {
  const family = sequelize.define('family', {
    family_name: DataTypes.STRING,
    username: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  family.associate = function(models) {
    models.family.hasMany(models.Family_member,{as: "family_member", foreignKey: "memberId", onDelete:'cascade',hooks:true})
  };
  return family;
};