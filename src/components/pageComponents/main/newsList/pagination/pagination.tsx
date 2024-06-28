import ArrowLeftSVG from "../../../../Icons/ArrowLeftSVG";
import ArrowRightSVG from "../../../../Icons/ArrorRightSVG";
import styles from "./styles.module.css";
import { IPagination } from "./interface";
import { FC } from "react";
import PageList from "./pageList/pageList";

const Pagination: FC<IPagination> = ({
  onClickNext,
  onClickPrev,
  onClickNum,
  activePage,
  countPages,
}) => {
  return (
    <div className={styles.container}>
      <button onClick={onClickPrev} className={styles.arrowBtn}>
        <ArrowLeftSVG />
      </button>

      <PageList
        countPages={countPages}
        onClickBtn={onClickNum}
        activePage={activePage}
      />

      <button onClick={onClickNext} className={styles.arrowBtn}>
        <ArrowRightSVG />
      </button>
    </div>
  );
};

export default Pagination;
