const { query } = require('express');
const developerModel = require('./../model/developerModel');
const { validDate } = require('./../tools/validDate');
const { isUuid } = require('uuidv4');

function validateParameters(filds, res) {
    const invalidParameters = [];

    if (!filds.name || filds.name == '') {
        invalidParameters.push('name');
    }

    if (!filds.gender || (filds.gender != 'M' && filds.gender != 'F')) {
        invalidParameters.push('gender');
    }

    if (!filds.hobby || filds.hobby == '') {
        invalidParameters.push('hobby');
    }

    if (!filds.birthDate || filds.birthDate == '') {
        invalidParameters.push('birthDate');
    } else if (!validDate(filds.birthDate)) {
        invalidParameters.push('birthDate');
    }

    return invalidParameters
}

module.exports = {
    async post(req, res, next) {
        try {
            const { name, gender, hobby, birthDate } = req.body;

            const returnValidParameters = validateParameters({ name, gender, hobby, birthDate }, res);

            if (returnValidParameters.length > 0) {
                return next({ status: 400, message: 'parametros invalidos: ' + returnValidParameters.join(', ') })
            }

            const result = await developerModel
                .insert({
                    name,
                    gender,
                    hobby,
                    birthDate
                });

            if (result.rowCount > 0) {
                return res.status(201).json({ message: 'Desenvolvedor inserido com sucesso' });
            } else {
                next()
            }

        } catch (error) {
            next(error);
        }

    },

    async put(req, res, next) {
        try {

            if (!isUuid(req.params.id)) {
                return next({ status: 400, message: 'ID invalido.' })
            }

            const { name, gender, hobby, birthDate } = req.body;

            const returnValidParameters = validateParameters({ name, gender, hobby, birthDate }, res);

            if (returnValidParameters.length > 0) {
                return next({ status: 400, message: 'parametros invalidos: ' + returnValidParameters.join(', ') })
            }

            const result = await developerModel.update({ name,  gender, hobby, birthDate, id: req.params.id });

            if (result > 0) {
                return res.json({ message: 'Registro alterado' });
            } else {
                return res.status(404).json({ message: 'registro não encontrado.' });
            }

            return res.json({ retorno: result });
        } catch (error) {
            next(error);
        }

    },

    async get(req, res, next) {
        try {
            const { page = 1, limit = 12 } = req.query;

            if (req.params.id) {

                if (!isUuid(req.params.id)) {
                    return next({ status: 400, message: 'ID invalido.' })
                }

                result = await developerModel.getById(req.params.id);

                if (result.length == 0) {
                    return res.status(404).json({ message: `registro com código não encontrado` });
                }
                return res.json({ developer: result });
            } else {
                const result = await developerModel.get(limit, page, req.query);

                if (result.developers.length == 0) {
                    return res.status(404).json({ message: `Nenhum registro encontrado` });
                }
                res.header('X-Total-Count', result.xTotalCount);
                return res.json({ listDevelopers: result.developers });
            }

        } catch (error) {
            next(error);
        }

    },

    async delete(req, res, next) {
        try {
            if (!isUuid(req.params.id)) {
                return next({ status: 400, message: 'ID invalido.' })
            }
            // const resultDeleteDeveloper = await knex('desenvolvedores').where({ id: req.params.id }).del();
            const resultDeleteDeveloper = await developerModel.delete(req.params.id);
            if (resultDeleteDeveloper == 0) {
                return res.status(404).json({ message: `registro com código ${req.params.id} não encontrado` })
            } else {
                return res.status(204).json({ message: `Deletado com sucesso.` })
            }
        } catch (error) {
            next(error);
        }

    },
}