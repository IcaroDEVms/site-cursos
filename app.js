const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
const port = 2005;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('public'));
app.use(bodyParser.json()); // Agora aceita JSON


// Rota para cadastro de e-mail
app.post('/cadastrar-email', (req, res) => {
    const { email, senha, confirmarSenha } = req.body;

    if (senha !== confirmarSenha) {
        return res.status(400).send('As senhas não coincidem.');
    }

    const query = 'INSERT INTO emails (email, senha) VALUES (?, ?)';

    connection.query(query, [email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao inserir no banco de dados: ' + err.stack);
            return res.status(500).send('Erro ao cadastrar o e-mail.');
        }
        // res.send('E-mail cadastrado com sucesso!');
        res.json({ message: 'E-mail cadastrado com sucesso!' });
    });
});

// Rota para login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const query = 'SELECT * FROM emails WHERE email = ? AND senha = ?';

    connection.query(query, [email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao buscar no banco de dados: ' + err.stack);
            return res.status(500).send('Erro ao fazer login.');
        }

        if (results.length > 0) {
            res.send('Login bem-sucedido!');
        } else {
            res.status(401).send('E-mail ou senha incorretos.');
        }
    });
});

// Rota para obter todos os e-mails (não usa req.body)
app.get('/emails', (req, res) => {
    const query = 'SELECT * FROM emails';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar no banco de dados: ' + err.stack);
            return res.status(500).send('Erro ao buscar e-mails.');
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
});
