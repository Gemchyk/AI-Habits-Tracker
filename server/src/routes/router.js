import * as express from 'express';
import * as controller from '../controllers/controller.js'

const router = express.Router();


router.post('/messages', controller.addMessage);
router.get('/messages', controller.getHistory);


export default router;