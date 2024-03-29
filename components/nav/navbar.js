import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { createMagic } from "../../lib/magic-client";
import Link from "next/link";

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("");
  const [didToken, setDidToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function getUsername() {
      try {
        const magic = createMagic();
        const isLoggedIn = await magic.user.isLoggedIn();
        console.log("THE USER IS LOGGED IN: ", isLoggedIn);
        const didToken = await magic.user.getIdToken();
        console.log({ didToken });
        const { email } = await magic.user.getMetadata();
        if (email) {
          setUsername(email);
        }
      } catch (err) {
        console.error("Error retrieving email address", err);
      }
    }
    getUsername();
  }, []);

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

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("User logged out successfully!");
        router.push("/login");
      } else {
        console.log("Error logging user out:", response.status, response);
      }
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link legacyBehavior href="/">
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src={"/static/netflix.svg"}
                alt="netflix logo"
                width="128"
                height="34"
              />
            </div>
          </a>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem1} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyLikes}>
            My Likes
          </li>
        </ul>{" "}
        {/*styles.navItems*/}
        <nav className={styles.navContainer}>
          <div>
            <button
              className={styles.usernameButton}
              onClick={handleShowDropdown}
            >
              <p className={styles.username}>{username}</p>
              <Image
                src={"/static/expand_more.svg"}
                alt="expand dropdown"
                width="24"
                height="24"
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkText} onClick={handleSignout}>
                    Sign Out
                  </a>
                  <div className={styles.lineWrapper}></div>{" "}
                  {/*just for spacing purposes*/}
                </div>
              </div>
            )}{" "}
            {/*styles.navDropdown*/}
          </div>
        </nav>{" "}
        {/*styles.navContainer*/}
      </div>{" "}
      {/*styles.wrapper*/}
    </div> //*styles.container*/}
  );
};

export default NavBar;
