const { DataTypes, STRING } = require('sequelize');
const db = require('../db');

const Note = db.define('note', {
    title: {
        type:DataTypes.STRING,
        allowNull:false
    },
    datePlanted:{
        type:DataTypes.DATEONLY
    },
    waterSched:{
        type:DataTypes.STRING
    },
    light:{
        type:DataTypes.STRING
    },
    temp:{
        type:DataTypes.INTEGER
    },
    noteBody:{
        type:DataTypes.STRING,
        allowNull:false,
        type:DataTypes.INTEGER
    },
    owner_id: {
        type: DataTypes.INTEGER
    }

});

module.exports = Note;
