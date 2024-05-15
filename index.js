const express = require("express");
const db = require("./db");
const app = express();
const port = 3200;
const { Pool } = require("pg");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/students", async(req, res) => {
    try {
        const result = await db.query("SELECT * FROM students");
        res.status(200).json({
            status: "success get the database",
            data: result.rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/students/:id", (req, res) => {
    const studentId = req.params.id;
    db.query(`SELECT * FROM students WHERE id = ${studentId}`, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            if (result.rows.length === 0) {
                res.status(404).json({
                    status: "error",
                    message: "Data mahasiswa tidak ditemukan",
                });
            } else {
                res.status(200).json({
                    status: "success",
                    data: result.rows[0],
                });
            }
        }
    });
});

app.post("/students", async(req, res) => {
    const { name, address } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO students (name, address) VALUES ('${name}', '${address}')`
        );

        res.status(200).json({
            status: "success",
            message: "Data berhasil dimasukkan",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.put("/students/:id", (req, res) => {
    const studentId = req.params.id;
    const { name, address } = req.body;

    db.query(
        `UPDATE students SET name = 'Andreas', address = 'Bitung' WHERE id = ${studentId}`,
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Internal Server Error");
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Data berhasil diperbarui",
                });
            }
        }
    );
});

app.delete("/students/:id", (req, res) => {
    const studentId = req.params.id;
    db.query(`DELETE FROM students WHERE id = ${studentId}`, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.status(200).json({
                status: "success",
                message: "Data berhasil dihapus",
            });
        }
    });
});

app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
);