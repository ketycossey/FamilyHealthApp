'use strict';
module.exports = (sequelize, DataTypes) => {
  const TestLab = sequelize.define('TestLab', {
    imageURL: DataTypes.STRING,
    test_date: DataTypes.STRING,
    category: DataTypes.STRING,
    memberId: DataTypes.INTEGER
  }, {});
  TestLab.associate = function(models) {
    models.TestLab.belongsTo(models.Family_member, {as:'Family_member', foreignKey: 'memberId'})
  };
  return TestLab;
};