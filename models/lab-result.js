'use strict';
module.exports = (sequelize, DataTypes) => {
  const LabResult = sequelize.define('LabResult', {
    image: DataTypes.STRING,
    test_day: DataTypes.STRING,
    category: DataTypes.STRING,
    memberid: DataTypes.INTEGER
  }, {});
  LabResult.associate = function(models) {
    models.LabResult.belongsTo(models.Family_member,{as: 'Family_member',foreignKey: 'memberid'})
  };
  return LabResult;
};