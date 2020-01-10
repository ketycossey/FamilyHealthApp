'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Lab-Results',
      'memberid',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Family_members",
          key: 'id'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Lab-Results',
      'memberid'
    )
  }
};
