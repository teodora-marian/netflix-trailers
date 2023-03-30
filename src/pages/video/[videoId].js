import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import clsx from "classnames";
import { getYoutubeVideoById } from "../../../lib/videos";
import NavBar from "../../../components/nav/navbar";
import Like from "../../../components/icons/like-icon";
import Dislike from "../../../components/icons/dislike-icon";

Modal.setAppElement("#__next");

export async function getStaticProps(context) {
  const videoId = context.params.videoId;

  const videoArray = await getYoutubeVideoById(videoId);

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 1800, // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos = ["WsZfp2dDz0c", "Akrht_QNNKs", "WdZ-BWWQcWQ"];
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));
  return { paths, fallback: "blocking" };
}

const Video = ({ video }) => {
  const router = useRouter();
  console.log({ router });

  const videoId = router.query.videoId;

  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDislike] = useState(false);

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

  useEffect(() => {
    const fetchVideoStats = async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: "GET",
      });
      const videoStatsData = await response.json();
      console.log({ videoStatsData });

      if (videoStatsData.length > 0) {
        const likedStatus = videoStatsData[0].liked;
        if (likedStatus === 1) {
          setToggleLike(true);
        } else if (likedStatus === 0) {
          setToggleLike(null);
        }
      }
    };
    fetchVideoStats();
  }, [videoId]);

  const handleToggleLike = async () => {
    console.log("handleToggleLike");
    const likeValue = !toggleLike;
    setToggleLike(likeValue);
    setToggleDislike(toggleLike);

    const response = await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({ videoId, liked: likeValue ? 1 : 0 }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("like action", await response.json());
  };

  const handleToggleDislike = async () => {
    console.log("handleToggleDislike");
    const dislikeValue = !toggleDislike;
    setToggleDislike(dislikeValue);
    setToggleLike(toggleDislike);

    const response = await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({ videoId, liked: dislikeValue ? 0 : 1 }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("dislike action", await response.json());
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
        ></iframe>

        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={handleToggleLike}>
              <div className={styles.btnWrapper}>
                <Like selected={toggleLike} />
              </div>
            </button>
          </div>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              <Dislike selected={toggleDislike} />
            </div>
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>Published: {publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.extraInfoColor}>Channel: </span>
                <span className={styles.extraInfoText}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.extraInfoColor}>View Count: </span>
                <span className={styles.extraInfoText}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
