import Head from "next/head";
import Banner from "../../components/banner/banner";
import NavBar from "../../components/nav/navbar";
import SectionCards from "../../components/card/section-cards";
import styles from "/src/styles/Home.module.css";
import {
  getActionVideos,
  getComedyVideos,
  getHorrorVideos,
  getSfVideos,
} from "../../lib/videos";

export async function getServerSideProps(context) {
  const actionVideos = getActionVideos();
  const horrorVideos = getHorrorVideos();
  const comedyVideos = getComedyVideos();
  const sfVideos = getSfVideos();
  return {
    props: {
      actionVideos,
      horrorVideos,
      comedyVideos,
      sfVideos,
    },
  };
}

export default function Home({
  actionVideos,
  horrorVideos,
  comedyVideos,
  sfVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix trailers</title>
        <meta name="description" content="Generated by movie lovers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Banner
        videoId="tGpTpVyI_OQ"
        title="Pulp Fiction"
        subTitle="A series of incidents intertwine the lives of two LA mobsters, a gangster's wife, a boxer and two small-time criminals."
        imgUrl="/static/pulp_fiction.webp"
      />
      <div className={styles.sectionWrapper}>
        <SectionCards title="Action" videos={actionVideos} size="large" />
        <SectionCards title="Horror" videos={horrorVideos} size="small" />
        <SectionCards title="Comedy" videos={comedyVideos} size="medium" />
        <SectionCards title="Science Fiction" videos={sfVideos} size="small" />
      </div>
    </div> //styles.container
  );
}
