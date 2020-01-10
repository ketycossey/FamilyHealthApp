'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medication = sequelize.define('Medication', {
    medicineName: DataTypes.STRING,
    medImageUrl: DataTypes.STRING,
    medDescription: DataTypes.STRING,
    medFrequency: DataTypes.STRING,
  }, {});
  Medication.associate = function(models) {
   models.Medication.belongsTo(models.Family_member, {as: 'family_member', foreignKey:"memberId"})
    // associations can be defined here
  };
  return Medication;
};