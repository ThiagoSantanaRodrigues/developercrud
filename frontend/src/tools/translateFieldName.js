module.exports = {
   
    translateFieldName(fild) {
        let listOfFilds = {
            name :  'nome',
            age : 'idade',
            gender : "sexo",
            hobby : 'hobby',
            birthDate : 'data nascimento'
        }    
        return listOfFilds[fild];
    }
} 