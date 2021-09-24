const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM hijo', (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.render('hijos', {
                data: rows
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, connection) => {
        const query = connection.query('INSERT INTO hijo set ?', data, (err, rows) => {
            console.log(err)
            console.log(rows)
            res.redirect('/');
        });
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM customer WHERE id = ?", [id], (err, rows) => {
            res.render('customers_edit', {
                data: rows[0]
            })
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {

        conn.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        connection.query('DELETE FROM hijo WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
}

module.exports = controller;