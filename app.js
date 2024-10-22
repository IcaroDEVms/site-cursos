const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
const port = 2005;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('public'));
app.use(bodyParser.json()); // Agora aceita JSON

//Rota para atualizar dados do usuário
app.put('/atualizar-usuario/:id', (req, res) =>{
    const userId = req.params.id;
    const { nome, email } = req.body;

    const query = 'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?';

    connection.query(query, [nome, email, userId], (err, result) =>{
        if(err){
            return res.status(500).send('Erro ao atualizar o usuario');
        }
        res.send('Usuario atualizado com sucesso')
    })
})

//Rota para exibir dados do usuário
app.get('/buscar-usuario/:id', (req, res) =>{
    const userId = req.params.id;

    const query = 'SELECT nome, email FROM usuarios WHERE id = ?';

    connection.query(query, [userId], (err, result) =>{
        if(err){
            return res.status(500).send('Erro ao buscar dados');
        }
        if(result.length >0){
            res.json(result[0]);
        }else{
            res.status(404).send('Usuário não encontrado');
        }
    });
});

// Rota para cadastro de e-mail
app.post('/cadastrar-usuario', (req, res) => {
    const { email, senha, confirmarSenha, nome } = req.body;

    if (senha !== confirmarSenha) {
        return res.status(400).send('As senhas não coincidem.');
    }

    const query = 'INSERT INTO usuarios (email, senha, nome) VALUES (?, ?, ?)';

    console.log("Valores a serem inseridos: "+ email, senha, confirmarSenha, nome);

    connection.query(query, [email, senha, nome], (err, result) => {
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
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';

    connection.query(query, [email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao buscar no banco de dados: ' + err.stack);
            return res.status(500).send('Erro ao fazer login.');
        }

        if (results.length > 0) {
            res.json({message: "Login bem-sucedido!", id: results[0].id});
        } else {
            res.status(401).send('E-mail ou senha incorretos.');
        }
    });
});

// Rota para obter todos os e-mails (não usa req.body)
app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios';

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
