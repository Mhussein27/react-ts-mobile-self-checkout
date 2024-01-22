import React, { useState, useEffect } from 'react';
import backgroundImage from '/imgs/backgroundImage.jpg'; // Replace with the correct path to your background image

export function Home() {
  const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = backgroundImage;
    image.onload = () => {
      setBackgroundImageLoaded(true);
    };
  }, [backgroundImage]);

  const divStyle = {
    backgroundImage: backgroundImageLoaded ? `url(${backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const titleStyle = {
    marginBottom: '20px',
    color: 'dodgerblue', // Change the color to light blue
    fontSize: '3rem',
  };

  return (
    <div>
      <h1 style={titleStyle}>Scan Pay Go</h1>
      <div style={divStyle}></div>
      {/* Add other content here */}
    </div>
  );
}

export default Home;