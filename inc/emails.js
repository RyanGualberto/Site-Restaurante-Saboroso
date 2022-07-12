var conn = require('./db')

module.exports = {
    render(req, res, error, sucess){
        res.render('emails', {
            title: 'Email - Restaurante Saboroso!',
            background: 'images/img_bg_3.jpg',
            h1: 'Diga Um Oi!',
            body: req.body,
            error, 
            sucess
        });
    },

    save(req){
        return new Promise((s, f) => {
            if (!req.fields.email) {
                f( 'Preencha O Email.');
            } else {
                conn.query(`
                INSERT INTO tb_emails (email) VALUES (?)
                `, [
                    req.fields.email
                ], (err, results) => {
                    if(err){
                        f(err.message);
                    } else {
                        s(results);
                    }
                })
            }
        });
    },

    getEmails() {
        return new Promise((resolve, reject) => {
            conn.query(`
                 SELECT * FROM tb_emails ORDER BY email 
                `, (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            });
        });
    },
    
    delete(id){
        return new Promise((resolve, reject) => {
            conn.query(`
                DELETE FROM tb_emails WHERE id = ?
            `, [
                id
            ], (err, results) => {
                if(err){
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        })
    }

}