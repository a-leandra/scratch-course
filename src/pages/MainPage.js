import React from 'react';
import './main_page_style.css';
import video from '../assets/Scratch.mp4';

export default class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {x:5, y:5};
    }
    onMouseMove = (e) => {
        this.setState({ x: 5, y: 5});
        console.log(this.state);
    }
    render() {
        return (
        <div>
            <video 
                muted loop autoPlay
                alt="Mapa"
                style={{
                    position:'absolute',
                    left:0+'vw',
                    top:0+'vh',
                    width:'100%',
                    height:'100%',
                    objectFit:'cover'
                }}>
                    <source src={video}
                        type='video/mp4'/>
                </video>
                <div 
                    onMouseMove={this.onMouseMove}
                    style = {{
                        position:'absolute',
                        left:0+'vw',
                        top:0+'vh',
                        width:'100%',
                        height:'100%',
                        background:'#201057e5',
                    }}/>
                <header> 
                        <h2
                        style={{
                            textShadow: `${this.state.x}px ${this.state.y}px 1px #7aff8ad0, ${-this.state.x}px ${-this.state.y}px 1px #7a8affd0, ${this.state.x}px ${-this.state.y}px 1px #be7ac0d0, ${-this.state.x}px ${this.state.y}px 1px #eeca60d0`
                        }}>
                            Kurs Scratcha
                        </h2>
                        <div className='subtitle'>
                            <h3>
                                Witaj, Mały Programisto!
                            </h3>
                            <h4>
                                Rozpocznij przygodę z programowaniem już dziś
                            </h4>
                        </div>
                        
                        <a href='./zaloguj' className='startBtn'>ZACZYNAMY</a>
                    </header>
            </div>
        )
    }
}