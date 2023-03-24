import jwt from "jsonwebtoken";
import {
  findVideoIdByUser,
  updateStats,
  insertStats,
} from "../../../lib/usersDB/hasura";

export default async function stats(req, resp) {
  if (req.method === "POST") {
    console.log({ cookies: req.cookies });
    try {
      const jwtToken = req.cookies.token;
      if (!jwtToken) {
        resp.status(403).send({});
      } else {
        const { videoId, liked, watched = true } = req.body;
        if (videoId) {
          const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
          console.log({ decodedToken });
          const userId = decodedToken.issuer;
          const doesStatExist = await findVideoIdByUser(
            jwtToken,
            userId,
            videoId
          );
          if (doesStatExist) {
            const updateResponse = await updateStats(jwtToken, {
              userId,
              videoId,
              liked,
              watched,
            });
            console.log("updateStats (f) response", updateResponse);
            resp.send({ msg: "?stats have been updated?", updateResponse });
          } else {
            const insertResponse = await insertStats(jwtToken, {
              userId,
              videoId,
              liked: 1,
              watched: true,
            });
            console.log("insertResponse (f) response", insertResponse);
            resp.send({ msg: "?new entry added?", insertResponse });
          }
        }
      }
    } catch (err) {
      console.error("Stats error occured", err);
      resp.status(500).send({ done: false, error: err?.message });
    }
  }
}
