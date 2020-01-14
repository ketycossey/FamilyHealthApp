'use strict';
module.exports = (sequelize, DataTypes) => {
  const Insurance = sequelize.define('Insurance', {
    front_pic: DataTypes.STRING,
    back_pic: DataTypes.STRING,
    care_provider_name: DataTypes.STRING,
    member_id: DataTypes.INTEGER
  }, {});
  Insurance.associate = function(models) {
    models.Insurance.belongsTo(models.Family_member, {as:'Family_member', foreignKey: 'member_id'})
  };
  return Insurance;
};