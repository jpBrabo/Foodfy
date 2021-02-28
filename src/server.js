const express = require('express');
const server = express()
const fs = require("fs")
const receitas = require("./app/controllers/receitas")
const methodOverride = require("method-override")
const nunjucks = require('nunjucks')

server.use(express.urlencoded({extended:true}))
server.use(express.static('public'));
server.use(methodOverride('_method'))
server.set("view engine", 'njk');
nunjucks.configure("./src/app/views", {
    express:server,
    autoescape:false,
    noCache:true,
})
// Configurando rotas
server.get("/", receitas.index)
server.get("/sobre", receitas.about)
server.get("/receitas", receitas.allRecipes)
server.get("/receitas/:id", receitas.show)
// server.get("/admin/receitas", (req,res) => {
//     return res.render("admin", {foods: data.recipes})
// })
// server.get("/admin/create",(req, res) => {
//     return res.render("create")
// })
// server.get("/admin/edit/:id", (req, res) => {
//     const { id } = req.params

//     const foundReceita = data.recipes.find( receita => {
//         if(receita.id == id){
//             return true
//         }
//     })
//     if(!foundReceita){
//         return res.send("Receita not found!")
//     }
//     var receita = {
//         ...foundReceita,
//     }
    
    
//     return res.render("edit", { receita })
// })
// // Adicionando receitas
// server.post("/receitas", receitas.post)
// server.put("/receitas", (req, res) => {
//     const { id } = req.body
//     let index = 0


//     const foundReceita = data.recipes.find( (receitas, foundIndex) => {
//         if(id == receitas.id){
//             index = foundIndex
//             return true
//         }
//     })

//     if(!foundReceita) return res.send("Receita not found")

//     const receita = {
//         ...foundReceita,
//         ...req.body,
        
//     }

//     data.recipes[index] = receita

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
//         if(err) return res.send("White error :/...")

//         return res.redirect(`/receitas/${id}`)
//     })
// })
// server.delete("/receitas",(req, res) => {
//     const { id } = req.body

//     const filteredReceitas = data.recipes.filter( receitas => {
//         return receitas.id != id
//     })

//     data.recipes = filteredReceitas

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
//         if (err) return res.send("White file error")

//         return res.redirect("/receitas")
//     })
// })
server.listen(1111, () => {
    return console.log("O server está on!")
})