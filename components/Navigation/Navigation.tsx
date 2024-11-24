import Link from "next/link";
import { useRouter } from "next/router";

import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";

import { useLogoutUserMutation } from "../../store/UserApi";
import { setIsAuthorized, setUserId, setUserName } from "../../store/userSlice";
import { useAppDispatch } from "../../utils/hooks";
import { useServerRefresher } from "../../utils/hooks";
import { User } from "../../utils/types";
import styles from "./Navigation.module.scss";
interface Props {
  user: User;
}

function Navigation({ user }: Props) {
  const dispatch = useAppDispatch();
  const [logoutUserMutation] = useLogoutUserMutation();

  // Rerenders component when user data is changed
  // TODO: consider another solution here
  const refreshData = useServerRefresher();

  const logoutUserHandler = async () => {
    await logoutUserMutation();
    dispatch(setIsAuthorized(false));
    dispatch(setUserId(undefined));
    dispatch(setUserName(""));
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

        <Link href="/contacts" className={styles.user}>
          Contacts
        </Link>
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
