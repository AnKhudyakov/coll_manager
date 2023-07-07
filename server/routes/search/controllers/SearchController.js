import SearchService from "../SearchService.js";

class SearchController {
  async getResult(req, res) {
    try {
      if (!req.query.text) {
        return res.status(200).json([])
      }
      const result = await SearchService.getItems(req.query.text);
      if (!result) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.status(200).json(result);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

export default new SearchController();
