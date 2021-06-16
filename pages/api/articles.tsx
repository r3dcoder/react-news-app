import useSWR from 'swr';


export default async function handler(req, res) {
    // res.status(200).json({ name: 'John Doe' })
    const apiResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&page=${2}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
          },
        },
      ).then(res => res.json());

    res.status(200).json({apiResponse })
    }