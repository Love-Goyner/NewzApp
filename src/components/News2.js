import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News2 extends Component {
    static defaultProps = {
        country : 'us',
        pageSize : 9,
        category : 'general'
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string,
        mode : PropTypes.string,
        setProgress : PropTypes.func,
        apikey : PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles : [],
            loading : true,
            nextPage : null,
            totalResult : 0
        }
    }

    async updateNews(){
        this.props.setProgress(10);
        let url = `https://newsdata.io/api/1/latest?apikey=${this.props.apikey}&q=${this.props.category}&size=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let newsData = await data.json();
        this.setState({
            articles : newsData.results,
            totalResult : newsData.totalResults,
            nextPage: newsData.nextPage,
            loading:false
        });
        this.props.setProgress(100);
    }

    async componentDidMount(){
        this.updateNews();
    }

    fetchMoreData = async () => {
        let url = `https://newsdata.io/api/1/latest?apikey=${this.props.apikey}&q=${this.props.category}&size=${this.props.pageSize}&page=${this.state.nextPage}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let newsData = await data.json();
        setTimeout(() => {
            this.setState({
                articles: this.state.articles.concat(newsData.results),
                nextPage: newsData.nextPage,
                loading: false
            });
        }, 2000);
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    render() {
        return (
            <>
                {!this.state.loading && <h3 className={`my-3 mb-0 mx-2 text-${(this.props.mode === 'dark') ? 'white' : 'black'}`}>
                    NewsZ - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
                </h3>}
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
                                return <div className="col-md-4" key={e.article_id}>
                                    <NewsItem source={e.source_name} title={e.title ? e.title.slice(0, 50) : "NO Title"} description={e.description ? e.description.slice(0, 95) : "NO description"} imageUrl={e.image_url} newsUrl={e.link} publishDate={e.pubDate ? e.pubDate.slice(0, 19).replace('T', '  ') : "No Dates Available"} mode={this.props.mode}/>
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News2;
