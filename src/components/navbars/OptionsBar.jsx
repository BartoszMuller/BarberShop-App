import { isUserAdmin } from "@/app/api/utils/auth/verification";
import styles from "./navbar.module.scss";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const OptionsBar = () => {
  const { data: session } = useSession();
  const currentPath = usePathname();

  const oppositeViewPath = currentPath.startsWith("/admin")
    ? "/panel"
    : "/admin";

  return (
    <div className={styles.options}>
      {isUserAdmin(session.user) && (
        <Link href={oppositeViewPath}>
          <img alt="change view icon" src="/images/change.svg" />
        </Link>
      )}
      <div>
        Witaj {session.user.firstname} {session.user.surname}
      </div>
      <button onClick={signOut}>Wyloguj</button>
    </div>
  );
};
export default OptionsBar;
