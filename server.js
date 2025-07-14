const express = require('express');
const path = require('path')
const fs = require('fs')


const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.get('/contato', (req, res) => {

    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});


app.post('/contato', (req, res) => {
    
    const {nome, email, assunto, mensagem} = req.query
    console.log([nome, email, assunto, mensagem])

    res.send(`<h1>Suas informações de contato<h1>
            <h2>Nome: ${nome}<h2>
            <h2>email: ${email}</h2>
            <h2>assunto: ${assunto}</h2>
            <h2>mensagem: ${mensagem}</h2>
            `);
});


app.get('/sugestao', (req, res) => {
    const {nome, ingredientes} = req.query

    res.send(`<h1>Obrigado por sua ajuda! Agradecemos a sugestão<h1>
            <h2>Nome: ${nome}<h2>
            <h2>Ingredientes: ${ingredientes}<h2>`)
});



app.get('/api/lanches', (req, res) => {
    const json = fs.readFileSync(path.join(__dirname, 'public', 'data', 'lanches.json'), 'utf-8')
    const dados = JSON.parse(json)
        
    const data_html = dados.reduce((total, item)=>{
    const info = `id: <h3>${item.id}</h3>
    <h3>nome: ${item.nome}</h3>
    <h3>Ingredientes: ${item.ingredientes}</h3>`
    return total + info}, '')
    res.send(data_html);
})



app.listen(PORT, () => {
    console.log(`Servidor da Devburger rodando na porta :${PORT}`)
})
