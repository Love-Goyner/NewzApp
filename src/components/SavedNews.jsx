import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

function SavedNews({ mode }) {
  const firebase = useFirebase();
  const [savedNews, setSavedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedNews = async () => {
      const news = await firebase.getAllSavedNews();
      if (news) {
        setSavedNews(news);
        setLoading(false);
      }
    };

    fetchSavedNews();
  }, [firebase]);

  return (
    <>
      <h2 style={{color: mode === 'dark'?'white':'black' }}>Saved News</h2>
      <div className="container">
        <div className="row">
          {loading ? (
            <p style={{color: mode === 'dark'?'white':'black' }}><Spinner mode={mode}/></p>
          ) : savedNews.length > 0 ? (
            savedNews.map((newsItem) => (
              <div className="col-md-4" key={newsItem.id}>
                <NewsItem
                  title={newsItem.title}
                  description={newsItem.description}
                  imageUrl={newsItem.imageURL}
                  newsUrl={newsItem.newsUrl}
                  publishDate={newsItem.publishDate}
                  mode={mode}
                  source={newsItem.source}
                />
              </div>
            ))
          ) : (
            <p style={{color: mode === 'dark'?'white':'black' }}>No saved news items found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SavedNews;
