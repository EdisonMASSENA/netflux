// import { Transition } from 'react-transition-group';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Button from '@mui/material/Button';
import Slider from "./Slider";

import './Detail.scss';
import { CloseFullscreen } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function Detail() {

  const [detail, setDetail] = useState([])
  const [actors, setActors] = useState([])
  const [directors, setDirectors] = useState([])
  const [genre, setGenre] = useState([])
  const [video, setVideo] = useState([])
  const [player, setPlayer] = useState(false)
  const [reco, setReco] = useState([])

  const urlImage = "http://image.tmdb.org/t/p/original"

  const api_key = "c04ac87410132d6f3b9895aa33fef9d0";
  const location = useLocation();
  const injdata = location.state;



  useEffect(() => {
    const getDetail = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${injdata.id}?api_key=${api_key}&language=fr-FR`);
      const newData = await response.json();
      newData.runtime = Math.floor(newData.runtime / 60) + ' h ' + newData.runtime % 60 + ' min';
      newData.release_date = newData.release_date.slice(0, 4);
      newData.overview = newData.overview.slice(0, 200);

      // in the array newData we need only the name in the genre array separated by a comma
      const genre = newData.genres.map((genre) => genre.name).join(', ');
      setGenre(genre);
      setDetail(newData);
    };

    getDetail();
  }, [injdata.id]);

  useEffect(() => {
    const getCast = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${injdata.id}/credits?api_key=${api_key}&language=en-US`);
      const credits = await response.json();

      const actors = credits.cast.slice(0, 3).map((actor) => actor.name).join(', ');
      setActors(actors);

      const directors = credits.crew.filter((member) => member.known_for_department === 'Directing').map((director) => director.name);
      setDirectors(directors[0]);
    };

    getCast();
  }, [injdata.id]);

  useEffect(() => {
    const getVideo = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${injdata.id}/videos?api_key=${api_key}&language=en-US`);
      const videoUrl = await response.json();
      const trailer = videoUrl.results.filter((video) => video.name === 'Official Trailer').map((video) => video.key);
      setVideo("https://www.youtube.com/embed/"+trailer);
    };
    getVideo();
  }, [injdata.id]);

  useEffect(() => {
    const getRecommendation = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${injdata.id}/recommendations?api_key=${api_key}&language=en-US&page=1&include_adult=false`);
      const recommendation = await response.json();
      setReco(recommendation.results);
    };
    getRecommendation();
  }, [injdata.id]);
  

  // console.log(reco);

  let sectionStyle = {
    backgroundImage: `linear-gradient(50deg,rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${urlImage}${detail?.backdrop_path})`
  };

  return (

    <>
    <div className="banner" style={sectionStyle} >

      <div className="titlebloc">

        <div className="top">

          <h2 className="title">{detail?.title || detail?.name}</h2>

          <p className="infobloc">
            <span className="info"> {Math.round(detail.vote_average)}/10 ⭐</span>
            <span className="info"> {detail.runtime || detail.tvruntime} </span>
            <span className="info"> {detail.release_date || detail.first_air_date}</span>
          </p>

          <p className="overview">{detail.overview}...</p>

        </div>

        <div className="action">
          <Button variant="contained" className="play" onClick={()=> setPlayer(true)} >Play</Button>
        </div>


        <div className="bot">

          <table>

            <tr>
              <td>Réalisateur</td>
              <td> {directors} </td>
            </tr>

            <tr>
              <td className="col">Acteurs</td>
              <td> {actors} </td>
            </tr>

            <tr>
               <td class="col">Genres</td>
               <td>{ genre }</td>
             </tr>

          </table>

        </div>

      </div>

      <div>
        <Slider data={reco} cat="Recommendations" type="movie"/>
      </div>

    </div>
    {player &&
      <div className="player" >

        <IconButton color="inherit" size="large" className="close" onClick={()=> setPlayer(false)} >
          <CloseFullscreen/>
        </IconButton>

        <iframe width="100%" height="100%" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

      </div>
    }
  </>
  )


}

export default Detail