import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/login.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createMagic } from "../../lib/magic-client";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    const email = e.target.value;
    setEmail(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email && email !== "") {
      try {
        console.log("Hello mother clucker");
        setIsLoading(true);
        console.log("I will attempt to create the damn magic thignie");
        const magic = createMagic();
        const didToken = await magic.auth.loginWithMagicLink({ email });
        if (didToken) {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${didToken}`,
              "Content-Type": `application/json`,
            },
          });
          const loggedInResponse = await response.json();
          console.log({ loggedInResponse });
          if (loggedInResponse.done) {
            router.push("/");
          } else {
            setIsLoading(false);
            setUserMsg("Something went wrong authorizing access.");
          }
        }
      } catch (err) {
        console.error("Something went wrong logging you in", err);
        setIsLoading(false);
      }
    } else {
      setUserMsg("Please enter a valid email address.");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {" "}
      {/**container*/}
      <Head>
        <title>Netflix Trailers Sign In</title>
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
              {isLoading ? "Loading..." : "Sign In"}
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
