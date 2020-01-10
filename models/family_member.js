'use strict';
module.exports = (sequelize, DataTypes) => {
  const Family_member = sequelize.define('Family_member', {
    image_url: DataTypes.STRING,
    family_member: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birthday: DataTypes.STRING,
    family_id: DataTypes.INTEGER
  }, {});
  Family_member.associate = function(models) {
    models.Family_member.belongsTo(models.family,{as: 'Family_member',foreignKey: 'family_id'})
  };
  return Family_member;
};