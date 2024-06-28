import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { FC } from "react";
import { IPageList } from "./interface";

const PageList: FC<IPageList> = ({ countPages, onClickBtn, activePage }) => {
  const [pageList, setPageList] = useState<null | number[]>(null);

  useEffect(() => {
    if (countPages) {
      const numbers = Array.from({ length: countPages }, (_, i) => i + 1);
      setPageList(numbers);
    }
  }, [countPages]);

  return (
    <div className={styles.container}>
      {pageList &&
        pageList.map((el, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                onClickBtn(el);
              }}
              className={`${styles.btnPage} ${activePage === el && styles.active}`}
            >
              {el}
            </button>
          );
        })}
    </div>
  );
};

export default PageList;
