DROP DATABASE IF EXISTS bancoEmail;
create database bancoEmail;
use bancoEmail;

create table usuarios(
id int auto_increment not null,
email varchar(70) not null,
senha varchar(255),
nome varchar(50),
imagePath varchar(40),
primary key(id)
);

CREATE TABLE cursos (
    id INT PRIMARY KEY AUTO_INCREMENT,  -- ID do curso
    nome VARCHAR(255),                  -- Nome do curso
    carga_horaria INT,                  -- Carga horária do curso em horas
    data_criacao DATE,                  -- Data de criação do curso
    qtd_aulas INT,
    pathAula VARCHAR(255),				-- Path do html das aulas 
    imgCurso VARCHAR(255),				-- Path do local do icone do curso
    bannerCurso VARCHAR(255)			-- Path do local do banner do curso
);

CREATE TABLE matriculas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuarioIdFK INT,         -- Chave estrangeira para a tabela emails
    cursoIdFK INT,         -- ID do curso
    progresso INT DEFAULT 0,
    data_matricula TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Data da matrícula
    CONSTRAINT fk_usuario_matricula FOREIGN KEY (usuarioIdFK) REFERENCES usuarios(id),
    CONSTRAINT fk_curso_matricula FOREIGN KEY (cursoIdFK) REFERENCES cursos(id)
);

CREATE TABLE aulas (
    id INT PRIMARY KEY AUTO_INCREMENT,    -- ID da etapa
    curso_id INT,                         -- ID do curso ao qual a etapa pertence
    nome VARCHAR(255),                    -- Nome da etapa
    numero_ordem INT,                     -- Ordem da etapa no curso
    estrelas INT,
    CONSTRAINT fk_curso_aulas FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

CREATE TABLE conclusoes_aulas (
    id INT PRIMARY KEY AUTO_INCREMENT,    -- ID único para cada conclusão de etapa
    usuarioIdFK INT,                      -- ID do usuário (chave estrangeira para tabela usuarios)
    aula_id INT,                         -- ID da etapa (chave estrangeira para tabela etapas)
    data_conclusao DATE,                  -- Data em que o usuário concluiu a etapa
    CONSTRAINT fk_usuario_conclusao FOREIGN KEY (usuarioIdFK) REFERENCES usuarios(id),
    CONSTRAINT fk_etapa_conclusao FOREIGN KEY (aula_id) REFERENCES aulas(id)
);
SELECT * FROM usuarios;
     
INSERT INTO cursos (nome, carga_horaria, data_criacao, qtd_aulas, pathAula, imgCurso, bannerCurso) VALUES
  ('Curso de Git', 1, '2024-10-27', 5, 'aulaGit.html', 'public/img/git-removebg-preview.png', '/public/img/logo-git.png'),
  ('Curso de Valorant', 1.10, '2024-10-27', 7, 'aulaValorant.html', 'public/img/vava-removebg-preview.png', '/public/img/VALORANT.jpg'),
  ('Curso de League of Legends', 2.5, '2024-10-27', 9, 'aulaLol.html', 'public/img/lol-removebg-preview.png', '/public/img/lol.jpeg'),
  ('Curso de Rocket League', 1.30, '2024-10-27', 6, 'aulaRL.html', 'public/img/rocket-removebg-preview.png', '/public/img/rocket.jpeg'),
  ('Curso de Rainbow Six', 1.10, '2024-10-27', 7, 'aulaR6.html', 'public/img/r6-removebg-preview.png', '/public/img/R6.jpg');

INSERT INTO aulas (curso_id, nome, numero_ordem) VALUES
	(1, 'Git, versionamento e gitHub', 1),
    (1, 'Praticando', 2),
    (1, 'Branches', 3),
    (1, 'fork, pull request, tags e releases', 4),
    (1, 'Git stash e fluxo de trabalho', 5),
    
    (2, 'Iniciadores', 1),
    (2, 'Controladores', 2),
    (2, 'Sentinelas', 3),
    (2, 'Duelistas', 4),
    (2, 'Como escolher o main?', 5),
    (2, 'Como melhorar a mira?', 6),
    (2, 'Como economizar?', 7),
    
    (3, 'Como jogar na Top Lane?', 1),
    (3, 'Como jogar na Mid Lane?', 2),
    (3, 'Como rotacionar na Mid Lane?', 3),
    (3, 'Como jogar de Sup?', 4),
    (3, 'Como jogar de Adc?', 5),
    (3, 'Como jogar na Jungle?', 6),
    (3, 'Erros que você comete na jungle', 7),
    (3, 'Como ganhar a fase de rotas?', 8),
    (3, 'Segredos para evitar ganks!', 9),
    
    (4, 'Rocket League para iniciantes!!', 1),
    (4, 'Como aperfeiçoar seu controle aéreo?', 2),
    (4, 'Aprenda a defender da maneira correta!', 3),
    (4, 'Como dominar a bola?', 4),
    (4, 'Melhores configurações!', 5),
    (4, 'Mecânicas importantes!', 6),
		
    (5, 'Começando no Rainbow Six!!', 1),
    (5, 'Quais as funções dos operadores?', 2),
    (5, 'Os melhores Operadores!', 3),
    (5, 'Aprenda a Atacar no R6!', 4),
    (5, 'Aprenda a Defender no R6!', 5),
    (5, 'Dicas e configurações de pro players!', 6),
    (5, 'Como melhorar sua noção de jogo?', 7);
    
  CREATE TABLE suporte_mensagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuarioIdFK int,
    mensagem TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario_suporte FOREIGN KEY (usuarioIdFK) REFERENCES usuarios(id)
);

select * from cursos;
select * from matriculas;
select * from usuarios;

SELECT 
            c.nome AS nome,
            m.progresso AS progresso,
            c.pathAula AS path,
            c.imgCurso AS imagem,
            c.bannerCurso AS banner
        FROM 
            matriculas m
        JOIN 
            cursos c ON m.cursoIdFK = c.id
        WHERE 
            m.usuarioIdFK = 1;