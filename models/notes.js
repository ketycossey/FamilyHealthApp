'use strict';
module.exports = (sequelize, DataTypes) => {
  const notes = sequelize.define('notes', {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  }, {});
  notes.associate = function(models) {
    // associations can be defined here
    models.notes.belongsTo(models.family,{as: 'notes', foreingKey:'family_id'})
  };

  return notes;
};