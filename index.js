const express = require("express");
const db = require("./db");
const app = express();
const port = 3200;
const { Pool } = require("pg");

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/students", async(req, res) => {
    try {

        const allStudents = await prisma.students.findMany();

        res.status(200).json({
            status: "success get the database",
            data: allStudents,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/students", async(req, res) => {
    try {
        const { name, address } = req.body;

        await prisma.students.create({
            data: {
                name: name,
                address: address,
            },
        });

        res.status(200).json({
            status: "success",
            message: "Data berhasil dimasukkan",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/students/:id", async(req, res) => {
    const studentId = req.params.id;

    try {
        const student = await prisma.students.findUnique({
            where: {
                id: parseInt(studentId),
            },
        });

        if (!student) {
            res.status(404).json({
                status: "error",
                message: "Data mahasiswa tidak ditemukan",
            });
        } else {
            res.status(200).json({
                status: "success",
                data: student,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.put("/students/:id", async(req, res) => {
    const studentId = req.params.id;
    const { name, address } = req.body;

    try {
        await prisma.students.update({
            where: {
                id: parseInt(studentId),
            },
            data: {
                name: name,
                address: address,
            },
        });

        res.status(200).json({
            status: "success",
            message: "Data berhasil diperbarui",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.delete("/students/:id", async(req, res) => {
    const studentId = req.params.id;
    try {
        await prisma.students.deleteMany({
            where: {
                id: parseInt(studentId),
            },
        });

        res.status(200).json({
            status: "success",
            message: "Data berhasil dihapus",
        });
    } catch (error) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
);