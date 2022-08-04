import React from 'react';
import { Link } from 'react-router-dom'
import Style from '../styles/landing.module.css'

export default function LandingPage() {
    return (
        <div className={Style.titulo}>
            <h1>Bienvenidos</h1>
            <Link to='/home'>
                <button className={Style.button1}>Ingresar</button>
            </Link>
        </div>
    )
}
