export async function updateStats(
  jwtToken,
  { userId, videoId, liked, watched }
) {
  const operationsDocUpdate = `
  mutation updateStats($userId: String!, $videoId: String!, $liked: Int!,  $watched: Boolean!) {
    update_netflixTrailers_stats( _set: {liked: $liked, watched: $watched}, where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
    returning {
        userId
        videoId
        liked
        watched
      }
    }
  }
  `;
  return await queryHasuraGQL(
    operationsDocUpdate,
    "updateStats",
    { userId, videoId, liked, watched },
    jwtToken
  );
}

export async function insertStats(
  jwtToken,
  { userId, videoId, liked, watched }
) {
  const operationsDocInsert = `
  mutation insertStats($userId: String!, $videoId: String!, $liked: Int!, $watched: Boolean!) {
    insert_netflixTrailers_stats_one(object: {userId: $userId, videoId: $videoId, liked: $liked, watched: $watched}) {
      userId
      liked
      watched
    }
  }
  `;
  return await queryHasuraGQL(
    operationsDocInsert,
    "insertStats",
    { userId, videoId, liked, watched },
    jwtToken
  );
}

export async function findVideoIdByUser(jwtToken, userId, videoId) {
  const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    netflixTrailers_stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      userId
      videoId
      watched
      liked
      eventId
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "findVideoIdByUserId",
    { userId, videoId },
    jwtToken
  );

  console.log("findVideoIdByUserId hasura (f) response", response);
  return response?.data?.netflixTrailers_stats?.length > 0;
}

export async function createNewUser(jwtToken, metadata) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_netflixTrailers_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
        publicAddress
      }
    }
  }
`;
  const { email, issuer, publicAddress } = metadata;
  const response = await queryHasuraGQL(
    operationsDoc,
    "createNewUser",
    { issuer, email, publicAddress },
    jwtToken
  );
  console.log("createNewUser (f) response", response, issuer);
  return response;
}

export async function isExistingUser(jwtToken, issuer) {
  const operationsDoc = ` 
  query isExistingUser($issuer: String!) {
    netflixTrailers_users(where: {issuer: {_eq: $issuer}}) {
      email
      id
      issuer
      publicAddress
    }
  }
  `;
  console.log("[isExistingUser jwt token=>]:", jwtToken);
  const response = await queryHasuraGQL(
    operationsDoc,
    "isExistingUser",
    { issuer },
    jwtToken
  );
  console.log("isExistingUser (f) response", response);

  return response?.data?.netflixTrailers_users?.length === 0;
}

export async function queryHasuraGQL(
  operationsDoc,
  operationName,
  variables,
  jwtToken
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}
