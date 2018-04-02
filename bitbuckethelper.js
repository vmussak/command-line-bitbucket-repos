#!/usr/bin/env node

const request = require('./request');
const comandos = require('commander');
const { prompt } = require('inquirer');

comandos
  .version('1.0.0')
  .description('Buscar repositorios do Bitbucket');

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
  .description('Buscar repositórios de um usuário')
  .action(async () => {

    let respostas = await prompt(questoes);

    let repos = await request.buscarRepositorios(respostas);

    console.info(repos);
    
  });

comandos.parse(process.argv);
