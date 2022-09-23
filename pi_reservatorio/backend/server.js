import app from "./src/app.js";

const port = process.env.PORT ||8081;

app.listen(port, () =>{
    console.log(`Servidor rodando na em http://localhost:${port}`);
})