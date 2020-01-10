'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Family_members', 'family_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 2,
      references: {model:'families', key:'id'},
      onDelete: 'CASCADE'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Family_members', 'family_id')
  }
};
