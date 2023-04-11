import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';

import "./Layout.scss";

function Layout () {

  const [sticky, setSticky] = useState(false);


  useEffect(() => {
    function handleScroll() {

      if (window.pageYOffset >= 10 ) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    } 
    handleScroll();
  }, []);

  return (
    <>
      <div className="navbar" >
          <Link to="/"><img src="./src/assets/logo.png" className="logo" /></Link>
          <Link to="/favoris"><Button variant="contained">Favoris</Button></Link>
      </div>
      <Outlet />
    </>
  )
};

export default Layout;