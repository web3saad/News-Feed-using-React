import React, { Component } from 'react'
import NewsItem from './Newsitem'

export class News extends Component {
    constructor(){
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
    }

    async componentDidMount(){ 
        let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bd5193f17dc6451187910957bb2c9b4f";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData); 
        this.setState({
            articles: parsedData.articles || [],
            totalResults: parsedData.totalResults || 0,
            loading: false
        });
    }

    handlePrevClick = async ()=>{
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bd5193f17dc6451187910957bb2c9b4f&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);  
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles || []
        })
    }

    handleNextClick = async ()=>{
        console.log("Next"); 
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
            return;
        }
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bd5193f17dc6451187910957bb2c9b4f&page=${this.state.page + 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);  
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles || []
        })
    }

    render() { 
        return (
            <div className="container my-3">
                <h1>NewsMonkey - Top Headlines</h1> 
                <div className="row"> 
                    {this.state.articles && this.state.articles.length > 0 ? (
                        this.state.articles.map((element) => (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem 
                                    title={element.title || "No Title"} 
                                    description={element.description || "No Description"} 
                                    imageUrl={element.urlToImage || "default.jpg"} 
                                    newsUrl={element.url} 
                                />
                            </div>
                        ))
                    ) : (
                        <h3>Loading news...</h3>
                    )}
                </div> 
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News;
