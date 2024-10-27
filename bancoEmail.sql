
create database bancoEmail;
use bancoEmail;

create table usuarios(
id int auto_increment not null,
email varchar(70) not null,
senha varchar(50),
nome varchar(50),
imagePath varchar(40),
primary key(id)
);

CREATE TABLE matriculas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email_id INT,         -- Chave estrangeira para a tabela emails
    curso_id INT,         -- ID do curso
    data_matricula DATE,  -- Data da matrícula
    CONSTRAINT fk_email FOREIGN KEY (email_id) REFERENCES usuarios(id)
);

CREATE TABLE cursos (
    id INT PRIMARY KEY AUTO_INCREMENT,  -- ID do curso
    nome VARCHAR(255),                  -- Nome do curso
    carga_horaria INT,                  -- Carga horária do curso em horas
    data_criacao DATE                   -- Data de criação do curso
);

CREATE TABLE progressos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email_id INT,         -- Chave estrangeira para a tabela emails
    curso_id INT,         -- ID do curso
    progresso INT,        -- Percentual de progresso (0-100)
    data_atualizacao DATE,-- Data da última atualização
    CONSTRAINT fk_email_progresso FOREIGN KEY (email_id) REFERENCES usuarios(id)
);


CREATE TABLE etapas (
    id INT PRIMARY KEY AUTO_INCREMENT,    -- ID da etapa
    curso_id INT,                         -- ID do curso ao qual a etapa pertence
    nome VARCHAR(255),                    -- Nome da etapa
    descricao TEXT,                       -- Descrição da etapa
    numero_ordem INT,                     -- Ordem da etapa no curso
    CONSTRAINT fk_curso_etapa FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

CREATE TABLE conclusoes_etapas (
    id INT PRIMARY KEY AUTO_INCREMENT,    -- ID único para cada conclusão de etapa
    email_id INT,                         -- ID do usuário (chave estrangeira para tabela emails)
    etapa_id INT,                         -- ID da etapa (chave estrangeira para tabela etapas)
    data_conclusao DATE,                  -- Data em que o usuário concluiu a etapa
    CONSTRAINT fk_email_etapa FOREIGN KEY (email_id) REFERENCES usuarios(id),
    CONSTRAINT fk_etapa_conclusao FOREIGN KEY (etapa_id) REFERENCES etapas(id)
);

SELECT * FROM usuarios;
     
INSERT INTO cursos (nome, carga_horaria, data_criacao) VALUES
  ('Curso de Git', 1, '2024-10-27'),
  ('Curso de Valorant', 1.10, '2024-10-27'),
  ('Curso de League of Legends', 2.5, '2024-10-27'),
  ('Curso de Rocket League', 1.30, '2024-10-27'),
  ('Curso de Rainbow Six', 1.10, '2024-10-27');