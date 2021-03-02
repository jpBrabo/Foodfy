const express = require("express")
const receitas = require("./app/controllers/receitas")
const routes = express.Router()

// - Rotas da aplicação.
routes.get("/", receitas.index)
routes.get("/sobre", receitas.about)
routes.get("/receitas", receitas.allRecipes)
routes.get("/receitas/:id", receitas.show)
routes.get("/admin/receitas", receitas.adminRecipes)
routes.get("/admin/chef", receitas.adminChef)
routes.get("/admin/create",receitas.adminCreate)
routes.get("/admin/edit/:id", receitas.adminEdit)
routes.post("/receitas", receitas.post)
routes.put("/receitas", receitas.put)
routes.delete("/receitas", receitas.delete)

module.exports = routes