import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'

const News=(props)=> {
  let [articles, setArticles] = useState([]);
  let [page, setPage] = useState(1);
  let [loading, setLoading] = useState(true);
  let [totalResults, setTotalResults] = useState(0);

  const capitalize=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    const updateNews = async() =>{
      props.setProgress(10);
      const baseUrl=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}`;
      setLoading(true);
      let data = await fetch(baseUrl);
      props.setProgress(30);
      let articleData = await data.json();
      props.setProgress(70);
      setArticles(articleData.articles);
      setTotalResults(articleData.totalResults);
      setLoading(false);
      props.setProgress(100); 
    }
    document.title = `${capitalize(props.category)} - Daily Motion`
    updateNews();
  }, [] )
   
      const fetchMoreData = async() => {
        setPage(page+1)
        const baseUrl=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${setPage(page+1)}`;
        let data = await fetch(baseUrl);
        let articleData = await data.json();
        setArticles(articles.concat(articleData.articles));
        setTotalResults(articleData.totalResults);
      };
    
    return (
        <div className="container my-4">
        <h3 className='text-center' style = {{marginTop: '75px'}}>Daily Motion - Top Headlines | {capitalize(props.category)}</h3>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}>
            <div className="container">
            <div className="row my-2">
                {articles.map((element)=>{
                    return (<div className="col-md-4 my-3" key={element.url}>
                        <NewsItem date={element.publishedAt.slice(0,10)} heading={element.title} discription={element.description} imageUrl={element.urlToImage} srcName={element.source.name} newsUrl={element.url}/>
                      </div>)
                })}
            </div>
            </div>
            </InfiniteScroll>
            
        </div>
    )
}

News.defaultProps = {
  country:"in",
  category:"science"
}

News.propTypes = {
  country:PropTypes.string,
  category:PropTypes.string
}

export default News
