
//generated through sequelize cli
'use strict';
const {Model} = require('sequelize');
/*module.exports = (sequelize, DataTypes) => {
  class Personnes extends Model {

    static associate(models) {
      // define association here
    }
  };
  Personnes.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nom: DataTypes.STRING,
    password: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Personnes',
  });
  return Personnes;
};*/

module.exports = function(sequelize, DataTypes) {
  var personnes = sequelize.define('Personnes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nom: DataTypes.STRING,
    password: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Personnes',
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return personnes;
}