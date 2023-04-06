import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import './Slider.scss';

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
        <div>
            <Slide autoplay={false} slidesToScroll={2} slidesToShow={8} indicators={false} >
                {props.data.map((item) => (
                    <div key={item.id} className="slide">
                        <img className='poster' src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt="" />
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default Slider;