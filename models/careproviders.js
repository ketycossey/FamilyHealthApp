'use strict';
module.exports = (sequelize, DataTypes) => {
  const CareProviders = sequelize.define('CareProviders', {
    doctor_name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    website: DataTypes.STRING,
    specialty: DataTypes.STRING,
    member_id: DataTypes.INTEGER
  }, {});
  CareProviders.associate = function(models) {
    models.CareProviders.belongsTo(models.Family_member, {as:'Family_member', foreignKey: 'member_id'})
  };
  return CareProviders;
};