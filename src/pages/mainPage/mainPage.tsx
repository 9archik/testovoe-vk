import Filter from "../../components/pageComponents/main/filter/Filter";
import MainHeader from "../../components/pageComponents/main/header/header";
import NewsList from "../../components/pageComponents/main/newsList/newsList";

const MainPage = () => {
  return (
    <div className={`container`}>
      <MainHeader />
      <Filter />
      <NewsList />
    </div>
  );
};

export default MainPage;
