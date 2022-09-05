import React from 'react'
import field from '../../assets/field.png'
import fieldCurrent from '../../assets/fieldCurrent.png'
import fieldActive from '../../assets/fieldActive.png'
import './map_style.css'

export default function MapFields({coordinates}) {
    const fields = [];
    console.log(coordinates);
    coordinates.forEach(element => {
        if (element.current) {
            fields.push(<img src={fieldCurrent}
                alt="field"
                className="field"
                style={{
                    position:'absolute',
                    left:element.x+'vw',
                    top:element.y+'vh',
                    
                }}
                />)
        }
        else if (element.active) {
            fields.push(<img src={fieldActive}
                alt="field"
                className="field"
                style={{
                    position:'absolute',
                    left:element.x+'vw',
                    top:element.y+'vh'
                }}
                />)
        }
        else {
            fields.push(<img src={field}
                alt="field"
                className="field"
                style={{
                    position:'absolute',
                    left:element.x+'vw',
                    top:element.y+'vh'
                }}
                />)
        }
        
    });
    
  return (
    fields
  )
}
