import styles from './navbar.module.css'

const NavBar = (props) => {
    const {username} = props;

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <a className={styles.logoLink} href="/">
                    <div className={styles.logoWrapper}>Netflix</div>
                </a>
                <ul className={styles.navItems}>
                    <li className={styles.navItem1}>Home</li>
                    <li className={styles.navItem2}>My Likes</li>
                </ul> {/*styles.navItems*/}
                <nav className={styles.navContainer}>
                    <div>
                        <button className={styles.usernameButton}>
                            <p className={styles.username}>{username}</p>
                            {/*expand icon*/}
                        </button>
                        <div className={styles.navDropdown}>
                            <div>
                                <a className={styles.linkText}>Sign Out</a>
                                <div className={styles.lineWrapper}></div>
                            </div>
                        </div> {/*styles.navDropdown*/}
                    </div>
                </nav> {/*styles.navContainer*/}
            </div> {/*styles.wrapper*/}
        </div> //*styles.container*/}  
    )
};

export default NavBar;