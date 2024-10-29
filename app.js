const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
const multer = require('multer');
const path = require('path');
const port = 2005;

const app = express();

// Middleware para processar dados de formulários
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Para aceitar JSON

app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rota para inserir uma nova matrícula
app.post('/cadastrar-matricula/:id', (req, res) => {
    const userId = req.params.id;
    const cursoId = req.body.cursoId;
    
    console.log("matricula feita\nuserId: ", userId, "\ncursoId: ", cursoId);

    const query = 'INSERT INTO matriculas (usuarioIdFK, cursoIdFK) VALUES (?, ?)';
    connection.query(query, [userId, cursoId], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao inserir matrícula' });
      } else {
        res.json({ message: 'Matrícula inserida com sucesso', matriculaId: result.insertId });
      }
    });
  });

// Configuração do Multer para envio de imagens
let imageCounter = 0;

const storage = multer.diskStorage({
    destination: 'public/userIMG',
    filename: (req, file, cb) =>{
        imageCounter++;
        const fileExtension = path.extname(file.originalname);
        cb(null, `userImg${imageCounter}${fileExtension}`);
    }
});

const upload = multer({storage: storage});

app.post('/upload-image', upload.single('image'), (req, res) =>{
    if(!req.file){
        res.status(400).send('nenhuma imagem enviada.');
    }
    
    const imagePath = `/public/userIMG/${req.file.filename}`;
    console.log(imagePath)

    res.status(200).json({
        message: 'Imagem enviada com sucesso',
        imagePath: imagePath
    });

});

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

//Rota para atualizar path da imagem do usuário
app.put('/atualizar-imgUsuario/:id', (req, res) =>{
    const userId = req.params.id;
    const imagePath = req.body.imagePath;

    const query = 'UPDATE usuarios SET imagePath = ? WHERE id = ?';
    
    connection.query(query, [imagePath, userId], (err, result) =>{
        if(err){
            return res.status(500).send('Erro ao atualizar o usuario');
        }
        console.log('path do usuario atualizado\n'+'id: '+userId+'\nimagePath: '+imagePath);
        res.json({ message: 'Usuario atualizado com sucesso' });
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
    const defaultImgPath = '/public/userIMG/defaultUser.png';

    if (senha !== confirmarSenha) {
        return res.status(400).send('As senhas não coincidem.');
    }
    const query = 'INSERT INTO usuarios (email, senha, nome, imagePath) VALUES (?, ?, ?, ?)';

    console.log("Valores a serem inseridos: "+ email, senha, confirmarSenha, nome);

    connection.query(query, [email, senha, nome, defaultImgPath], (err, result) => {
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

app.get('/buscar-imagemPath/:id', (req, res) =>{
    const userId = req.params.id;

    const query = 'SELECT imagePath FROM usuarios WHERE id = ?';
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


// Rota para lidar com o envio de mensagens de suporte
app.post('/enviar-mensagem-suporte/:id', (req, res) => {



    const userId = req.params.id;
    const { mensagem } = req.body;
    
    // Verifique se os dados estão sendo recebidos
    console.log("Dados recebidos: ", mensagem);

    const query = 'INSERT INTO suporte_mensagens (mensagem, idUsuarioFK) VALUES (?, ?)';
    connection.query(query, [mensagem, userId], (err, result) => {
        if (err) {
            console.error('Erro ao inserir mensagem de suporte: ' + err.stack);
            return res.status(500).send('Erro ao enviar a mensagem.');
        }
        res.json({ message: 'Mensagem enviada com sucesso!' });
    });
});