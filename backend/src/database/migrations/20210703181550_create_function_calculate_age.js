const functionCalculateAge = `
CREATE FUNCTION trigger_calcular_idade() RETURNS trigger AS $trigger_calcular_idade$
    BEGIN
        NEW.idade := trunc((CURRENT_DATE - NEW.datanascimento)/365);
        RETURN NEW;
    END;
$trigger_calcular_idade$ LANGUAGE plpgsql;`;

const DropFunctionCalculateAge = `
drop function trigger_calcular_idade;`;



exports.up = async knex => knex.raw(functionCalculateAge);

exports.down = async knex => knex.raw(DropFunctionCalculateAge);