import  Toolbar  from "../../components/toolbar";
import { useRouter } from "next/router";
import  Aricle  from "../../components/article";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
 


export const Feed = ({ pageNumber, articles, totalResults }) => {
  const router = useRouter();
  const [articles1, setArticles1] = useState(articles);
  const [hasMore, setHasMore] = useState(true);

  const getMoreArticles1 = async () => {
    pageNumber++;
    const size = 5 * pageNumber;
    const proxyUrl = "http://news-react-app.vercel.app/"
    const apiResponse = await fetch(
      `${proxyUrl}https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${2}&apiKey=2db9e9a8a05b4a86a54586fbfe958ad1`
    );
    console.log(apiResponse);
    // const newArticles1 = await res.json();
    const apiJson = await apiResponse.json();
    const { articles } = await apiJson;
    setArticles1((articles1) => [...articles1, ...articles]);
  };

  useEffect(() => {
    setHasMore(totalResults > articles1.length ? true : false);
  }, [articles1]);

  console.log(pageNumber);
  return (
    <div className="flex  items-center flex-col">
      <Toolbar />
      
      <InfiniteScroll
        className="items-center md:w-2/3 sm:w-full lg:w-1/2 m-auto  "
        dataLength={articles1.length}
        next={getMoreArticles1}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
       
        {articles1.map((article, index) => (
           <span onClick= {()=>router.push({
             pathname: '/article',
             query: { title: article.title, 
              description: article.description, 
              urlToImage:article.urlToImage,
              url:article.url
            }
           })} className="cursor-pointer" >
          <Aricle  article={article} key={index} index={index} goUrl={false}  />
          </span>
        ))}
      </InfiniteScroll>

    </div>
  );
};

export const getServerSideProps = async (pageContex) => {
  const pageNumber = pageContex.query.slug;

  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}&apiKey=2db9e9a8a05b4a86a54586fbfe958ad1`
  );
  const apiJson = await apiResponse.json();
  const { articles } = apiJson;
  const { totalResults } = apiJson;
  return {
    props: {
      articles,
      pageNumber: Number.parseInt(pageNumber),
      totalResults,
    },
  };
};
export default Feed;
