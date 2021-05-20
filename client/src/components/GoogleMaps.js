import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => (
    <div style={{
        color: 'white',
        background: 'red',
        padding: '15px 10px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)'
    }}>
        {text}
    </div>
);
export const GoogleMap=()=>{
    const defaultProps = {
        center: {
            lat: 51.65633,
            lng: 39.20608,
        },
        zoom: 15
    };

 return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    // bootstrapURLKeys={{ key:' "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",' }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <AnyReactComponent
                        lat={51.656334}
                        lng={39.206089}
                        text="Мы здесь!"
                    />
                </GoogleMapReact>
            </div>
        );
}
