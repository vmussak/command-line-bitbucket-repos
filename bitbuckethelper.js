#!/usr/bin/env node

const request = require('./request');
const comandos = require('commander');
const inquirer = require('inquirer');

comandos
  .version('1.0.0')
  .description('Buscar repositorios do Github');

const questoes = [
  {
    type: 'input',
    name: 'username',
    message: 'Insira o login do usuário:'
  },
  {
    type: 'password',
    name: 'password',
    message: 'Insira a senha do usuário:'
  },
  {
    type: 'list',
    name: 'role',
    message: 'Escolha o tipo dos repositórios:',
    choices: [ 
      {name: "Dono", value: 'owner'},
      {name: "Membro", value: 'member'} 
    ]
  },
  {
    type: 'list',
    name: 'pagelen',
    message: 'Quantos repositórios quer ver?',
    choices: [ 
      {name: 5, checked: true},
      {name: 10},
      {name: 15} 
    ]
  },
  {
    type: 'confirm',
    name: 'somenteNome',
    message: 'Quer ver somente o nome do repositório?'
  }
];

comandos
  .command('repositorios')
  .alias('u')
  .description('Buscar usuários pelo nome')
  .action(async () => {

    let respostas = await inquirer.prompt(questoes);

    let repos = await request.buscarRepositorios(respostas);

    console.info(repos);
    
  });

comandos.parse(process.argv);

/*
inquirer.prompt(questoes).then((respostas) => {
      try {
        let repos = await request.buscarRepositorios({
          password: respostas.username,
          username: respostas.password
        });

        console.info(repos);

        // repos.map((repo) => {
        //   console.info(repo.name);
        // });

      } catch (error) {
        console.error(error);
      }
    })


*/
