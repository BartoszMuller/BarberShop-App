"use client";
import { useState } from "react";
import styles from "./login.module.scss";
import { useSearchParams } from "next/navigation";
import LoginBox from "./LoginBox";

const LoginSection = () => {
  const params = useSearchParams();
  const isShowLogin = params.get("showLogin") ?? false;

  const [showLogin, setShowLogin] = useState(isShowLogin);

  const openLogin = () => {
    setShowLogin((prevValue) => !prevValue);
  };

  return (
    <>
      {showLogin && (
        <div className={styles.backdrop}>
          <div className={styles.box}>
            <LoginBox />
          </div>
        </div>
      )}

      <button
        className={`${styles.login_btn} ${showLogin && styles.LoginBoxOpen}`}
        onClick={openLogin}
      >
        <img src={`/images/${showLogin ? 3 : 2}.svg`} />
      </button>
    </>
  );
};
export default LoginSection;
