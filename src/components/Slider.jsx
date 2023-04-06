import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import './Slider.scss';
import { Link } from 'react-router-dom';

// const responsiveSettings = [
//     {
//         breakpoint: 800,
//         settings: {
//             slidesToShow: 3,
//             slidesToScroll: 3
//         }
//     },
//     {
//         breakpoint: 500,
//         settings: {
//             slidesToShow: 2,
//             slidesToScroll: 2
//         }
//     }
// ];responsive={responsiveSettings}
function Slider(props) {
    return (
        <>
        <h3> {props.cat} </h3>
        <div className="slider">
            <Slide autoplay={false} slidesToScroll={2} slidesToShow={8} indicators={false} >
                {props.data.map((item) => (
                    <div key={item.id}>
                      <Link to="/detail" state={{type: props.type, id: item.id}} ><img title={item.title || item.name} className='poster' src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}/></Link> 
                    </div>
                ))}
            </Slide>
        </div>
        </>
    );
};

export default Slider;