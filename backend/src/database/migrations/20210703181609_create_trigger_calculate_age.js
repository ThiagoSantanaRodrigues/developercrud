const triggerCalculateAge = `
CREATE TRIGGER trigger_calcular_idade BEFORE INSERT OR UPDATE ON desenvolvedores
    FOR EACH ROW EXECUTE PROCEDURE trigger_calcular_idade();`;

const DropTriggerCalculateAge = `
drop trigger trigger_calcular_idade on desenvolvedores;`;



exports.up = async knex => knex.raw(triggerCalculateAge);

exports.down = async knex => knex.raw(DropTriggerCalculateAge);