#LARAVEL REST_API + VUEJS (Single Page Application)
##Considerações Iniciais
O material utilizado nesta aplicação foi retirado e adaptado dos seguintes links:
https://www.youtube.com/watch?v=u6a1G7LpWFU 
https://github.com/vedcasts/series-vuejs-project/

Esta aplicação visa o aprendizado da criação de uma REST API através do Laravel e gerenciada pelo Vue.

Gostaria de agradecer especialmente ao Fabio Vedovelli pelos ensinamentos. Acesse suas aulas em:
http://www.vedcasts.com.br/

##Instruções de Instalação

Você deve, primeiramente, abrir seu Terminal, ler a lista e digitar os comandos nesta ordem: 
1. Clonar o projeto:
```sh
$ git clone git@github.com:emanuellarini/laravel_vuejs.git
```

2. Acessar a pasta do projeto:
```sh
$ cd laravel_vuejs/
```

3. Instalar o NodeJS e NPM. Para realizar a instalação siga os tutoriais dos sites:
```sh
https://www.nodejs.org/
https://www.npmjs.com/
``` 
4. Instalar e executar o Composer:
```sh
$ composer install
```

5. As bibliotecas/frameworks necessárias para execução e criação do projeto estão lisadas no arquivo `/package.json`. Você perceberá que a aplicação contém Gulp, Laravel Elixir, Jquery, Jquery Validation, Jquery Mask, Vue, Vue Resource, Lodash, Moment, Select2, Bootstrap e Font-Awesome. Rodando o próximo comando será criada a pasta `/node_modules` que conterá todas essas bibliotecas.
```sh
$ npm install
```

6. Execute o Gulp:
```sh
$ gulp
``` 

7. Abra o arquivo `/.env.example`, crie um arquivo `/.env` e cole seu conteúdo nele. Faça suas modificações com dados da sua conexão com o Banco MySQL. Deixe criado um Schema com o nome que você colocou em DB_DATABASE.

8. Rode as Migrations do Laravel, estas criarão as tabelas vindas dos arquivos `/database/migrations/*`:
```sh
$ php artisan migrate
```

9. Os arquivos principais do projeto encontram-se em `/resources/views/users/index.blade.php` e `/resources/assets/js/app.js`.

10. Lembre-se de utilizar o Watch do Gulp para modificar o app.js (obs: se desejar adicionar nova biblioteca rode novamente o comando feito em 6):
```sh
$ gulp watch
```