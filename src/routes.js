const express = require("express")
const receitas = require("./app/controllers/receitas")
const chefs = require("./app/controllers/chefs")
const routes = express.Router()

// - Rotas da aplicação.
routes.get("/", receitas.index)
routes.get("/sobre", receitas.about)

// - Rotas das receitas
routes.get("/receitas", receitas.allRecipes)
routes.get("/receitas/:id", receitas.showRecipe)
routes.get("/admin/recipes", receitas.adminRecipes)
routes.get("/admin/recipes/view/:id", receitas.adminRecipeShow)
routes.get("/admin/recipes/create",receitas.adminRecipeCreate)
routes.get("/admin/recipes/edit/:id", receitas.adminRecipeEdit)

routes.post("/receitas", receitas.postRecipe)
routes.put("/receitas", receitas.putRecipe)
routes.delete("/receitas", receitas.deleteRecipe)

// - Rotas dos chefs
routes.get("/chefs", chefs.allChefs)
routes.get("/chefs/:id", chefs.showChef)
routes.get("/admin/chefs", chefs.adminChef)
routes.get("/admin/chefs/view/:id", chefs.adminChefShow)
routes.get("/admin/chefs/create",chefs.adminChefCreate)
routes.get("/admin/chefs/edit/:id", chefs.adminChefEdit)

routes.post("/chefs", chefs.postChef)
routes.put("/chefs", chefs.putChef)
routes.delete("/chefs", chefs.deleteChef)

module.exports = routes