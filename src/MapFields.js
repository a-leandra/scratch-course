import React from 'react'
import field from './assets/field.png'
import fieldCurrent from './assets/fieldCurrent.png'
import fieldActive from './assets/fieldActive.png'

export default function MapFields({coordinates}) {
    const fields = [];
    console.log(coordinates);
    coordinates.forEach(element => {
        if (element.current) {
            fields.push(<img src={fieldCurrent}
                style={{
                    position:'absolute',
                    left:element.x+'vw',
                    top:element.y+'vw'
                }}
                />)
        }
        else if (element.active) {
            fields.push(<img src={fieldActive}
                style={{
                    position:'absolute',
                    left:element.x+'vw',
                    top:element.y+'vw'
                }}
                />)
        }
        else {
            fields.push(<img src={field}
                style={{
                    position:'absolute',
                    left:element.x+'vw',
                    top:element.y+'vw'
                }}
                />)
        }
        
    });
    
  return (
    fields
  )
}
