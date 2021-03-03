const db = require("../../config/db")

module.exports = { 
    // - Model dos chefs
    allChefs(callback) {
        db.query(`SELECT * FROM chefs ORDER BY name ASC`, (err, results) => {
            if(err) throw new Error(`Database error. ${err}`)
            callback(results.rows)
        })
    },
    createChef(data,callback) {
        const query = `
            INSERT INTO chefs (
                name,
                avatar_url
            ) VALUES ($1, $2)
            RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
        ]
        db.query(query, values, (err, results) => {
            if (err) throw new Error(`Database error. ${err}`);
            callback(results.rows[0])
        });
    },
    findChef(id, callback) {
        db.query(`SELECT * FROM chefs WHERE id = $1`,[id], (err, results) => {
            if (err) throw `Database error. ${err}`;
            callback(results.rows[0])
        })
    },
    updateChef(data, callback) {
        const query = `
        UPDATE chefs SET
            name=($1),
            avatar_url=($2)
        WHERE id = $3
        `
        console.log(data)
        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]
        
        db.query(query, values, (err, _) => {
            if(err) throw `Database error. ${err}`

            callback()
        })
    },
    deleteChef(id, callback) {
        db.query(`DELETE FROM chefs WHERE id = $1`, [id], (err, _) => {
            if (err) throw `Database error. ${err}`

            callback()
        })
    },
}