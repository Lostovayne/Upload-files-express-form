const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
app.use(fileUpload());
app.use(express.static("public"));

app.post("/upload", (req, res) => {
    if (req.files === null) {
        return res
            .status(400)
            .json({ message: "No se ha seleccionado ningún archivo" });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        // res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
        res.send("Imagen subida correctamente");
    });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});
