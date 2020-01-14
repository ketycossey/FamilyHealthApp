'use strict';
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    name: DataTypes.STRING
  }, {});
  Appointment.associate = function(models) {
    // associations can be defined here
  };
  return Appointment;
};