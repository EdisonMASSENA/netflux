import { useEffect, useState } from "react"
// import Button from '@mui/material/Button';
import "./Home.scss"
import Slider from "./Slider";


function Home() {

  const [data, setData] = useState([]) 

  const api_key = "c04ac87410132d6f3b9895aa33fef9d0";

  const urlImage = "http://image.tmdb.org/t/p/original"

  useEffect (() => {
      async function trendMovie() {
          const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1&include_adult=false`);
          const trendmovie = await response.json();
          setData(trendmovie.results);
      }
      trendMovie()
  }, [])
  

  // console.log(data);

  let i = 0;
    
  let sectionStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${urlImage}${data[i]?.backdrop_path})`
  };


  return (
    <>
      <div className="banner" style={sectionStyle} >

        <div className="titlebloc">
          <h2 className="title">{data[i]?.title || data[i]?.name}</h2>
          {/* <Button variant="contained" className="button" >Play</Button> */}
          {/* <Button sx={{margin:1}} variant="contained" className="button" >Info</Button> */}
        </div>
        
      </div>

      <div className="sliders">

        <Slider data={data} cat="Films en tendance" type="movie"/>

      </div>
    </>
  )

}

export default Home
