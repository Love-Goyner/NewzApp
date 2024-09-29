import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News2 extends Component {
    static defaultProps = {
        pageSize: 9,
        category: 'general'
    }

    static propTypes = {
        pageSize: PropTypes.number,
        category: PropTypes.string,
        mode: PropTypes.string,
        setProgress: PropTypes.func,
        apikey: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            totalResult: 0,
            offset: 0
        }
    }

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://api.mediastack.com/v1/news?access_key=${this.props.apikey}&categories=${this.props.category}&languages=en&limit=${this.props.pageSize}&offset=${this.state.offset}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let newsData = await data.json();
        this.setState({
            articles: newsData.data,
            totalResult: newsData.pagination.total,
            loading: false
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {
        let newOffset = this.state.offset + this.props.pageSize; // Increment offset for next page
        let url = `https://api.mediastack.com/v1/news?access_key=${this.props.apikey}&categories=${this.props.category}&languages=en&limit=${this.props.pageSize}&offset=${newOffset}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let newsData = await data.json();
        this.setState({
            articles: this.state.articles.concat(newsData.data),
            offset: newOffset,
            loading: false
        });
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
                {this.state.loading && <Spinner mode={this.props.mode} />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResult}
                    loader={<Spinner mode={this.props.mode} />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((e, index) => {
                                return <div className="col-md-4" key={index}>
                                    <NewsItem
                                        source={e.source}
                                        title={e.title ? e.title.slice(0, 50) : "NO Title"}
                                        description={e.description ? e.description.slice(0, 95) : "NO description"}
                                        imageUrl={e.image}
                                        newsUrl={e.url}
                                        publishDate={e.published_at ? e.published_at.slice(0, 19).replace('T', ' ') : "No Dates Available"}
                                        mode={this.props.mode}
                                    />
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
