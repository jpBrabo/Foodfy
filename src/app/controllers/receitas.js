const Receitas = require("../models/Receitas")

module.exports = {
    index(req,res) {
        Receitas.all(receitas => {
            return res.render("menu", { receitas })
        })
    },
    about(req,res){
        return res.render("sobre")
    },
    allRecipes(req,res){
        Receitas.all(receitas => {
            return res.render("receitas/receitas", { receitas })
        })
    },
    adminRecipes(req,res) {
        Receitas.all(receitas => {
            return res.render("admin/home", { receitas })
        })
    },
    adminChef(req,res) {
        return res.render("admin/chef")
    },
    post(req,res) {
        const keys = Object.keys(req.body)
        //req.body.objeto
        for(key of keys){
            if(req.body[key] == '')
                return res.send("Please, fill all fields!!! >:(")
        }
        Receitas.create(req.body, receitas => {
            return res.redirect(`/receitas/${receitas.id}`)
        })
    },
    show(req,res) {
        Receitas.find(req.params.id, receita => {
            if(!receita) throw new Error("Recipe not found.")
            return res.render("receitas/show", { receita })
        })
    },
    adminEdit(req,res) {
        Receitas.find(req.params.id, receita => {
            if(!receita) throw new Error("Recipe not found.")
            return res.render("receitas/edit", { receita })
        })
    },
    adminCreate(req,res) {
        return res.render("receitas/create")
    },
    put(req,res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
          if (req.body[key] == "") {
            return res.send("Please, fill all fields!");
          }
        }

        Receitas.update(req.body, () => {
            return res.redirect(`/receitas/${req.body.id}`)
        })
    },
    delete(req,res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
          if (req.body[key] == "") {
            return res.send("Please, fill all fields!");
          }
        }
        
        Receitas.delete(req.body.id, () => {
            return res.redirect(`/admin/receitas`)
        })
    }
}