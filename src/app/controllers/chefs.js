const Chefs = require("../models/Chefs")

module.exports = {
    // - Controle de rotas dos chefs
    allChefs(req,res){
        Chefs.allChefs(chefs => {
            return res.render("chefs/chefs", { chefs })
        })
    },
    showChef(req,res) {
        Chefs.findChef(req.params.id, chef => {
            if(!chef) throw new Error("Recipe not found.")
            Chefs.findRecipeChef(req.params.id, recipes => {
                if(!recipes) throw new Error("Error.")
                return res.render("chefs/show", { chef, receitas: recipes })
            })
        })
    },
    adminChef(req,res) {
        Chefs.allChefs(chefs => {
            return res.render("admin/chef", { chefs })
        })
    },
    adminChefShow(req,res) {
        Chefs.findChef(req.params.id, chef => {
            Chefs.findRecipeChef(req.params.id, recipes => {
                console.log(recipes)
                return res.render("admin/chef_view", { chef, receitas: recipes })
            })
        })
    },
    adminChefEdit(req,res) {
        Chefs.findChef(req.params.id, chef => {
            if(!chef) throw new Error("Recipe not found.")
            return res.render("chefs/edit", { chef })
        })
    },
    adminChefCreate(req,res) {
        return res.render("chefs/create")
    },
    postChef(req,res) {
        const keys = Object.keys(req.body)
        //req.body.objeto
        for(key of keys){
            if(req.body[key] == '')
                return res.send("Please, fill all fields!!! >:(")
        }
        Chefs.createChef(req.body, chefs => {
            return res.redirect(`/chefs/${chefs.id}`)
        })
    },
    putChef(req,res) {
        const keys = Object.keys(req.body);
        console.log(req.body)
        for (key of keys) {
          if (req.body[key] == "") {
            return res.send("Please, fill all fields!");
          }
        }

        Chefs.updateChef(req.body, () => {
            return res.redirect(`/admin/chefs/view/${req.body.id}`)
        })
    },
    deleteChef(req,res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
          if (req.body[key] == "") {
            return res.send("Please, fill all fields!");
          }
        }
        
        Chefs.deleteChef(req.body.id, () => {
            return res.redirect(`/admin/chefs`)
        })
    },
}