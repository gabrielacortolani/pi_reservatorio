import { Sequelize } from "sequelize";
import db from '../config/banco.js';

/*
    Schema da tabela de reservatorios (onde o sensor será ligado)
    id - primary key da tabela
    codigo - código do reservatório
    descricao - descrição do reservatório
*/
const reservatorioSchema = db.define("reservatorio", {
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
        allowNull: false,
        unique: true,
    },
});

export default reservatorioSchema;