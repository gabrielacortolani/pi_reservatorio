import reservatorio from '../models/Reservatorio.js';

/*
    Controller dos sensores
*/
async function findAll(req, res) {
   /*
    Busca no banco de dados todos os reservatórios
   */
    const result = await reservatorio.findAll();
    res.json(result);
}

function findById(req, res) {
  /*
    Busca no banco de dados  um reservatório por ID
  */
    reservatorio.findByPk(req.params.id).then((result) => res.json(result));
}

function createReservatorio(req, res) {
   /*
     Cria um reservatório
   */
    reservatorio.create({
      codigo: req.body.codigo,
      descricao: req.body.descricao,
    }).then((result) => res.status(201).json(result));
}

async function updateReservatorio(req, res) {
   /*
    Atualiza um reservatório
   */
    await reservatorio.update(
      {
        codigo: req.body.codigo,
        descricao: req.body.descricao,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  
    reservatorio.findByPk(req.params.id).then((result) => res.status(200).json(result));
}

async function deleteReservatorio(req, res) {
   /*
    Exclui um reservatório
   */
    await reservatorio.destroy({
      where: {
        id: req.params.id,
      },
    });
  
    res.status(202).json({message: 'Reservatorio excluido'});
}

export default { findAll, findById, createReservatorio, updateReservatorio, deleteReservatorio };