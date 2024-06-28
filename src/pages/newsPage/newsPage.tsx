import Comments from "../../components/pageComponents/newsItem/comments/comments";
import NewsInfo from "../../components/pageComponents/newsItem/info/newsInfo";

const NewsPage = () => {
  return (
    <div className={`container`}>
      <NewsInfo />
      <Comments />
    </div>
  );
};

export default NewsPage;
