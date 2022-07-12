var conn = require('./db');
var Pagination = require('./../inc/Pagination')
module.exports = {
    render(req, res, error, sucess) {

        res.render('reservations', {
            title: 'Reservas - Restaurante Saboroso!',
            background: 'images/img_bg_2.jpg',
            h1: 'Reserve uma Mesa!',
            body: req.body,
            error,
            sucess
        });
    },
    getReservations(page) {
        if (!page) page = 1;

        let pag = new Pagination(`
             SELECT SQL_CALC_FOUND_ROWS * FROM tb_reservations ORDER BY name LIMIT ?,?
        `);
        return pag.getPage(page)
    },

    save(fields) {
        return new Promise((s, f) => {
            if (fields.date.indexOf('/') > -1) {

                let date = fields.date.split('/');
                fields.date = `${date[2]}-${date[1]}-${date[0]}`
            }


            let query, params = [
                fields.name,
                fields.email,
                fields.people,
                fields.date,
                fields.time
            ];

            if (parseInt(fields.id) > 0) {
                query = `
                        UPDATE tb_reservations 
                        SET 
                            name = ?,
                            email = ?,
                            people = ?,
                            date = ?,
                            time = ?
                        Where id = ?
                    `;

                params.push(fields.id);
            } else {
                query = `
                INSERT INTO tb_reservations(name, email, people, date, time)
                VALUES(?,?,?,?,?)
                `;
            }

            conn.query(query, params, (err, results) => {
                if (err) {
                    f(err);
                } else {
                    s(results);
                }
            });
        })

    },
    delete(id) {
        return new Promise((resolve, reject) => {
            conn.query(`
                DELETE FROM tb_reservations WHERE id = ?
            `, [
                id
            ], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        })
    }
}