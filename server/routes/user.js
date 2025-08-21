import express from "express";
import { signin, signup, reset } from "../controllers/user.js";

const router = express.Router();

// sign up routes
router.post("/signin", signin);

router.post("/signup", signup);

router.patch("/reset/:code", reset);

export default router;

// import java.util.*;
// class demo7 {
//     public static void main(String[] args)
//     {
//         Vector v = new Vector(30);
//         v.addElement("Geeksforgeeks");
//         v.addElement("Java");
//         v.addElement("C++");
//         v.addElement("C");
//         v.addElement("Geeksforgeeks");
//         System.out.println(v.indexOf("Geeksforgeeks", 2));
//     }
// }
