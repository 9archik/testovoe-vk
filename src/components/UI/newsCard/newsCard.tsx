import { FC } from "react";
import type { INewsCard } from "./interface";
import styles from "./style.module.css";

const NewsCard: FC<INewsCard> = ({ onClick, author, date, header, rating }) => {
  return (
    <div onClick={onClick} className={styles.container}>
      <header>{header}</header>
      <div className={styles.main}>
        <div className={styles.author}>{author}</div>
      </div>

      <div className={styles.rating}>{rating}</div>
    </div>
  );
};

export default NewsCard;
