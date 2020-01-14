'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medication = sequelize.define('Medication', {
    medicineName: DataTypes.STRING,
    medImageUrl: DataTypes.STRING,
    medDescription: DataTypes.STRING,
    medFrequency: DataTypes.STRING,
    member_id:DataTypes.INTEGER
  }, {});
  Medication.associate = function(models) {
  models.Medication.belongsTo(models.Family_member, {as: 'Family_member', foreignKey: "member_id"})
    // associations can be defined here
  };
  return Medication;
};