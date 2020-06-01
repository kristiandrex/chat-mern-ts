import { Router } from 'express';
import User from '../models/user';
import authToken from '../middlewares/authToken';
const router = Router();

router.post('/', authToken, async (req, res) => {
  try {
    const value = req.body.value;
    const notInclude = req.body.notInclude;

    const users = await User
      .find({ username: { $regex: value, $nin: notInclude } }, 'avatar username')
      .limit(5);

    res.send(users);
  }

  catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

export default router;