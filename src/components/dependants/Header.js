import React, { useContext } from 'react';
import { gsap } from "gsap/all";

import { LayoutContext } from 'contexts';
import { Link } from "react-router-dom";
import { Animator } from 'helpers/index';

export const HeaderTop = () => {
  return <header className="nav-header" style={{ paddingLeft: "5vw", paddingRight: "5vw" }}>
    <h1><Link to="/" id="logo">Memories</Link></h1>
    <div className="burger" onClick={(e) => {
      if (!e.target.classList.contains("active")) {
        e.target.classList.add("active")
        gsap.to(".line1", 0.3, { rotate: "45", y: 5, background: "black" });
        gsap.to(".line2", 0.3, { rotate: "-45", y: -5, background: "black" });
        gsap.to(".nav-bar", .75, { clipPath: "circle(4500px at 100% -10%)" })
        gsap.to("#logo", 1, { color: "black" })
        document.body.classList.add("hide")
        document.getElementById("logo").style.display = "none"
      } else {
        e.target.classList.remove("active")
        gsap.to(".line1", 0.3, { rotate: "0", y: 0, background: "white" });
        gsap.to(".line2", 0.3, { rotate: "0", y: 0, background: "white" });
        gsap.to(".nav-bar", .75, { clipPath: "circle(50px at 100% -10%)" })
        gsap.to("#logo", 1, { color: "white" })
        document.getElementById("logo").style.display = "block"
        document.body.classList.remove("hide")
      }
    }}>
      <div className="line1"></div>
      <div className="line2"></div>
    </div>
  </header>;
}

export const HeaderBottom = () => {
  // let isItDesktop = useMediaQuery('(min-width:600px) and (min-height:600px)');

  const { layoutConfiguration } = useContext(LayoutContext);
  const menuItems = layoutConfiguration.menuItems !== undefined ? layoutConfiguration.menuItems : [];

  const renderSwipes = () => {
    let swipes = [];
    for (var i = 0; i < 3; i++) {
      swipes.push(<div key={`swiper${i}`} className={`swipe swipe${i}`} />);
    }
    return swipes.map(node => node);
  }

  let content = (<>
    <nav className="nav-bar" id="nav-bar" onClick={(e) => {
      Animator.navToggle2(e)
    }}>
      <ul className="nav-links">
        {
          menuItems.map((value, i) => {
            return <Link key={`link${i}`} to={value.controller} className="link-views video-stories-link">
              <h3>{value.name}</h3>
            </Link>;
          })
        }
      </ul>
      <div className="contact">
        <h2>Stay in touch</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, voluptatem aperiam animi laboriosam
        impedit culpa cupiditate odit optio esse laborum provident velit consectetur, blanditiis voluptates
            perferendis et vel dolore nobis!</p>
      </div>
    </nav>
    {renderSwipes()}
  </>
  );
  return content;
};
