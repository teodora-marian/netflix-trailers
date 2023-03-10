import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/login.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");

  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    console.log("event", e);
    const email = e.target.value;
    setEmail(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("hi button");
    if (email) {
      if (email === "you@email.com") {
        router.push("/");
      } else {
        setUserMsg("Email not recognised.");
      }
    } else {
      setUserMsg("Please enter a valid email address.");
    }
  };

  return (
    <div className={styles.container}>
      {" "}
      {/**container*/}
      <Head>
        <title>Netflix Trailers SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="Netflix logo"
                width="128"
                height="34"
              />
            </div>{" "}
            {/**logo Wrapper */}
          </Link>
        </div>{" "}
        {/**header Wrapper */}
      </header>
      <div>
        {" "}
        {/**anonymous main Wrapper */}
        <main className={styles.main}>
          <div className={styles.mainWrapper}>
            <h1 className={styles.signinHeader}>Sign In</h1>
            <input
              type="text"
              placeholder="Email address"
              className={styles.emailInput}
              onChange={handleOnChangeEmail}
            />
            <p className={styles.userMsg}>{userMsg}</p>
            <button onClick={handleLogin} className={styles.loginBtn}>
              Sign In
            </button>
          </div>{" "}
          {/**styles main Wrapper */}
        </main>
      </div>{" "}
      {/**anonymous main Wrapper */}
    </div> /**container*/
  );
};

export default Login;
