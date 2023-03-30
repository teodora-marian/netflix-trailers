import { verifyToken } from "../lib/verify-token";

const useRedirectUser = async (context) => {
  const jwtToken = context.req ? context.req?.cookies.token : null;
  console.log({ jwtToken });
  const userId = await verifyToken(jwtToken);
  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    userId,
    jwtToken,
  };
};

export default useRedirectUser;
