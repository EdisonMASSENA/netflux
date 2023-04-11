import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './Favs.scss';

function Favs() {

    const api_key = "c04ac87410132d6f3b9895aa33fef9d0";
    const favs = JSON.parse(localStorage.getItem('favs')) || [];

    const [data, setData] = useState([]);
    const [favorites, setFavs] = useState(favs);

    useEffect(() => {

        favs.map(async (item) => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${item}?api_key=${api_key}&language=en-US`);
            const card = await response.json();
            setData(prevData => [...prevData, card]);
        })

        // localStorage.clear()

    }, []);

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

    console.log(data);


    return (
        <div className="favs">
            <h3> Favoris </h3>
            <div className="slider">
                {data.map((item) => (
                    <div >
                        <IconButton color='error' className='fav' onClick={() => handleFav(item.id)}>
                            {favorites.includes(item.id) ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                        <Link key={item.id} to="/detail" state={{type:'movie', id: item.id}} >
                            <img title={item.title || item.name} className='poster' src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}/>
                        </Link> 
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favs;