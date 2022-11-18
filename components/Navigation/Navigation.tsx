import Link from "next/link";
import { useRouter } from "next/router";

import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";

import { useLogoutUserMutation } from "../../store/UserApi";
import { useServerRefresher } from "../../utils/hooks";
import { User } from "../../utils/types";
import styles from "./Navigation.module.scss";
interface Props {
  user: User;
}

function Navigation({ user }: Props) {
  const [logoutUserMutation] = useLogoutUserMutation();

  // Rerenders component when user data is changed
  // TODO: consider another solution here
  const refreshData = useServerRefresher();

  const logoutUserHandler = async () => {
    await logoutUserMutation();
    refreshData();
  };

  const router = useRouter();

  return (
    <nav className={styles.container}>
      <div className={styles.menu}>
        <Link href="/" className={styles.user}>
          Home
        </Link>
        <Link href="/about" className={styles.user}>
          About
        </Link>
        {user ? (
          <Link href="/contacts" className={styles.user}>
            Contacts
          </Link>
        ) : null}
      </div>
      <div className={styles.user}>
        <FontAwesomeIcon icon={faUser} className={styles.icon} />
        <span className="font-bold">{user ? user.name : "Guest"}</span>
        {user ? (
          <Button
            htmlType="button"
            onClick={logoutUserHandler}
            className={styles.button}
          >
            Logout
          </Button>
        ) : (
          <Button
            htmlType="button"
            onClick={() => router.push("/login")}
            className={styles.button}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}

export { Navigation };
