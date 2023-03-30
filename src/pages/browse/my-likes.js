import Head from "next/head";
import NavBar from "../../../components/nav/navbar";
import SectionCards from "../../../components/card/section-cards";
import styles from "../../styles/MyLikes.module.css";
import { myLikedVideos } from "../../../lib/videos";
import useRedirectUser from "../../../utils/redirect-user";

export async function getServerSideProps(context) {
  const { userId, jwtToken } = await useRedirectUser(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const myVideos = await myLikedVideos(userId, jwtToken);
  return {
    props: {
      likedVideos: myVideos,
    },
  };
}

const MyLikes = ({ likedVideos }) => {
  return (
    <div>
      <Head>
        <title>Liked Videos</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="My Liked Videos"
            videos={likedVideos}
            size="small"
            shouldWrap
          />
        </div>
      </main>
    </div>
  );
};

export default MyLikes;
