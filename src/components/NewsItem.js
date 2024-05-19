import React from 'react'

const NewsItem =(props)=> {
    let {heading, discription, imageUrl, newsUrl, date, srcName} = props;
    return (
      <div>
        <div className="card my-3">
            <img src={!imageUrl?"https://www.hindustantimes.com/ht-img/img/2024/05/08/1600x900/India-IPL-Cricket-110_1715143864827_1715143915775.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{heading}...</h5>
                <strong><p className='my-2'>Publishing Date: {date}</p></strong>
                <p className="card-text">{discription}...</p>
                <small><p>Source: {srcName}</p></small>
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read News Detail</a>
            </div>
        </div>
      </div>
    )
  }

export default NewsItem
