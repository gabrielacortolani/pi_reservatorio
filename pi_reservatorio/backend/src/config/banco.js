import { Sequelize } from "sequelize"; // importar o sequelize

const dbName = process.env.DB_NAME||'controlereservatorio'; // passar os dados do .env para as constantes
const dbUser = process.env.DB_USER||'XXXX';
const dbHost = process.env.DB_HOST|| 'XXXX';
const dbPassword = process.env.DB_PASSWORD ||'XXXX';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  //passar os dados para o sequelize
  dialect: "mysql", //informar o tipo de banco que vamos utilizar
  host: dbHost, //o host, neste caso estamos com um banco local
  define: {
    timestamps: true,
    freezeTableName: true
  },
});

export default sequelize; //exportar