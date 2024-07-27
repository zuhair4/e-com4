import { Request, Response } from 'express';
import User from '../models/User';

const handleError = (err: unknown) => {
  if (err instanceof Error) {
    return err.message;
  }
  return 'An unknown error occurred';
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const {userName, password} = req.body;
    const user = await User.findOne({ userName }).exec();
    if (user) {
      if (user.password === password) {
        res.json(200);
      } else {
        res.status(400).json({ message: 'Incorrect password' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: handleError(err) });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  try {
    const newUser = new User({ userName, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: handleError(err) });
  }
};

