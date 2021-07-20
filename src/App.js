import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import './App.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { string } from 'prop-types';
// import { Grid } from '@giphy/react-components'
// import { GiphyFetch } from '@giphy/js-fetch-api'


function App() {

const [WelcomeMessage,setWelcomeMessage] = useState('welcome')
const [Gifs,setGifs] = useState([])
const [Data,setData] = useState([])
const [Text,setText] = useState('')
const [Messages,setMessages] = useState([])
// const [Error,setError] = useState('')

// // use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
// const gf = new GiphyFetch('OD5q7sGs7rG2uMT2D9DEx2nJ2s0gESdR')
// // configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
// const fetchGifs = () => gf.trending({  limit: 10 })

// const { data: gifs } = await gf.trending({ limit: 10 })

// co

const searchGif=(e)=>{
  
 const filteredResults= Data.filter((EI)=>{

  if(EI.title.toUpperCase().replace(/ /g, '').includes(e.target.value.toUpperCase().replace(/ /g, ''))) {
      return EI
  }


  })

  console.log('seeing fil',filteredResults)

  setGifs(filteredResults)

}


useEffect(()=>{


  const fetchData = async () => {

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "OD5q7sGs7rG2uMT2D9DEx2nJ2s0gESdR",
          limit: 100
        }
      });
  
      console.log('rrr',results);
      setGifs(results.data.data);
      setData(results.data.data);
    } catch (err) {
      console.log('error')
      // setIsError(true);
      // setTimeout(() => setIsError(false), 4000);
    }
  
    // setIsLoading(false);
  };

  fetchData();
},[])






// //  useEffect(()=>{

//   async function fetchData() {
//     const gf = new GiphyFetch('OD5q7sGs7rG2uMT2D9DEx2nJ2s0gESdR')

//     // fetch 10 gifs
//     const { data: gifs } = await gf.trending({ limit: 10 })
  
//     console.log('mayank')

//        if(gifs.length === 0){
//           console.log('error fetching')
//        }
//        else{   
//           console.log('got gifs')
//          setGifs(gifs)
//        }
//   }


//   fetchData();

  // console.log('see',gifs)


//  },[])





  const sendGif=(el)=>{

    setWelcomeMessage('')

    const date= new Date()

    const day =  String(date).slice(8,10)
    const month = String(date).slice(4,7)
    const year= String(date).slice(11,15)
    const time= String(date).slice(16,24)
  
    //  console.log(day)
    //  console.log(month)
    //  console.log(year)
    //  console.log(time)
    //  console.log(date)
  
    console.log('mmay',el.title)

 const filteredSelectedGif= Data.filter((EI)=>{

  if(EI.title.toUpperCase().replace(/ /g, '').includes(el.title.toUpperCase().replace(/ /g, ''))) {
      return EI
  }

  })

  const filteredSelectedGifObject={
    gifData:filteredSelectedGif[0],
    date:day + '-' + month + '-' + year + '-' + time
  }

  setMessages([...Messages,filteredSelectedGifObject])
    

  }



const submit=()=>{


    if(!Text){
      setText('please type something')
    }

    else{

  setWelcomeMessage('')

      var textbar= document.querySelector('.text-bar')
      var messages= document.querySelector('.messages')
         
      
  const date= new Date()

  const day =  String(date).slice(8,10)
  const month = String(date).slice(4,7)
  const year= String(date).slice(11,15)
  const time= String(date).slice(16,24)

   console.log(day)
   console.log(month)
   console.log(year)
   console.log(time)
   console.log(date)

  const MessageObject={
    text:Text,
    date:day + '-' + month + '-' + year + '-' + time
  }

  setMessages([...Messages,MessageObject])
  setText('')

  console.log('scroll height',messages.offsetHeight ,typeof(messages.offsetHeight))

  var value = messages.offsetHeight + 1000

  console.log('value',value)
  // textbar.scrollHeight - textbar.clientHeight;
   textbar.scrollTo(0,10000)
  //  p[0].classList.add('padding-top')

    }


}


const deleteGif=(EM)=>{


 EM.gifData= 'you deleted this Gif'

 setMessages([...Messages])

}

const deleteMessage=(EM)=>{

 EM.text = 'you deleted this message'

 setMessages([...Messages])

}

const renderGifs = () => {

  // if (isLoading) {
  //   return <Loader />;
  // }
  return Gifs.map(el => {
    return (
      <div key={el.id} className="gif col-12" onClick={()=>sendGif(el)}>
        <img src={el.images.fixed_height.url} />
      </div>
    );
  });

};

  return (
    <div className="App">
      <div className="text-bar">
       
         <div className="messages">

                 { <h2 className="welcome text-center"> {WelcomeMessage} </h2>  }

                {Messages && Messages.map((EM)=>{

                  if(EM.text){
                    return <p className="para" key={EM.date} >{EM.text} <span className={EM.text === 'you deleted this message' ? 'hide' : 'date'} >{EM.date} <button className={EM.text === 'you deleted this message' ? 'hide' : 'delete'} onClick={()=>deleteMessage(EM)}  > delete</button> </span> </p>
                  }

                  else{
                  return <div className="gif-message-wrapper"> {  typeof(EM.gifData) === 'string' ?  <p className="para "> you deleted this gif</p>  : <img className="gif-message" src={EM.gifData.images.fixed_height.url} /> }<span className={EM.gifData === 'you deleted this Gif' ? 'hide' : 'date'}>{EM.date}</span> <button className={EM.gifData === 'you deleted this Gif' ? 'hide' : 'delete'} onClick={()=>deleteGif(EM)}> delete</button> </div>  
                  }
           
                })}

         </div>

         
        
          </div>
          <div className="bottom-wrapper">

          <div class="btn-group dropup">
          <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Gifs
          </button>
          <ul class="dropdown-menu">
              <div className="box">
                 <input type="text" placeholder="search Gif" onChange={(e)=>searchGif(e)} />
                         <div className="Gifs row"> { renderGifs()} </div> 
                 </div>
          </ul>
        </div>
        
           <div className="message-send-wrapper">
           <input className="search-input" type="text" value={Text} placeholder="enter your message"  onChange={(e)=>setText(e.target.value)} />
           <button  onClick={()=>submit()} className="btn btn-success send-button"> send </button>
          
           </div>
        
          </div>
    </div>
  );
}

export default App;
