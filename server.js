const express = require('express');
const server = express()
const receitas = require('./data')
const nunjucks = require('nunjucks')

server.use(express.static('public'));

server.set("view engine", "njk")
nunjucks.configure("src", {
    express:server,
    autoescape:false,
    noCache:true,
})

server.get("/", (req, res) => {
    return res.render("menu", {foods:receitas})
})
server.get("/sobre", (req, res) => {
    return res.render("sobre")
})
server.get("/receitas", (req, res) => {
    return res.render("receitas", {foods:receitas})
})
server.get("/recipes", (req, res) => {
    const id = req.query.id

    const receita = receitas.find( receita => {
        if(receita.id == id){
            return true
        }
    })
    if(!receita){
        return res.send("Receita not found!")
    }

    return res.render("recipe", { foods:receita })
})
server.listen(1111)