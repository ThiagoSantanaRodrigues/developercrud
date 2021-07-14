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
<p>Na raiz do projeto existe o arquivo <b>docker-compose.yml</b>, basta acessar a pasta do projeto com o terminal e executar o seguinte comando</p>
<pre><code>docker-compose up --build</code></pre>
<p>Ao fim da inicialização do projeto basta acessar o navegador com o endereço <b>localhost:3000</b>.</p>
<p><b>* Caso já tenha as imagens do docker na maquina, aconcelho a executar os seguintes comandos para garantir que todas as imagens estejam na ultima versão.</b></p>
<pre><code> docker pull thiagosanrodrigues/frontendcrud</code></pre>
<pre><code> docker pull thiagosanrodrigues/backendcrud</code></pre>
<pre><code> docker pull thiagosanrodrigues/dbcrud</code></pre>

<h2 id='banco-local'>Projeto local com banco em Docker</h2>
<h3>Iniciando banco de dados</h3>
<p>Após clonar o projeto,com o terminal acesse a pasta <b>banco</b> do projeto, dentro desta pasta   existe o arquivo <b>docker-compose.yml</b>, basta acessar a pasta do projeto com o terminal e executar o seguinte comando:</p>
<p><pre><code>docker-compose up --build</code></pre></p>
<p><b>* Caso já tenha a imagen do docker na maquina, aconcelho a executar o seguinte comando para garantir que a imagen esteja na ultima versão.</b></p>
<pre><code> docker pull thiagosanrodrigues/dbcrud</code></pre>

<h3>Iniando backend</h3>
<p>Após iniciar o banco de dados, abra um novo terminal e acesse a pasta <b>backend</b> e execute o seguinte comando:</p>
<p><b>NPM</b></p>
<pre><code>npm run start-db-docker</code></pre>
<p><b>Yarn</b></p>
<pre><code>yarn start-db-docker</code></pre>
<p>Este comando irá executar as rotinas de criação de tabelas e trigger, popular banco de dados com informações.</p>

<h3>Iniciando frontend</h3>
<p>Após inciar o backend, abra um novo terminal e acesse a pasta <b>frontend</b> e execute o seguinte comando:</p>
<p><b>NPM</b></p>
<pre><code>npm start</code></pre>
<p><b>Yarn</b></p>
<pre><code>yarn start</code></pre>
<p>Ao fim da inicialização do projeto basta acessar o navegador com o endereço localhost:3000.</p>

<h2 id='projeto-local'>Projeto e banco local</h2>
<h3>Configurando o banco de dados</h3>
<p>Está etapa é a mais trabalhosa, como pré-requisito deve-se ter o banco de dados PostgreSQL instalado.<br>
  O primeiro passo é criar um banco de dados com o nome <b>crud</b>.  
</p>
<p>Após esse processo execute o seguinte comando no banco de dados</p>
<pre><code>ALTER DATABASE crud SET datestyle TO "ISO, DMY";</code></pre>
<p><b>O banco de dados esta configurado para a senha 123</b></p>
<p>Caso queira alterar a senha acesse o arquivo <b>backend/knexfile.js</b></p>

<h3>Iniando backend</h3>
<p>Após iniciar o banco de dados, abra um novo terminal e acesse a pasta <b>backend</b> e execute o seguinte comando:</p>
<p><b>NPM</b></p>
<pre><code>npm run start-db-local</code></pre>
<p><b>Yarn</b></p>
<pre><code>yarn start-db-local</code></pre>
<p>Este comando irá executar as rotinas de criação de tabelas e trigger, popular banco de dados com informações.</p>

<h3>Iniciando frontend</h3>
<p>Após inciar o backend, abra um novo terminal e acesse a pasta <b>frontend</b> e execute o seguinte comando:</p>
<p><b>NPM</b></p>
<pre><code>npm start</code></pre>
<p><b>Yarn</b></p>
<pre><code>yarn start</code></pre>
<p>Ao fim da inicialização do projeto basta acessar o navegador com o endereço localhost:3000.</p>

<h2>API</h2>
<h2>Consultas</h2>
<p>Para consultar os desenvolvedores utilize o metodo <b>GET</b> para a rota <b>/developers</b>.
<h2>Consulta com filtro</h2>
<p>Para filtrar utilize querystring</p>
<pre><code>/developers?name=thiago</code></pre>
<p>Os filtros disponiveis são:</p>
<ul>
  <li><b>Name : </b>(nome) tipo string;</li>
  <li><b>Gender : </b>(Sexo) tipo char que pode receber dois possiveis valores M (Masculino) e F (Feminino);</li>
  <li><b>Hobby : </b> tipo string;</li>
  <li><b>age : </b>(idade) tipo inteiro;</li>
  <li><b>birthdate : </b>(data nascimento): tipo date com formato dia/mes/ano (DD/MM/YYYY);</li>
</ul>
<h2>Consulta por ID </h2>
<p>Para consultar um unico desenvolverdor utilize o metodo <b>GET</b> para a rota <b>/developers/id</b>, passando o código do desenvolvedor na url.</p>
<p>O ID é do tipo uuid, informe um valor valido</p>
<pre><code>/developers/b71b85af-af93-4647-864d-ed41adeb51d5</code></pre>

<h2>Cadastro</h2>
<p>Para cadastrar um novo desenvolverdor utilize o metodo <b>POST</b> para a rota <b>/developers</b>, informe os dados no corpo da requisição no formato JSON.</p>
<p>Campos:</p>
<ul>
  <li><b>Name : </b>(nome) tipo string</li>
  <li><b>Gender : </b>(Sexo) tipo char que pode receber dois possiveis valores M - Masculino e F - Feminino</li>
  <li><b>Hobby : </b> tipo string</li>
  <li><b>birthdate : </b>(data nascimento): tipo date com formato dia/mes/ano (DD/MM/YYYY)</li>
</ul>
<pre>
<code>
{
	"name" : "Thiago rodrigues",
	"gender" : "M",
	"hobby" : "programar",
	"birthDate" : "27/12/1992"
}
</code>
</pre>
<p><b>* o campo age (idade) será canculado automaticamente por uma trigger no banco de dados.</b></p>

<h3>Alterar</h3>
<p>Para alterar um desenvolverdor utilize o metodo <b>PUT</b> para a rota <b>/developers/id</b> ,informe o id na url no formato uuid, passe os dados no corpo da requisição no formato JSON.</p>
<p>Campos:</p>
<ul>
  <li><b>Name : </b>(nome) tipo string;</li>
  <li><b>Gender : </b>(Sexo) tipo char que pode receber dois possiveis valores M (Masculino) e F (Feminino);</li>
  <li><b>Hobby : </b> tipo string;</li>
  <li><b>birthdate : </b>(data nascimento): tipo date com formato dia/mes/ano (DD/MM/YYYY);</li>
</ul>
<pre>
<code>
{
	"name" : "Thiago rodrigues",
	"gender" : "M",
	"hobby" : "programar",
	"birthDate" : "27/12/1992"
}
</code>
</pre>
<p><b>* o campo age (idade) será canculado automaticamente por uma trigger no banco de dados.</b></p>

<h3>Deletar</h3>
<p>Para deletar um desenvolverdor utilize o metodo <b>DELETE</b> para a rota <b>/developers/id </b>,informe o id na url no formato uuid.</p>
<pre><code>/developers/09bb0cfa-9cd5-4f4c-9b7d-92444cf9e63c</code></pre>
