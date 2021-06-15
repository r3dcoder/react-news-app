import router from "next/router";
import { Toolbar } from "../components/toolbar";
import { useRouter } from "next/router";
import Link from 'next/link';
export const Feed = ({ pageNumber, articles }) => {
    const router = useRouter();
    console.log(pageNumber, articles);
    return (
        <div className="flex  items-center flex-col" >
            <Toolbar />

            {articles.map((article, index) => (
                <div key={index} className="w-4/6 mt-20 mb-6 pb-6 border-b-2 border-black">
                    <h1 onClick={() => (window.location.href = article.url)} className=" cursor-pointer align-center text-center text-2xl font-bold">{article.title}</h1>
                    <p className="my-2 text-2xl ">{article.description}</p>
                    {!!article.urlToImage && <img className="w-full" src={article.urlToImage} />}
                </div>
            ))}


            <div className="w-4/6 flex justify-between gap-4 mb-4">
                <Link href={`/feed/${encodeURIComponent(pageNumber-1)}`}>
                    <div className={pageNumber === 1 ? 'text-gray-500 cursor-not-allowed' : 'cursor-pointer '}  >
                        Previous Page
                    </div>
                </Link>

                <div> #{pageNumber}</div>

                <Link href={`/feed/${encodeURIComponent(pageNumber+1)}`}>
                    <div className={pageNumber === 5 ? 'text-gray-500 cursor-not-allowed' : 'cursor-pointer '}  >
                        Next Page
                    </div>
                </Link>
            </div>

        </div>
    )
}

export const getServerSideProps = async pageContex => {
    const pageNumber = pageContex.query.slug;
    if (!pageNumber || pageNumber > 5 || pageNumber < 1) {
        return {
            props: {
                articles: [],
                pageNumber: 1
            }
        }
    }
    const apiResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}&apiKey=2db9e9a8a05b4a86a54586fbfe958ad1`,
        {
            headers: {
                Authoriztion: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
            },
        },
    );
    const apiJson = await apiResponse.json();
    const { articles } = apiJson;

    return {
        props: {
            articles,
            pageNumber: Number.parseInt(pageNumber)
        }
    }
};
export default Feed;