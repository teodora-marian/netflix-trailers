import styles from './navbar.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';


const NavBar = (props) => {
    const {username} = props;

    const [showDropdown, setShowDropdown] = useState();

    const router = useRouter();

    const handleOnClickHome = (e) => {
        e.preventDefault();
        router.push("/");
    };

    const handleOnClickMyLikes = (e) => {
        e.preventDefault();
        router.push("/browse/my-likes");
    };

    const handleShowDropdown = (e) => {
        e.preventDefault();
        setShowDropdown(!showDropdown);
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <a className={styles.logoLink} href="/">
                    <div className={styles.logoWrapper}><Image src={'/static/netflix.svg'} alt="netflix logo" width="128" height="34"/></div>
                </a>
                <ul className={styles.navItems}>
                    <li className={styles.navItem1} onClick={handleOnClickHome}>Home</li>
                    <li className={styles.navItem2} onClick={handleOnClickMyLikes}>My Likes</li>
                </ul> {/*styles.navItems*/}
                <nav className={styles.navContainer}>
                    <div>
                        <button className={styles.usernameButton} onClick={handleShowDropdown}>
                            <p className={styles.username}>{username}</p>
                            <Image src={'/static/expand_more.svg'} alt="expand more" width="24" height="24"/>
                        </button>
                        {showDropdown && (<div className={styles.navDropdown}>
                            <div>
                                <Link href="/login" className={styles.linkText}>Sign Out</Link>
                                <div className={styles.lineWrapper}></div> {/*just for spacing purposes*/}
                            </div>
                        </div>)} {/*styles.navDropdown*/}
                    </div>
                </nav> {/*styles.navContainer*/}
            </div> {/*styles.wrapper*/}
        </div> //*styles.container*/}  
    )
};

export default NavBar;