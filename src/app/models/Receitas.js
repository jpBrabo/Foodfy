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
                chef_id
                image,
                title,
                ingredients,
                preparation,
                information
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        const values = [
            data.image_url,
            data.title,
            data.author,
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
        db.query(`SELECT * FROM recipes WHERE id = $1`,[id], (err, results) => {
            if (err) throw `Database error. ${err}`;
            callback(results.rows[0])
        })
    },
    updateRecipe(data, callback) {
        const query = `
        UPDATE recipes SET
            title=($1),
            image_url=($2),
            ingredients=($3),
            prepare=($4),
            informations=($5)
        WHERE id = $6
        `
        const values = [
            data.title,
            data.image_url,
            Array(data.ingredients),
            Array(data.prepare),
            data.informations,
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
}