import Card from "./card";
import styles from "./section-cards.module.css";
import clsx from "classnames";
import Link from "next/link";

const SectionCards = (props) => {
  const { title, videos, size, shouldWrap = false } = props;
  console.log({ videos });

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video, idx) => (
          <Link key={idx} href={`/video/${video.id}`}>
            <Card key={idx} imgUrl={video.imgUrl} size={size} />
          </Link>
        ))}
      </div>
    </section> //styles.container
  );
};

export default SectionCards;
