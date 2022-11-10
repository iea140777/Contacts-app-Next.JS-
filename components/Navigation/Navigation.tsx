import Link from "next/link";
import { useRouter } from "next/router";

import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";

import { logout, selectUser } from "../../store/userSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import styles from "./Navigation.module.scss";

function Navigation() {
  const dispatch = useAppDispatch();
  const { isAuthorized, userName } = useAppSelector(selectUser);

  const logoutUserHandler = () => {
    dispatch(logout());
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
        {isAuthorized ? (
          <Link href="/contacts" className={styles.user}>
            Contacts
          </Link>
        ) : null}
      </div>
      <div className={styles.user}>
        <FontAwesomeIcon icon={faUser} className={styles.icon} />
        <span className="font-bold">{isAuthorized ? userName : "Guest"}</span>
        {isAuthorized ? (
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
