const express = require('express');
const server = express()
const fs = require("fs")
const data = require('./data.json')
const nunjucks = require('nunjucks')

server.use(express.urlencoded({extended:true}))
server.use(express.static('public'));

server.set("view engine", 'njk');
nunjucks.configure("views", {
    express:server,
    autoescape:false,
    noCache:true,
})
// Configurando rotas
server.get("/", (req, res) => {
    return res.render("menu", {foods:data.recipes})
})
server.get("/sobre", (req, res) => {
    return res.render("sobre")
})
server.get("/receitas", (req, res) => {
    return res.render("receitas", {foods:data.recipes})
})
server.get("/receitas/:id", (req, res) => {
    const { id } = req.params

    const foundReceita = data.recipes.find( receita => {
        if(receita.id == id){
            return true
        }
    })
    if(!foundReceita){
        return res.send("Receita not found!")
    }
    var receita = {
        ...foundReceita,
        
    }
    
    
    return res.render("show", { receita })
})
server.get("/admin/receitas", (req,res) => {
    return res.render("admin", {foods: data.recipes})
})
server.get("/admin/create",(req, res) => {
    return res.render("create")
})
// Adicionando receitas
server.post("/receitas", (req,res) => {
    const keys = Object.keys(req.body)
    //req.body.objeto
    for(key of keys){
        if(req.body[key] == '')
            return res.send("Please, fill all fields!!! >:(")
    }

    let {title, img, ingredients , prepare, information} = req.body

    
    const id = Number(data.recipes.length + 1)


    data.recipes.push({
        id,
        title,
        img,
        ingredients,
        prepare,
        information,
    })
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err){
            return res.send("White file error")
        }
        return res.redirect("/receitas")
    })
})
server.listen(1111, () => {
    return console.log("O server está on!")
})