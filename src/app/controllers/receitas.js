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
            return res.render("receitas", { receitas })
        })
    },
    adminRecipes(req,res) {
        Receitas.all(receitas => {
            return res.render("admin", { receitas })
        })
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
            return res.render("show", { receita })
        })
    },
    adminEdit(req,res) {
        Receitas.find(req.params.id, receita => {
            if(!receita) throw new Error("Recipe not found.")
            return res.render("edit", { receita })
        })
    },
    adminCreate(req,res) {
        return res.render("create")
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