import Head from "next/head";
import Banner from "../../components/banner/banner";
import NavBar from "../../components/nav/navbar";
import Card from "../../components/card/card";

export default function Home() {
  return (
    <>
      <Head>
        <title>Netflix trailers</title>
        <meta name="description" content="Generated by movie lovers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar username="you@email.com" />
      <Banner
        title="Pulp Fiction"
        subTitle="A series of incidents intertwine the lives of two LA mobsters, a gangster's wife, a boxer and two small-time criminals."
        imgUrl="/static/pulp_fiction.webp"
      />
      <Card imgUrl="/static/pulp_fiction.webp" size="large" />
      <Card size="medium" />
      <Card imgUrl="/static/pulp_fiction.webp" size="small" />
    </>
  );
}
