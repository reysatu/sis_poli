import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBwq9jkLCmf8oHecoIGu0Hp7l1OC9uoUfM" }}
        defaultCenter={{
            lat: -5.900461614573714,
            lng:-76.11264406960854,
        }}
        defaultZoom={15}
      >
        
      </GoogleMapReact>
    </div>
  );
}