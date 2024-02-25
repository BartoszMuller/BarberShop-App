"use client";

import UserNavbar from "@/components/navbars/UserNavbar";
import styles from "./layout.module.scss";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

const UserPanelLayout = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="loading"> Loading... </div>;
  }
  if (status === "authenticated" && session?.user) {
    axios.defaults.headers.common["authorization"] = session.accessToken;

    return (
      <div className={styles.container}>
        <UserNavbar></UserNavbar>
        <div className={styles.main}>{children}</div>
      </div>
    );
  } else {
    router.push("/?showLogin=true");
  }
};

export default UserPanelLayout;
