import * as service from '../services/service.js';

export async function addMessage(req, res){
    const result = await service.testAddMessage(req.body);
    res.json(result);
}

export async function getHistory(req, res){
    const result = await service.testGetHistory(req.body);
    res.json(result);
}