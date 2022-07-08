var conn = require('./db')

module.exports = {
    render(req, res, error) {
        res.render("admin/login", {
            body: req.body,
            error
        });
    },

    login(email, password) {
        return new Promise((s, f) => {
            conn.query(`
                SELECT * FROM tb_users WHERE email = ?
            `, [
                email
            ], (err, results) => {
                if (err) {
                    f(err);
                } else {
                    if (!results.length > 0) {
                        f('usuário ou senha incorretos!')
                    } else {
                        let row = results[0];
                        if (row.password !== password) {
                            f('usuário ou senha incorretos!')

                        } else {
                            s(row)
                        }
                    }
                }
            });
        });
    }
}