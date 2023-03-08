import Image from 'next/image';
import styles from './banner.module.css'

const Banner = (props) => {
    const {title, subTitle, imgUrl} = props;

    const handleOnPlay = () => {
        console.log("handle onPlay")
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftWrapper}>
                <div className={styles.left}>
                    <h2 className={styles.title}>{title}</h2>
                    <h3 className={styles.subTitle}>{subTitle}</h3>
                    <div className={styles.playButtonWrapper}>
                        <button className={styles.playButtonWithIcon} onClick={handleOnPlay}>
                            <Image src="/static/play_arrow.svg" alt="play icon" width="32" height="32"/>
                            <span className={styles.playText}>Play</span>
                        </button>
                    </div>{/*styles.playButtonWrapper*/}
                </div>{/*styles.left*/}
            </div> {/*styles.leftWrapper*/}
            <div 
                className={styles.bannerImg}
                style={{ backgroundImage: `url(${imgUrl})` }}>
            </div>  {/*poster*/}
        </div> //container
    );
        
};

export default Banner;