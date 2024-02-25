"use client";

import AdminNavbar from "@/components/navbars/AdminNavbar";
import styles from "../panel/layout.module.scss";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import Loading from "@/components/static-statements/Loading";
import { isUserAdmin } from "../api/utils/auth/verification";

const AdminLayout = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "authenticated" && isUserAdmin(session.user)) {
    axios.defaults.headers.common["authorization"] = session.accessToken;

    return (
      <div className={styles.container}>
        <AdminNavbar></AdminNavbar>
        <div className={styles.main}>{children}</div>
      </div>
    );
  } else {
    router.push("/panel");
  }
};

export default AdminLayout;
