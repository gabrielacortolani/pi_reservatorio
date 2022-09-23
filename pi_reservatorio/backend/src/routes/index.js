import express from "express";
import reservatorio from './reservatorioRoutes.js'
import sensor from './sensorRoutes.js'
import medicao from './medicaoRoutes.js';

/*
    Criação de um indice para as rotas
*/
const routes = (app) =>{
    app.route('/').get((req, res) =>{
        res.status(200).send({titulo: "Monitoramento de reservatórios"});
    })

    app.use(
        express.json(),
        reservatorio,
        sensor,
        medicao
    )
}

export default routes;