import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import clsx from "classnames";

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();
  console.log({ router });

  const trailer = {
    title: "Pulp Fiction",
    publishTime: "2015",
    description:
      "A series of incidents intertwine the lives of two LA mobsters, a gangster's wife, a boxer and two small-time criminals.",
    channelName: "Miramax",
    viewCount: "2M",
  };

  const { title, publishTime, description, channelName, viewCount } = trailer;

  return (
    <div className={styles.container}>
      video page {router.query.videoId}
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="ytplayer"
          type="text/html"
          className={styles.videoPlayer}
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&controls=0&rel=0`}
          frameborder="0"
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>Published: {publishTime}</p>
              <p className={styles.description}>Plot: {description}</p>
            </div>{" "}
            {/*styles.col1 */}
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.extraInfoColor}>Channel: </span>
                <span className={styles.extraInfoText}>{channelName}</span>
              </p>{" "}
              {/*styles.subText */}
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.extraInfoColor}>Views: </span>
                <span className={styles.extraInfoText}>{viewCount}</span>
              </p>
            </div>{" "}
            {/*styles.col2 */}
          </div>{" "}
          {/*styles.modalBodyContent */}
        </div>{" "}
        {/*styles.modalBody */}
      </Modal>
    </div> //container
  );
};

export default Video;
