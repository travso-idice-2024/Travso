const pool = require("../utils/db");


async function getHashtags1(req , res){
    try {
      const [hashtag]  = await pool.execute(
      `SELECT * FROM tags`, 
      );

      return res.status(200).json({
        message: "Data of All HashTags.",
        data: hashtag,
      });
    } catch (error) {
        console.log("==erro fetch data===>",error);
      return res.status(500).json({
        error: "Internal Server Error"
      })
    }
  }

  async function getHashtags(req , res){
    try {
      // const [hashtag]  = await pool.execute(
      // `SELECT * FROM tags`, 
      // );
      const [hashtag] = await pool.execute(
        `SELECT id, post_id, name FROM tags GROUP BY name`
      );

      return res.status(200).json({
        message: "Data of All HashTags.",
        data: hashtag,
      });
    } catch (error) {
        console.log("==erro fetch data===>",error);
      return res.status(500).json({
        error: "Internal Server Error"
      })
    }
}



module.exports = {
    getHashtags
}