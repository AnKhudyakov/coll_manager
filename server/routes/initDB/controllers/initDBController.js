import CollectionService from "../../collection/CollectionService.js";
import UserService from "../../user/UserService.js";
import ItemService from "../../item/ItemService.js";
import AuthService from "../../auth/AuthService.js";

import { users, collections, itemsFirst, itemsSecond } from "../initData.js";

class initDBController {
  async createInitDB(req, res) {
    try {
      const newUsers = await Promise.all(
        users.map(async (user) => {
          const hashPassword = AuthService.hashPassword(user.password);
          return await UserService.createUser(user, hashPassword);
        })
      );
      const usersWithoutAdmin = newUsers.filter((user) => !user.admin);
      const newCollection = await Promise.all(
        collections.map(async (collection, index) => {
          collection.author = usersWithoutAdmin[index]._id;
          return await CollectionService.createCollection(collection);
        })
      );
      await Promise.all(
        itemsFirst.map(async (itemFirst, index) => {
          itemFirst.author = newCollection[index].author;
          itemFirst.collectionId = newCollection[index]._id;

          return await ItemService.createItem(itemFirst);
        })
      );
      await Promise.all(
        itemsSecond.map(async (item, index) => {
          item.author = newCollection[index].author;
          item.collectionId = newCollection[index]._id;
          return await ItemService.createItem(item);
        })
      );
      return res.status(200).json({ message: "Initial DB created" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

export default new initDBController();
