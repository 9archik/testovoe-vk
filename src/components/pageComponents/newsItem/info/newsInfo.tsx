import { useParams } from "react-router-dom";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { INewsInfo } from "./interface";
import { getNewsItemDetail } from "../../../../shared/functions/API/getNewsItemDetail";
import { IActiveNewsItem } from "../../../../shared/functions/API/interface";
const NewsInfo = () => {
  const {id} = useParams();

  const [info, setInfo] = useState<null | IActiveNewsItem>(null);

  useEffect(() => {
    const func = async () => {

      let res = await getNewsItemDetail(Number(id));
      console.log('res', res)
      if (res) setInfo(res);
    };

    func();
  }, []);
  return (
    <>
      {info && (
        <div className={styles.container}>
          <div>Заголовок: {info.title}</div>
          <a href={info.url}>Ссылка</a>
          <div>Score: {info.score}</div>
          <div>Автор: {info.by}</div>
        </div>
      )}
    </>
  );
};

export default NewsInfo;
