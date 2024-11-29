import { SortingOrder } from "../../utils/constants";
import styles from "./SortingButton.module.scss";

interface SortingButtonProps {
  sortingOrder: SortingOrder;
  buttonHandler: () => void;
}

function SortingButton({ sortingOrder, buttonHandler }: SortingButtonProps) {
  return (
    <button className={styles.button} onClick={buttonHandler}>
      {sortingOrder === SortingOrder.DESC ? "A - Z" : "Z - A"}
    </button>
  );
}

export { SortingButton };
