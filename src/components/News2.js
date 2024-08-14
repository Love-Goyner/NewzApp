import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News2 extends Component {
    static defaultProps = {
        county : 'in',
        pageSize : 9,
        category : 'general'

    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
    }

constructor() {
    super();

    this.state = {
        articles : [],
        loading : true,
        page : 1,
        totalResult : 0
    }
}

async updateNews(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let newsData = await data.json();
    this.setState({
        articles : newsData.articles,
        totalResult : newsData.totalResults,
        loading:false
    });
    this.props.setProgress(100);
}

async componentDidMount(){
    this.updateNews();
}

fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ page : this.state.page + 1 })
        let data = await fetch(url);
        let newsData = await data.json();
        setTimeout(() => {
            this.setState({
                articles : this.state.articles.concat(newsData.articles),
                totalResult : newsData.totalResults,
            });
        }, 1000);
        
    };

capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
    
render() {

return (
    
    <>
        {!this.state.loading && <h3 className={`my-3 mb-0 mx-2 text-${(this.props.mode==='dark')?'white':'black'}`} >NewsZ - Top {this.capitalizeFirstLetter(this.props.category)} Heading </h3>}
        {this.state.loading && <Spinner mode={this.props.mode}/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResult}
          loader={<Spinner mode={this.props.mode}/>}
        >
            <div className="container">
                <div className="row">
                {this.state.articles.map((e) => {
                    return <div className="col-md-4" key={e.url}>
                    <NewsItem source={e.source.name} title={e.title?e.title.slice(0, 50) : "NO Title"} description={e.description?e.description.slice(0, 95):"NO description"} imageUrl={e.urlToImage} newsUrl={e.url} publishDate={e.publishedAt?e.publishedAt.slice(0, 19).replace('T', '  '):"No Dates Avaible"} mode={this.props.mode}/>
                    </div>
                })}
                </div>
            </div>
                </InfiniteScroll>
    </>
)
}
}

export default News2
