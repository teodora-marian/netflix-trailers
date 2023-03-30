import Head from "next/head";
import Banner from "../../components/banner/banner";
import NavBar from "../../components/nav/navbar";
import SectionCards from "../../components/card/section-cards";

import styles from "/src/styles/Home.module.css";
import { getGenreVideos, getWatchItAgainVideos } from "../../lib/videos";
import useRedirectUser from "../../utils/redirect-user";

export async function getServerSideProps(context) {
  const { userId, jwtToken } = await useRedirectUser(context);

  const watchedVideos = await getWatchItAgainVideos(userId, jwtToken);
  const actionVideos = await getGenreVideos("action movie trailer");
  const horrorVideos = await getGenreVideos("horror movie trailer");
  const comedyVideos = await getGenreVideos("comedy movie trailer");
  const sfVideos = await getGenreVideos("science fiction movie trailer");

  return {
    props: {
      actionVideos,
      horrorVideos,
      comedyVideos,
      sfVideos,
      watchedVideos,
    },
  };
}

export default function Home({
  actionVideos,
  horrorVideos,
  comedyVideos,
  sfVideos,
  watchedVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix trailers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar />
        <Banner
          videoId="tGpTpVyI_OQ"
          title="Pulp Fiction"
          subTitle="A series of incidents intertwine the lives of two LA mobsters, a gangster's wife, a boxer and two small-time criminals."
          imgUrl="/static/pulp_fiction.webp"
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title="Action" videos={actionVideos} size="large" />
          <SectionCards
            title="Watch It Again"
            videos={watchedVideos}
            size="small"
          />
          <SectionCards title="Horror" videos={horrorVideos} size="medium" />
          <SectionCards title="SF" videos={sfVideos} size="large" />
          <SectionCards title="Comedy" videos={comedyVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
