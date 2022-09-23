import sensor from '../models/Sensor.js';


/*
  Controllers do sensor
*/

async function findAll(req, res) {
   /*
    Busca no banco de dados todos os sensores
   */
    const sensores = await sensor.findAll();
    res.json(sensores);
}

function findById(req, res) {
  /*
    Busca no banco de dados um sensor por ID
   */
  sensor.findByPk(req.params.id).then((result) => res.json(result));
}

function createSensor(req, res) {
  /*
    Cria um novo sensor no banco de dados (devendo estar relacionado com um reservatório)
   */
  sensor.create({
      codigo: req.body.codigo,
      descricao: req.body.descricao,
      reservatorio_id : req.body.reservatorio
    }).then((result) => res.status(201).json(result));
}

async function updateSensor(req, res) {
    /*
      Atualiza um sensor
    */
    await sensor.update(
      {
        codigo: req.body.codigo,
        descricao: req.body.descricao,
        reservatorio_id : req.body.reservatorio
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  
    sensor.findByPk(req.params.id).then((result) => res.status(200).json(result));
}

async function deleteSensor(req, res) {
    /*
     Exclui um sensor
   */
    await sensor.destroy({
      where: {
        id: req.params.id,
      },
    });
  
    res.status(202).json({message: 'Sensor excluido'});
}

export default { findAll, findById, createSensor, updateSensor, deleteSensor };