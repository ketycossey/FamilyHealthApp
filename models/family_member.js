'use strict';
module.exports = (sequelize, DataTypes) => {
  const Family_member = sequelize.define('Family_member', {
    image_url: DataTypes.STRING,
    family_member: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birthday: DataTypes.STRING,
    family_id: DataTypes.INTEGER,
    familyId: {
      type: DataTypes.INTEGER,
      field: 'family_id'
    }
  }, {});
  Family_member.associate = function(models) {
    models.Family_member.belongsTo(models.family,{as: 'Family_member',foreignKey: 'family_id'})
    models.Family_member.hasMany(models.TestLab, {as: 'TestLab', foreignKey:'memberId'})
    models.Family_member.hasMany(models.Insurance, {as: 'Insurance', foreignKey:'member_id'})
    models.Family_member.hasMany(models.Medication, {as:'Medication', foreignKey:'member_id'})
    models.Family_member.hasMany(models.CareProviders, {as: 'Care_provider', foreignKey:'member_id'})
    models.Family_member.hasMany(models.Appointment, {as: 'Appointment', foreignKey:'member_id'})
  };
  return Family_member;
};