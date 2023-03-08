import Image from "next/image";
import styles from "./card.module.css";
import { useState } from "react";

const Card = (props) => {
  const {
    imgUrl = "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0",
    size = "medium",
  } = props;

  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.largeItem,
    medium: styles.mediumItem,
    small: styles.smallItem,
  };

  const handleOnError = () => {
    console.log("poster error");
    setImgSrc("https://images.unsplash.com/photo-1598899134739-24c46f58b8c0");
  };

  return (
    <div className={styles.container}>
      <div className={classMap[size]}>
        <Image
          src={imgSrc}
          alt="poster"
          fill="true"
          onError={handleOnError}
          className={styles.cardImg}
        />
      </div>
    </div> //styles.container
  );
};

export default Card;
