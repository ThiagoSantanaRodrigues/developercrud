const dbConection = require('./../database');
module.exports = {
    async insert(parameters) {
        const result = await dbConection('desenvolvedores')
            .insert({
                nome: parameters.name.trim(),
                sexo: parameters.gender,
                hobby: parameters.hobby.trim(),
                datanascimento: parameters.birthDate
            });
        return result
    },

    async update(parameters) {
        const result = await dbConection('desenvolvedores')
            .update({ nome: parameters.name.trim(), sexo: parameters.gender, hobby: parameters.hobby.trim(), datanascimento: parameters.birthDate })
            .where({ id: parameters.id });
        return result;
    },

    async getById(id) {
        const result = await dbConection('desenvolvedores').orderBy('nome')
            .select('id', 'nome', 'sexo', 'idade', 'hobby')
            .select(dbConection.raw(`TO_CHAR(datanascimento, 'DD/MM/YYYY') as datanascimento`))
            .where({ id });

        return result;

    },

    async get(limit, page, parameters) {
        const result = {};
        const queryDevelopers = dbConection('desenvolvedores').orderBy('nome');
        const queryDevelopersCount = dbConection('desenvolvedores').count();
        queryDevelopers.select('id', 'nome', 'sexo', 'hobby', 'idade')
            .select(dbConection.raw(`TO_CHAR(datanascimento, 'DD/MM/YYYY') as datanascimento`));

        if (Object.keys(parameters).length > 0) {
            parameters.name && queryDevelopers.whereRaw('LOWER(nome) LIKE ?', `%${parameters.name.toLowerCase()}%`);
            parameters.name && queryDevelopersCount.whereRaw('LOWER(nome) LIKE ?', `%${parameters.name.toLowerCase()}%`);
            parameters.gender && queryDevelopers.where('sexo', parameters.gender);
            parameters.gender && queryDevelopersCount.where('sexo', parameters.gender);
            parameters.age && queryDevelopers.where('idade', parameters.age);
            parameters.age && queryDevelopersCount.where('idade', parameters.age);
            parameters.hobby && queryDevelopers.whereRaw('LOWER(hobby) LIKE ?', `%${parameters.hobby.toLowerCase()}%`);
            parameters.hobby && queryDevelopersCount.whereRaw('LOWER(hobby) LIKE ?', `%${parameters.hobby.toLowerCase()}%`);
            parameters.birthDate && queryDevelopers.where('datanascimento', parameters.birthDate);
            parameters.birthDate && queryDevelopersCount.where('datanascimento', parameters.birthDate);
        }

        result.developers = await queryDevelopers.limit(limit)
            .offset((page - 1) * limit);
        const resultCount = await queryDevelopersCount;
        result.xTotalCount = resultCount[0].count
        return result;
    },

    async delete(id){
        const resultDeleteDeveloper = await dbConection('desenvolvedores').where({id}).del();
        return resultDeleteDeveloper;
    }
}