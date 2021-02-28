const db = require("../../config/db")

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM recipes ORDER BY title ASC`, (err, results) => {
            if(err) throw new Error(`Database error. ${err}`)
            callback(results.rows)
        })
    },
    create(data,callback) {
        const query = `
            INSERT INTO recipes (
                image_url,
                title,
                author,
                ingredients,
                prepare,
                informations
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
    find(id, callback) {
        db.query(`SELECT * FROM recipes WHERE id = $1`,[id], (err, results) => {
            if (err) throw `Database error. ${err}`;
            callback(results.rows[0])
        })
    }
}