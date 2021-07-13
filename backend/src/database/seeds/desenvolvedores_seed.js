
exports.seed = function (knex) {
  return knex('desenvolvedores').del().then(function () {
    return knex('desenvolvedores').insert([
      {  nome: 'Alexandre Pereira', sexo : 'M',  hobby : 'assistir filme', datanascimento : '01/06/2006'},
      {  nome: 'Enrico de Almeida', sexo : 'M',  hobby : 'fazer academia',datanascimento : '01/06/2006'},
      {  nome: 'Henry Pizzol', sexo : 'M',  hobby : 'fazer academia',datanascimento : '30/01/2000'},
      {  nome: 'Enzo Moreira', sexo : 'M',  hobby : 'assistir filme',datanascimento : '01/09/1975'},
      {  nome: 'Ian da Silva', sexo : 'M' ,  hobby : 'fazer academia',datanascimento : '02/07/1997'},
      {  nome: 'Isaac Fernandes', sexo : 'M',  hobby : 'assistir series',datanascimento : '01/12/1996'},
      {  nome: 'João de Oliveira', sexo : 'M',  hobby : 'assistir animes',datanascimento : '12/01/1997'},
      {  nome: 'Breno Pereira', sexo : 'M' ,  hobby : 'viajar',datanascimento : '27/09/1992'},
      {  nome: 'Felipe Pesca', sexo : 'M',  hobby : 'assistir series',datanascimento : '15/09/1985'},
      {  nome: 'André Scaramussa', sexo : 'M',  hobby : 'assistir filme',datanascimento : '25/01/1990'},
      {  nome: 'Enrico Salvador', sexo : 'M',  hobby : 'assistir animes',datanascimento : '01/01/1973'},
      {  nome: 'Erick Zampirolli', sexo : 'M',  hobby : 'assistir series',datanascimento : '07/02/1989'},
      {  nome: 'Erick Ferreira', sexo : 'M' ,  hobby : 'assistir series',datanascimento : '12/12/1999'},
      {  nome: 'João Filete', sexo : 'M',  hobby : 'assistir filme',datanascimento : '25/12/1998'},
      {  nome: 'Luiz Venturim', sexo : 'M',  hobby : 'assistir animes',datanascimento : '05/07/1985'},
      {  nome: 'Gustavo da Silva', sexo : 'M' ,  hobby : 'assistir series',datanascimento : '03/03/2001'},
      {  nome: 'Otávio Filete', sexo : 'M',  hobby : 'assistir animes',datanascimento : '15/02/2005'},
      {  nome: 'Lucas Martins', sexo : 'M',  hobby : 'viajar',datanascimento : '12/01/1997'},
      {  nome: 'Pedro Lucas', sexo : 'M' ,  hobby : 'assistir filme',datanascimento : '01/01/2000'},
      {  nome: 'João Costalonga ', sexo : 'M' ,  hobby : 'viajar',datanascimento : '01/02/1996'},
      {  nome: 'Daniel de Almeida', sexo : 'M',  hobby : 'fazer academia',datanascimento : '01/03/1997'},
      {  nome: 'Thiago Rodrigues', sexo : 'M' ,  hobby : 'assistir animes',datanascimento : '01/04/1998'},
      {  nome: 'Guilherme Sapia' , sexo : 'M',  hobby : 'viajar',datanascimento : '01/05/1999'},
      {  nome: 'Mathias da Silva', sexo : 'M',  hobby : 'assistir filme',datanascimento : '01/06/2000'},
      {  nome: 'Rian Favaro' , sexo : 'M',  hobby : 'assistir animes',datanascimento : '01/07/1980'},
      {  nome: 'Vitor Fernandes ', sexo : 'M',  hobby : 'fazer academia',datanascimento : '01/08/1998'},
      {  nome: 'Nathan Almeida', sexo : 'M',  hobby : 'viajar',datanascimento : '01/09/2000'},
      {  nome: 'João Lopes', sexo : 'M',  hobby : 'viajar',datanascimento : '27/07/1996'},
      {  nome: 'Camila de Oliveira', sexo : 'F' ,  hobby : 'assistir series',datanascimento : '25/02/1999'},
      {  nome: 'Caroline Santana', sexo : 'F' ,  hobby : 'assistir filme',datanascimento : '12/01/1992'},
      {  nome: 'Isabelly Zanfrilli', sexo : 'F',  hobby : 'viajar',datanascimento : '13/12/2000'},
      {  nome: 'Amanda de Melo', sexo : 'F',  hobby : 'assistir series',datanascimento : '07/01/1987'},
      {  nome: 'Raiana da Silva', sexo : 'F',  hobby : 'assistir animes',datanascimento : '12/03/1988'},
      {  nome: 'Gabrila Oliviera', sexo : 'F',  hobby : 'fazer academia',datanascimento : '25/01/1999'},
      {  nome: 'Amanda Faria', sexo : 'F',  hobby : 'assistir filme',datanascimento : '27/09/1996'},
      {  nome: 'Graziele Massafera', sexo : 'F', hobby : 'assistir animes',datanascimento : '27/05/1985'},
      {  nome: 'Roberta Faria' , sexo : 'F',  hobby : 'viajar',datanascimento : '27/08/1993'},
      {  nome: 'Jessica Pereira', sexo : 'F',  hobby : 'fazer academia',datanascimento : '22/04/2000'},
      {  nome: 'Gabriela Pesca', sexo : 'F' ,  hobby : 'assistir filme',datanascimento : '01/09/2007'},
      {  nome: 'Amanda Favaro' , sexo : 'F',  hobby : 'assistir series',datanascimento : '12/07/1996'},
      {  nome: 'Roberta Espanhola', sexo : 'F',  hobby : 'assistir animes',datanascimento : '25/04/1999'},
      {  nome: 'Tatiane Rogoni', sexo : 'F' ,  hobby : 'assistir animes',datanascimento : '12/12/1982'},
      {  nome: 'Hebe Camargo' , sexo : 'F',  hobby : 'viajar',datanascimento : '25/08/1989'},
      {  nome: 'Luana Oliveira', sexo : 'F' ,  hobby : 'fazer academia',datanascimento : '12/01/2000'},
    ]);
  })
};
