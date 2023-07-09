import UserService from "../UserService.js";
import CollectionService from "../../collection/CollectionService.js";

class UserController {
  async getUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      if (!users) {
        return res.status(404).json({ message: "DB is empty" });
      }
      return res.status(200).json(users);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async createUser(req, res) {
    try {
      await UserService.createUser(req.body);
      return res.status(200).json({ message: "User was created" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async getUser(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User doesn't exist" });
      }
      return res.status(200).json(user);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async updateUser(req, res) {
    try {
      await UserService.updateUser(req);
      return res.status(200).json({ message: "User has been updated" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async removeUser(req, res) {
    try {
      const user = await UserService.removeUser(req.params.id);
      if (user.collections.length) {
        await Promise.all(
          user.collections.map(async (id) => {
            await CollectionService.removeCollection(id);
          })
        );
      }
      return res.status(200).json(user);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async blockUser(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      user.blocked = true;
      user.save();
      return res.status(200).json({ message: "User has been blocked" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async unblockUser(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      user.blocked = false;
      user.save();
      return res.status(200).json({ message: "User has been unblocked" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

export default new UserController();
