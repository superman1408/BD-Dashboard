import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import AuthenticateUser from "../model/authDetails.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await AuthenticateUser.findOne({ email: email });

    if (!existingUser)
      return res.status(404).json({ message: "uesr does not exist" });

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatch)
      return res.status(400).json({ message: "Password does not match" });

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      "test",
      { expiresIn: "28d" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, role, firstName, lastName } =
    req.body;

  // Checking for empty fields
  // const admin_code = req.params;
  // const secretCode = process.env.ADMIN_SECRET_CODE;

  try {
    const existingUser = await AuthenticateUser.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exist bro" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    if (role === "admin") {
      if (admin_code.code !== secretCode)
        return res.status(400).json({ message: "Secret Code do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await AuthenticateUser.create({
      email,
      password: hashedPassword,
      role,
      firstName,
      lastName,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    // console.log(error);
  }
};
