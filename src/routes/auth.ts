import { Router } from 'express';
import search from './search';
import chats from './chats';
import messages from './messages';
import upload from './upload';
import authToken from '../middlewares/authToken';

const router = Router();

router.use(authToken);

router.get('/', (_, res) => {
    res.send(res.locals.user);
});

router.use('/search', search);
router.use('/chats', chats);
router.use('/messages', messages);
router.use('/upload', upload);

export default router;