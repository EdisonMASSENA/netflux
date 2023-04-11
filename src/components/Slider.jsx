import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import './Slider.scss';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useEffect, useState } from 'react';

function Slider(props) {

    const [favorites, setFavs] = useState([]);


    const handleFav = (id) => {
        let favs = JSON.parse(localStorage.getItem('favs')) || [];
        if (favs.includes(id)) {
            favs = favs.filter((fav) => fav !== id);
        } else {
            favs.push(id);
        }
        localStorage.setItem('favs', JSON.stringify(favs));
        setFavs(favs);
    };


    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem('favs')) || [];
        setFavs(favs);
    }, []);

    console.log(props);

    return (
        <>
        <h3> {props.cat} </h3>
        <div>
            <Slide autoplay={false} slidesToScroll={2} slidesToShow={8} indicators={false} >
                {props.data.map((item) => (

                    <div key={item.id}>

                        <IconButton color='error' className='fav' onClick={() => handleFav(item.id)}>
                            {favorites.includes(item.id) ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>

                        <Link to="/detail" state={{type: props.type, id: item.id}} >
                            <img title={item.title || item.name} className='poster' src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}/>
                        </Link> 
                    </div>
                ))}
            </Slide>
        </div>
        </>
    );
};

export default Slider;