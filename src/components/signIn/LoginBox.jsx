"use client";

import { useEffect, useRef } from "react";
import styles from "./login.module.scss";

import { useSearchParams } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Loading from "../static-statements/Loading";
import { isUserAdmin } from "@/app/api/utils/auth/verification";

const LoginBox = () => {
  const emailRef = useRef();
  const firstnameRef = useRef();
  const surnameRef = useRef();
  const passwordRef = useRef();

  const params = useSearchParams();

  let error = params.get("error");

  if (error == "CredentialsSignin") {
    error = "Podana nazwa użytkownika lub hasło są nieprawidłowe";
  }

  // const { mutate: sendRegData } = useMutation({
  //   mutationFn: async (loginData) => await axios.post('/api/user', loginData),
  //   onSuccess: () => {
  //     router.push('/panel');
  //   }
  // });

  const submitLogin = async () => {
    const res = await signIn("credentials", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      redirect: false,
    });
  };

  // const submitReg = () => {
  //   const loginData = {
  //     email: emailRef.current.value,
  //     firstname: firstnameRef.current.value,
  //     surname: surnameRef.current.value,
  //     password: passwordRef.current.value
  //   };
  //   sendRegData(loginData);
  // };

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (session && session.user) {
    return (
      <>
        <div className={styles.title}>
          <div>Jesteś już zalogowany</div>
          <div>
            {session.user.firstname} {session.user.surname}
          </div>
        </div>

        <Link
          className={styles.help}
          href={isUserAdmin(session.user) === "admin" ? "/admin" : "/panel"}
        >
          Przejdź do panelu
        </Link>

        <div className={styles.panel}>
          <div>
            <button onClick={() => signOut()}>
              {" "}
              Wyloguj <img src="/images/login.svg" />{" "}
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.title}>
          <div>Logowanie dla stałych klientów</div>
        </div>

        <div className={styles.panel}>
          <div className={styles.data}>
            <div>
              <label> Email </label>
              <input name="email" placeholder="..." ref={emailRef} />
            </div>

            <div>
              <label> Hasło </label>
              <input
                name="password"
                placeholder="..."
                ref={passwordRef}
                type="password"
              />
            </div>
          </div>

          <div>
            <button onClick={submitLogin}>
              {" "}
              Zaloguj <img src="/images/login.svg" />{" "}
            </button>
          </div>
        </div>

        <div className={styles.info}>
          {error && (
            <div className={styles.error}>
              <p> Błąd:</p>
              <p>{error}</p>
            </div>
          )}
        </div>
      </>
    );
  }
};

export default LoginBox;
