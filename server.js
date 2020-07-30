const express = require('express');
const server = express()
const fs = require("fs")
const methodOverride = require("method-override")
const data = require('./data.json')
const nunjucks = require('nunjucks')

server.use(express.urlencoded({extended:true}))
server.use(express.static('public'));
server.use(methodOverride('_method'))
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
server.get("/admin/edit/:id", (req, res) => {
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
    
    
    return res.render("edit", { receita })
})
// Adicionando receitas
server.post("/receitas", (req,res) => {
    const keys = Object.keys(req.body)
    //req.body.objeto
    for(key of keys){
        if(req.body[key] == '')
            return res.send("Please, fill all fields!!! >:(")
    }

    let {title, img, ingredients , prepare, informations} = req.body

    
    const id = Number(data.recipes.length + 1)


    data.recipes.push({
        id,
        title,
        img,
        ingredients,
        prepare,
        informations,
    })
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err){
            return res.send("White file error")
        }
        return res.redirect("/receitas")
    })
})
server.put("/receitas", (req, res) => {
    const { id } = req.body
    let index = 0


    const foundReceita = data.recipes.find( (receitas, foundIndex) => {
        if(id == receitas.id){
            index = foundIndex
            return true
        }
    })

    if(!foundReceita) return res.send("Receita not found")

    const receita = {
        ...foundReceita,
        ...req.body,
        
    }

    data.recipes[index] = receita

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if(err) return res.send("White error :/...")

        return res.redirect(`/receitas/${id}`)
    })
})
server.delete("/receitas",(req, res) => {
    const { id } = req.body

    const filteredReceitas = data.recipes.filter( receitas => {
        return receitas.id != id
    })

    data.recipes = filteredReceitas

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if (err) return res.send("White file error")

        return res.redirect("/receitas")
    })
})
server.listen(1111, () => {
    return console.log("O server está on!")
})