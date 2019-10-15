const express = require('express');
const server = express();

server.use(express.json());

const users = ['Vitor', 'Clever', 'Sonin'];

//Middleware Global
server.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; Url: ${req.url};`);

  next();

  console.timeEnd('Request');
})

//Middleware Local
function checkUserExists(req, res, next) {
  if (!req.body.nome) {
    return res.status(400).json({ error: 'User name is required' })
  } 
  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if( !user) {
    return res.status(400).json({ error: 'User doesn\'t exists' });
  }
  req.user = user;
  return next();
}

//Listagem de usuários
server.get('/users', (req, res) => {
  return res.json( users );
})

//Listagem de um usuário
server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user);
})

//Criação de usuário
server.post('/users', checkUserExists, (req, res) => {
  const { nome } = req.body;
  users.push(nome);
  return res.json( users );
})

//Edição de usuário
server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  const { nome } = req.body;
  const { index } = req.params;

  users[index] = nome;

  return res.json( users );
})

//Deleção de usuário
server.delete('/users/:index', checkUserInArray, (req, res) => {
  const {index} = req.params;
  users.splice(index, 1);
  return res.send();
})

server.listen(3000);