import express from "express";
import UserService from "../Service/UserService";
import UserController from "../Controller/UserController";
const router = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get("/", () => {
  console.log("Rota home");
});
router.post("/create/user", userController.createUser);

export default router;
