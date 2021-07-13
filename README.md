<h1>CRUD Developers</h1>
<h2>Intalação</h2>
<p>O projeto pode ser executado de 3 maneiras:</p>
<ul>
  <li><a href='#projeto-docker'>Projeto todo em Docker</a></li> 
  <li><a href='#banco-local'>Projeto local com banco em Docker</a></li>
  <li><a href='#projeto-local'>Projeto e banco local</a></li>
</ul>

<h2 id='projeto-docker'>Projeto em Docker</h2>
<p>Para utilizar este passo deve-se ter o Docker e o Docker Compose instalado.</p> 
<p>Na raiz do projeto existe o arquvo <b>docker-compose.yml</b>, basta acessar a pasta do proejeto com o terminar e executar o seguinte comando</p>
<p><code>docker-compose up --build</code></p>
<p>Ao fim da inicialização do projeto basta acessar o navegador com o endereço <b>localhost:3000</b>.</p>
<p><b>* Caso já tenha as imagens do docker na maquina, aconcelho a executar os seguintes comandos para garantir que todas as imagens estão na ultima versão.</b></p>
<p><code>thiagosanrodrigues/frontendcrud</code><p/>
<p><code>thiagosanrodrigues/backendcrud</code><p/>
<p><code>thiagosanrodrigues/dbcrud</code><p/>

<h2 id='banco-local'>Projeto local com banco em Docker</h2>
<h3>Iniciando banco de dados</h3>
<p>Após clonar o projeto,com o terminal acesse a pasta <b>banco</b> do projeto, dentro desta pasta   existe o arquvo <b>docker-compose.yml</b>, basta acessar a pasta do proejeto com o terminar e executar o seguinte comando:</p>
<p><code>docker-compose up --build</code></p>

<h3>Iniando backend</h3>
<p>Após iniciar o banco de dados, abra um novo terminal e acesse a pasta <b>backend</b> e execute o seguinte comando:</p>
<p><b>NPM</b></p>
<p><code>npm run start-db-docker</code></p> 
<p><b>Yarn</b></p>
<p><code>yarn start-db-docker</code></p> 
<p>Este comando irá executar as rotinas de criação de tabelas e trigger, popular banco de dados com informações.</p>

<h3>Iniciando frontend</h3>
<p>Após inciar o backend, abra um novo terminal e acesse a pasta <b>frontend</b> e execute o seguinte comando:</p>
<p><b>NPM</b></p>
<p><code>npm start</code></p> 
<p><b>Yarn</b></p>
<p><code>yarn start</code></p>
<p>Ao fim da inicialização do projeto basta acessar o navegador com o endereço localhost:3000.</p>

<h2 id='projeto-local'>Projeto e banco local</h2>
<p>Está etapa é a mais trabalhosa, como pré-requisito deve-se ter o banco de dados PostgreSQL instalado.<br>
  O primeiro passo é criar um banco de dados com o nome <b>crud</b>.  
</p>
