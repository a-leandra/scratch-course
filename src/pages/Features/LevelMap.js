import React from 'react';
import '../../index.css';
import MapFields from './MapFields';
import mapa_poziomy from '../../assets/mapa_poziomy.png'

export default function MapComponent() {
    const coordinates = [
        {x:15, y:52.5, active: true, current: false}, 
        {x:35, y:48, active: false, current: true},
        {x:50, y:58, active: false, current: false},
        {x:70, y:59, active: false, current: false},
        {x:90, y:58, active: false, current: false},
        {x:80, y:34, active: false, current: false},
        {x:60, y:36, active: false, current: false},
        {x:37, y:29.5, active: false, current: false},
        {x:17, y:10, active: false, current: false},
    ]
    return (
    <div>
        <img src={mapa_poziomy}
            alt="Mapa"
            style={{
                position:'absolute',
                left:0+'vw',
                top:0+'vh',
                width:'100%',
                height:'100%'
            }}
            />
            <MapFields coordinates={coordinates}/>
        </div>
    )
}