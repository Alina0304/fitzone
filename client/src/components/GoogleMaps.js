import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const Marker = ({ text }) => (
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
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <Marker
                        lat={51.656334}
                        lng={39.206089}
                        text="Мы здесь!"
                    />
                </GoogleMapReact>
            </div>
        );
}
