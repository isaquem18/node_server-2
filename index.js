const express = require('express');
const app = express();
console.log('>>>>>>>>>>>>>>>>>>>>> a ')
app.use(express.json());

let users = ['ana', 'bruno', 'carlos', 'daniela'];


function check(req, res, next) {
  let { nome } = req.body;
  nome = nome.replace(/ /g, '');
  if (!nome) {
    return res.status(400).json({ erro: 'user name is require' });
  } else {
    return next();
  };
};

function a(req, res, next) {
  req.nome = 'isaque';
  return next();
}


function isThereUser(req, res, next) {
  let { index } = req.params;
  index = parseInt(index) - 1;
  if (!users[index]) {
    return res.status(400).json({ error: 'user not founded!' })
  };
   return next();
};

app.get('/users', a, (req, res) => {
  return res.json({ nome: req.nome });
});

app.get('/users/:index', isThereUser, (req, res) => {
  let { index } = req.params;
  index = parseInt(index) - 1;
  return res.json({ user: users[index] })
});

app.post('/users', check,  (req, res) => {
  let { nome } = req.body;
  users.push(nome);
  return res.json(users)
});

app.put('/users/:index', check, isThereUser,  (req, res) => {
  let { index } = req.params;
  index = parseInt(index) - 1;
  let { nome } = req.body;
  users[index] = nome;
  return res.json(users);
});


app.delete('/users/:index', isThereUser, (req, res) => {
  let { index } = req.params;
  index = parseInt(index) - 1;
  users.splice(index, 1)
  return res.json(users)
});

app.listen(3000);