const Receitas = require("../models/Receitas")

module.exports = {
    // - Rotas principais.
    index(req,res) {
        Receitas.allRecipes(receitas => {
            return res.render("menu", { receitas })
        })
    },
    about(req,res){
        return res.render("sobre")
    },
    // - Controle de rotas das receitas
    allRecipes(req,res){
        Receitas.allRecipes(receitas => {
            return res.render("receitas/receitas", { receitas })
        })
    },
    showRecipe(req,res) {
        Receitas.findRecipe(req.params.id, receita => {
            if(!receita) throw new Error("Recipe not found.")
            return res.render("receitas/show", { receita })
        })
    },
    adminRecipes(req,res) {
        Receitas.allRecipes(receitas => {
            return res.render("admin/home", { receitas })
        })
    },
    adminRecipeEdit(req,res) {
        Receitas.findRecipe(req.params.id, receita => {
            if(!receita) throw new Error("Recipe not found.")
            return res.render("receitas/edit", { receita })
        })
    },
    adminRecipeCreate(req,res) {
        return res.render("receitas/create")
    },
    postRecipe(req,res) {
        const keys = Object.keys(req.body)
        //req.body.objeto
        for(key of keys){
            if(req.body[key] == '')
                return res.send("Please, fill all fields!!! >:(")
        }
        Receitas.createRecipe(req.body, receitas => {
            return res.redirect(`/receitas/${receitas.id}`)
        })
    },
    putRecipe(req,res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
          if (req.body[key] == "") {
            return res.send("Please, fill all fields!");
          }
        }

        Receitas.updateRecipe(req.body, () => {
            return res.redirect(`/receitas/${req.body.id}`)
        })
    },
    deleteRecipe(req,res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
          if (req.body[key] == "") {
            return res.send("Please, fill all fields!");
          }
        }
        
        Receitas.deleteRecipe(req.body.id, () => {
            return res.redirect(`/admin/receitas`)
        })
    },
}