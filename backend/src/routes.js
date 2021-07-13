const express = require('express');
const routes = express.Router();
const DeveloperController = require('./controller/developerController');

routes.get('/',(req,res)=>{
    res.send('retorno')
});

routes.post('/developers',DeveloperController.post);
routes.put('/developers/:id',DeveloperController.put);
routes.get('/developers',DeveloperController.get);
routes.get('/developers/:id',DeveloperController.get);
routes.delete('/developers/:id',DeveloperController.delete);

module.exports = routes;