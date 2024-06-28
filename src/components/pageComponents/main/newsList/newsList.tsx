import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/reduxHooks";
import NewsCard from "../../../UI/newsCard/newsCard";
import styles from "./styles.module.css";
import {
  fetchNewsDetails,
  fetchStories,
  getNews,
} from "../../../../shared/functions/API/getNews";
import { useNavigate } from "react-router-dom";
import Pagination from "./pagination/pagination";
import { useInterval } from "../../../../shared/hooks/useInterval";
const NewsList = () => {
  const filterValue = useAppSelector((state) => state.newsList.filter);
  const newsState = useAppSelector((state) => state.newsList[filterValue]);
  const dispatch = useAppDispatch();
  const [ids, setIds] = useState<number[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [pageCount, setPageCount] = useState<number>(-1);
  const [listNews, setListNews] = useState<null | any[]>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      let idList = await fetchStories(filterValue);
      setIds(idList);
      setActivePage(1);
      setListNews([]);
      let count = idList.length / 50;
      setPageCount(count);
      idList = idList.slice(0, 50);
      let news = await fetchNewsDetails(idList);

      setListNews(news);
    };
    func();
  }, [filterValue]);

  useInterval(() => {
    const func = async () => {
      let ids = await fetchStories(filterValue);
      let count = ids.length / 50;
      setPageCount(count);
      ids = ids.slice(activePage - 1, activePage * 50);
      let news = await fetchNewsDetails(ids);
      setListNews(news);
      if (activePage > count) {
        setActivePage(count);
      }
    };
    func();
  }, 30000);

  useEffect(() => {
    let func = async () => {
      console.log("list", ids);
      let idList = ids.slice((activePage - 1) * 50, activePage * 50);
      setListNews([]);
      let news = await fetchNewsDetails(idList);
      setListNews(news);
    };

    if (listNews !== null) func();
  }, [activePage]);

  console.log("news", listNews);

  return (
    <>
      <div className={styles.container}>
        {listNews &&
          listNews.map((el) => {
            return (
              <NewsCard
                key={el.id}
                header={el?.title}
                date=""
                rating={el?.score}
                onClick={() => navigate(`/news/${el.id}`)}
                author={el?.by}
              />
            );
          })}
      </div>

      <Pagination
        countPages={pageCount}
        activePage={activePage}
        onClickNum={(num) => {
          setActivePage(num);
        }}
        onClickNext={() => {
          if (activePage !== pageCount) {
            setActivePage(activePage + 1);
          }
        }}
        onClickPrev={() => {
          if (activePage !== 0) {
            setActivePage(activePage - 1);
          }
        }}
      />
    </>
  );
};

export default NewsList;
