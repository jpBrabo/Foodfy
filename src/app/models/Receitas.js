const db = require("../../config/db")

module.exports = {
    // - Model das receitas
    allRecipes(callback) {
        db.query(`SELECT * FROM recipes ORDER BY title ASC`, (err, results) => {
            if(err) throw new Error(`Database error. ${err}`)
            callback(results.rows)
        })
    },
    createRecipe(data,callback) {
        const query = `
            INSERT INTO recipes (
                chef_id,
                image,
                title,
                ingredients,
                preparation,
                information
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        const values = [
            data.chef_id,
            data.image,
            data.title,
            Array(data.ingredients),
            Array(data.prepare),
            data.informations,
        ]

        db.query(query, values, (err, results) => {
            if (err) throw new Error(`Database error. ${err}`);
            callback(results.rows[0])
        });
    },
    findRecipe(id, callback) {
        db.query(`SELECT recipes.*, chefs.name AS chef_name
        FROM recipes 
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = $1`,[id], (err, results) => {
            if (err) throw `Database error. ${err}`;
            callback(results.rows[0])
        })
    },
    updateRecipe(data, callback) {
        const query = `
        UPDATE recipes SET
            chef_id=($1),
            image=($2),
            title=($3),
            ingredients=($4),
            preparation=($5),
            information=($6)
        WHERE id = $7
        `
        const values = [
            data.chef_id,
            data.image,
            data.title,
            Array(data.ingredients),
            Array(data.preparation),
            data.information,
            data.id
        ]
        
        db.query(query, values, (err, _) => {
            if(err) throw `Database error. ${err}`

            callback()
        })
    },
    deleteRecipe(id, callback) {
        db.query(`DELETE FROM recipes WHERE id = $1`, [id], (err, _) => {
            if (err) throw `Database error. ${err}`

            callback()
        })
    },
    chefsSelectOptions(callback){
        db.query("SELECT name, id FROM chefs", function (err, results) {
          if(err) throw "Database error."
    
          callback(results.rows)
        })
    }
}