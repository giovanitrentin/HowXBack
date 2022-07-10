const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const finale = require('finale-rest')

let app = express()
app.use(cors())
app.use(bodyParser.json())

// For ease of this tutorial, we are going to use SQLite to limit dependencies
let database = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite'
})

let Usuario = database.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cell: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

let Imovel = database.define('imovel', {
  id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  nome: {
      type: Sequelize.STRING,
      allowNull: false
  }, 
  cidade: {
    type: Sequelize.STRING,
    allowNull: false
}, 
  descricao: {
      type: Sequelize.STRING,
      allowNull: true
  },
})

let Objeto = database.define('objeto', {
  id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  idImovel: {
    type: Sequelize.INTEGER,
    allowNull: false
  }, 
  nome: {
      type: Sequelize.STRING,
      allowNull: false
  }, 
  quantidade: {
    type: Sequelize.INTEGER,
    allowNull: false
  }, 
  descricao: {
      type: Sequelize.STRING,
      allowNull: true
  },
})

// Initialize finale
finale.initialize({
  app: app,
  sequelize: database
})

// Create the dynamic REST resource for our Post model
let usuarioResource = finale.resource({
  model: Usuario,  
  endpoints: ['/usuario', '/usuario/:id'],
})

let imovelResource = finale.resource({
  model: Imovel,  
  endpoints: ['/imovel', '/imovel/:id'],
})

let objetoResource = finale.resource({
  model: Objeto,  
  endpoints: ['/objeto', '/objeto/:id'],
})

// Resets the database and launches the express app on :8081
database
  .sync({ force: false })
  .then(() => {
    app.listen(8081, () => {
      console.log('listening to port localhost:8081')
    })
  })
