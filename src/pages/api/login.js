import { magicAdmin } from "../../../lib/magic";
import jwt from "jsonwebtoken";
import { isNewUser, createNewUser } from "../../../lib/usersDB/hasura";
import { setTokenCookie } from "../../../lib/cookies";

export default async function login(req, res) {
  if (req.method === "POST")
    try {
      const auth = req.headers.authorization;
      const token = auth ? auth.substr(7) : "";
      console.log({ token });

      //invoke magic
      const metadata = await magicAdmin.users.getMetadataByToken(token);
      console.log({ metadata });

      //create jwt
      const jwtToken = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-default-role": "user",
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-user-id": `${metadata.issuer}`,
          },
        },
        process.env.JWT_SECRET
      );
      console.log({ jwtToken });

      const isNewUserQuery = await isNewUser(token, metadata.issuer);
      isNewUserQuery && (await createNewUser(token, metadata));
      setTokenCookie(token, res);
      res.send({ done: true });
    } catch (error) {
      console.log("Something went wrong logging in", error);
      res.status(500).send({ done: false });
    }
  else {
    res.send({ done: false });
  }
}
