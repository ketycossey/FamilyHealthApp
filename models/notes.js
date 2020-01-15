'use strict';
module.exports = (sequelize, DataTypes) => {
  const notes = sequelize.define('notes', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    family_id: DataTypes.INTEGER
  }, {});
  notes.associate = function(models) {
    // associations can be defined here
    models.notes.belongsTo(models.family,{as: 'notes', foreignKey:'family_id'})
  };

  return notes;
};