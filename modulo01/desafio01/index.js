const express = require('express')
const server = express()

server.use(express.json())

const projects = [{
    "id": "1",
    "title": "Novo Projeto1",
    "tasks": []
  },
]

//Cadastra
server.post('/projects', (req, res) => {
  const { id, title } = req.body
  projects.push( { id, title, tasks: [] } )

  return res.json( projects )
})

//Lista todos
server.get('/projects', (req, res) => {
  return res.json( projects )
})

//Altera titulo do projeto
server.put('/projects/:id', (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const index = projects.findIndex( project => project.id == id )

  projects[index].title = title
  return res.json( projects)
})

//Deleta projeto
server.delete('/projects/:id', (req, res) => {
  const { id } = req.params
  
  const index = projects.findIndex( project => project.id == id )

  projects.splice( index, 1 )

  return res.send("Sucess")
})

//Cria tarefa
server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params
  const { title } = req.body

  var project = projects.find(project => project.id == id )

  project.tasks.push(title)

  return res.json( projects )
})

server.listen(3000)