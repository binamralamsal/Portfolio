import { Request, Response } from "express";
import { HttpException } from "../exceptions";
import { User } from "../models";

class AuthController {
  /**
   * @desc    Login the user
   * @route   POST /api/auth/login
   * @access  Public
   */
  public async postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      throw new HttpException(401, "Invalid email or password");

    res
      .status(200)
      .json({ token: user.generateToken(), userId: user._id.toString() });
  }
}

export default AuthController;
