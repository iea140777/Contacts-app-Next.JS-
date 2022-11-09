import Link from "next/link";

import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { selectUser } from "../../store/userSlice";
import { useAppSelector } from "../../utils/hooks";
import styles from "./Navigation.module.scss";

function Navigation() {
  const { isAuthorized, userName } = useAppSelector(selectUser);
  return (
    <nav className={styles.container}>
      <div className={styles.user}>
        <FontAwesomeIcon icon={faUser} className={styles.icon} />
        <span className="font-bold">{isAuthorized ? userName : "Guest"}</span>
      </div>
      <div className={styles.user}>
        <Link href="/" className={styles.user}>
          Home
        </Link>
        {isAuthorized ? (
          <Link href="/contacts" className={styles.user}>
            Contacts
          </Link>
        ) : null}
      </div>
    </nav>
  );
}

export { Navigation };
