# Viver de Teste 1.ª Temporada

<h1 align="left">
    <img src=".github/logo-stiker.svg" width="250px">
</h1>

[![API-Tests-Cypress](https://github.com/thinogueiras/VDT-Season01-API-Tests-Cypress/actions/workflows/ci-cypress.yaml/badge.svg?branch=master)](https://github.com/thinogueiras/VDT-Season01-API-Tests-Cypress/actions/workflows/ci-cypress.yaml)

<h2>🐞 🔍 Last Cypress Test Results on GitHub Actions 🔎 🐞</h2>
<h2>Cypress Results</h2>
<table><tr><th>Result</th><th>Passed ✅</th><th>Failed ❌</th><th>Pending ✋</th><th>Skipped ↩️</th><th>Duration 🕗</th></tr><tr><td>Passing ✅</td><td>12</td><td>0</td><td>0</td><td>0</td><td>6.409s</td></tr></table>
<a href="">

# Marvel API

## 🔖 Requisitos funcionais

### Cadastro de Personagens

- [X] Deve poder cadastrar um personagem com as características conforme tabela abaixo:
- [X] Deve retornar o id do personagem ao realizar o cadastro
- [X] Não deve cadastrar personagem com nome duplicado
- [X] Com exceção da idade, todos os campos são obrigatórios

| campos | descrição                             | tipo     | obrigatório |
| ------ | :------------------------------------ | -------- | ----------- |
| name   | nome do personagem                    | texto    | sim         |
| age    | idade                                 | inteiro  | não         |
| alias  | codinome                              | texto    | sim         |
| team   | afiliações (vingadores, x-men, etc..) | lista    | sim         |
| active | se o personagem está ativo ou não     | booleano | sim         |

### Busca de Personagens

- [X] Deve retornar uma lista de personagens cadastrados
- [X] Deve poder buscar personagem por nome
- [X] Deve poder buscar personagem pelo id
- [X] Deve retornar o statusCode = 404 ao buscar por id não cadastrado

### Remover Personagem

- [X] Deve permitir remover por id, um personagem cadastrado
- [X] Deve retornar o statusCode = 404 ao tentar remover um id não cadastrado

## 🚀 Tecnologias

- [Node.js] - plataforma de desenvolvimento
- [Express] - framework onde a API foi construída
- [Cypress] - framework de testes automatizados
- [MongoDB] - Banco de dados (Não relacional)

## 👨🏻‍💻 Como executar o projeto

[Node.js](https://nodejs.org/) v16 ou superior para executar.

Execute os comandos abaixo para instalar das dependências do projeto e execução dos testes:

```sh
cd vdt-season1-marvel-api
npm i
npx cypress run
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feito com 💜&nbsp;por [Fernando Papito](https://www.linkedin.com/in/papitoio/) 👋&nbsp;e adaptado por [Thiago Nogueira dos Santos](https://www.linkedin.com/in/thinogueiras/).
