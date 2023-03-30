import { verifyToken } from "../../../lib/verify-token";
import {
  findVideoIdByUser,
  updateStats,
  insertStats,
} from "../../../lib/db/hasura";

export default async function stats(req, resp) {
  try {
    const jwtToken = req.cookies.token;
    if (!jwtToken) {
      resp.status(403).send({});
    } else {
      const inputParams = req.method === "POST" ? req.body : req.query;
      const { videoId } = inputParams;
      if (videoId) {
        const userId = await verifyToken(jwtToken);
        const foundVideo = await findVideoIdByUser(jwtToken, userId, videoId);
        const doesStatExist = foundVideo.length > 0;

        if (req.method === "POST") {
          const { liked, watched = true } = req.body;
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
            console.log({ msg: "insertResponse (f) response", insertResponse });
            resp.send({ msg: "?new entry added?", insertResponse });
          }
        } else {
          if (doesStatExist) {
            const foundVideo = await findVideoIdByUser(
              jwtToken,
              userId,
              videoId
            );
            console.log("what i found", foundVideo);
            return resp.send(foundVideo);
          } else {
            resp.status(404);
            resp.send({ user: null, msg: "Video not found" });
          }
        }
      }
    }
  } catch (error) {
    console.error("Error occurred /stats", error);
    resp.status(500).send({ done: false, error: error?.message });
  }
}
