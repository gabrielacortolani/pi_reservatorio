import { Sequelize } from "sequelize";
import db from '../config/banco.js';

/*
    Schema do sensor (sensor que irá medir o nível de chorume no reservatório)
    id - primary key da tabela
    código - código que irá identificar o sensor
    descrição - descrição do sensor
    reservatório_id - foreign key da tabela reservatório, será onde o sensor está instalado
*/

const sensorSchema = db.define("sensor", {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    codigo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reservatorio_id : {
        type : Sequelize.INTEGER.UNSIGNED,
        allowNull:false,
        references:{
            model:"reservatorio",
            key: "id"
        }
    },
});


export default sensorSchema;