const Sequelize = require('sequelize')
const express = require('express')

// For ease of this tutorial, we are going to use SQLite to limit dependencies
const database = new Sequelize({
    dialect: 'sqlite',
    storage: './howDB.sqlite'
  })
