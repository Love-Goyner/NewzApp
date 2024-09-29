import React  , { useEffect, useState } from 'react'
import { useFirebase } from '../context/firebase'

function NewsItem({title, description, imageUrl, newsUrl, publishDate, mode, source}) {
  const firebase = useFirebase();
  const [isSaved, setIsSaved] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)

  const saveNews = async (e) => {
    const result = await firebase.newSaveIt(title, description, publishDate, imageUrl, newsUrl, source);
    if(result){
      setIsSaved(true);
    }
  }

  const unSaveNews = async (newsUrl) => {
    const docID = await firebase.findNews(newsUrl);
    if(docID && docID.id){
      await firebase.deletenews(docID.id);
      setIsSaved(false);
    }
  }

  useEffect(() => {
    const checkForSavedNews = async (newsUrl)=> {
      const docID = await firebase.findNews(newsUrl);
      if(docID && docID.id){
        setIsSaved(true);
      }
    }
    checkForSavedNews(newsUrl);
  }, [isSaved, firebase, newsUrl])

  useEffect(()=>{
    if(firebase.isLoggedIn) setLoggedIn(true);
  }, [firebase])
  
  
  return (
    <div className='my-3 ' style={{display:'flex' , justifyContent:'center'}}>
      <div className="card" style={{width: "20rem", borderRadius:'10px'}}>
          <img src={imageUrl?imageUrl:"https://i.ibb.co/rFm5wfq/News-Z-logo.jpg"} className="card-img-top" style={{height : '12rem', borderTopRightRadius:'10px', borderTopLeftRadius: '9px'}} alt="..."/>
          <div className={`card-body bg-${(mode==='light'?'white':'black')}`} style={{borderBottomRightRadius:'10px', borderBottomLeftRadius: '9px'}}>
            <h5 className="card-title" style={{fontSize : '18px', color: mode === 'dark' ? 'white' : 'black'}}>{title}...<span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1', left:'90%'}}>
            {source}
            <span className="visually-hidden">unread messages</span>
            </span></h5>
            <p className="card-text mb-1" style={{color: mode === 'dark' ? 'white' : 'black'}}>{description}...</p>
            <p className='card-text mb-2 mt-0' style={{color: 'grey'}}>{publishDate}</p>
            <a href={newsUrl} target='_black' className="btn btn-sm btn-primary">Read More</a>
            {loggedIn && 
            <>
              {isSaved ? (
                <button className="btn btn-sm btn-danger" onClick={() => unSaveNews(newsUrl)}>Unsave It</button>
              ) : (
                <button onClick={saveNews} className="btn btn-sm btn-success">Save It</button>
              )}
              </>
            }
          </div>
      </div>
    </div>
  )
}

export default NewsItem
