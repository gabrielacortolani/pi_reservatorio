import medicao from '../models/Medicao.js';
import sensor from '../models/Sensor.js'

  /*
    Controller da medição
  */

async function findAll(req, res) {
   /*
     Busca todas as medições
   */
    const result = await medicao.findAll();
    res.json(result);
}

function findById(req, res) {
  /*
    Busca uma medição por ID
  */
  medicao.findByPk(req.params.id).then((result) => res.json(result));
}

async function createMedicao(req, res) {
  /*
    Cria uma nova mediçã
  */

  /* 
     Primeiro deve-se buscar de qual sensor a medição está vindo. O Arduino irá mandar o seguinte payload
     {"dado": XXXX, "sensor": YYY}, com o campo sensor então busca-se o ID do sensor
  */
  let s = await sensor.findOne({ where: { codigo: req.body.sensor } });

  /*
      com o metodo findOne busca uma medição do sensor, que é passado no where, ordena-se por data de medição DESC, 
      Com isso tem-se a ultima medição do sensor
  */

  let ultimaMedicao = await medicao.findOne ({ where: { sensor_id: s.id } , order : [['data_medicao', 'DESC']]} )
  let tipo = '-';
  let data_medicao = Date();
  
  /* 
     Se a ultima medição for menor do que a medição lida agora, entende-se que o volume de chorume no reservatório aumentou,
    o que caracteriza preciptação (P)
     Se a ultima medição for maior do que a medição lida agora, entende-se que o volume de chorume no reservatório diminuiu,
    o que caracteriza uma vazão (V)
     Se manteve-se igual, o tipo será (-), não houve preciptação, nem vazão.
     Com isso não precisa-se criar um campo para gravar a vazão e um para gravar a preciptação, através do valor lido e essa coluna
     consegue ver se é chuva ou vazão.
     Isso será visto no dashboard
  */
  if ((!ultimaMedicao) || (req.body.dado > ultimaMedicao.dado)){
     tipo = 'P';
  } else if (req.body.dado < ultimaMedicao.dado){
    tipo = 'V'
  }
  
  /*
     Cria a medição
  */
  medicao.create({
      dado: req.body.dado,
      sensor_id : s.id,
      data_medicao,
      tipo
    }).then((result) => res.status(201).json(result));
}

export default { findAll, findById, createMedicao };