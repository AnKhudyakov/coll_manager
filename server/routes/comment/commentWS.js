import Comment from "../../models/Comment.js";
import { aWss } from "../../index.js";
import UserService from "../user/UserService.js";
import ItemService from "../item/ItemService.js";

const commentWS = async (ws, req) => {
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.event) {
      case "message":
        broadcastMessage(ws, msg);
        break;
      case "connection":
        broadcastConnection(ws, msg);
        break;
    }
  });
};

const broadcastMessage = async (ws, msg) => {
  const comment = await createNewComment(msg.comment);
  const user = await UserService.getUserById(comment.author);
  const resultComment = {
    ...comment._doc,
    author: user,
  };
  aWss.clients.forEach((client) => {
    client.send(JSON.stringify({ event: "comment", comment: resultComment }));
  });
};
const createNewComment = async (comment) => {
  const newComment = new Comment(comment);
  await ItemService.addCommentInItem(comment, newComment);
  return await newComment.save();
};

const broadcastConnection = (ws, msg) => {
  ws.id = msg.id;
  aWss.clients.forEach(async (client) => {
    const comments = await Comment.find({ itemId: msg.itemId }).populate(
      "author"
    );
    if (client.id === msg.id) {
      client.send(JSON.stringify({ event: "comments", comments }));
    }
  });
};

export default commentWS;
