import sequelize from "sequelize";
import db from '../config/banco.js';

/*
    Schema da tabela que irá gravar a medição dos sensores
    id - primary key da tabela
    dado - valor lido pelo sensor
    data_medicao - data que foi realizada a medicao
    tipo - Irá indicar se houve preciptação (P) ou Vazão (V) ou se o nível manteve-se igual (-), com isso não há necessidade de 
           criar uma coluna para marcar o nível de chuva o vazão, consegue-se calcular diante da medição anterior
    sensor_id = foreign key da tabela sensor, para saber de qual sensor veio a medição
*/

const medicaoSchema = db.define("medicao",{
    id: {
        type: sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    dado: {
        type: sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    },
    data_medicao: {
        type: sequelize.DATE, 
         defaultValue: sequelize.NOW, 
        allowNull: false,
    },
    tipo:{
        type: sequelize.STRING,
        allowNull: false
    },
    sensor_id : {
        type : sequelize.INTEGER.UNSIGNED,
        allowNull:false,
        references:{
            model:"sensor",
            key: "id"
        }
    },
})

export default medicaoSchema;