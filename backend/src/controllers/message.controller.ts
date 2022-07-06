import { Request, Response } from "express";
import { HttpException } from "../exceptions";
import { Message } from "../models";

class MessageController {
  /**
   * @desc    Get all the messages
   * @route   GET /api/messages
   * @access  Admin
   */
  public async getMessages(req: Request, res: Response) {
    const messages = await Message.find({}).sort({ createdAt: "desc" });
    res.status(200).json(messages);
  }

  /**
   * @desc    Create new message
   * @route   POST /api/messages
   * @access  Admin
   */
  public async postMessage(req: Request, res: Response) {
    const { name, email, message } = req.body;
    const payload = await Message.create({ name, email, message });

    res.status(201).send(payload);
  }
}

export default MessageController;
