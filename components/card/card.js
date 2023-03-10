import Image from "next/image";
import styles from "./card.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

const Card = (props) => {
  const {
    imgUrl = "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0",
    size = "medium",
    id,
  } = props;

  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.largeItem,
    medium: styles.mediumItem,
    small: styles.smallItem,
  };

  const handleOnError = () => {
    console.log("thumbnail error");
    setImgSrc("https://images.unsplash.com/photo-1598899134739-24c46f58b8c0");
  };

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  return (
    <div className={styles.container}>
      <motion.div
        className={classNames(styles.imgMotionWrapper, classMap[size])}
        whileHover={{ ...scale }}
      >
        <Image
          src={imgSrc}
          alt="thumbnail"
          fill="true"
          onError={handleOnError}
          className={styles.cardImg}
        />
      </motion.div>
    </div> //styles.container
  );
};

export default Card;
