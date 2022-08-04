import React from "react";
import { Link } from "react-router-dom";
import Style from '../styles/card.module.css'

export default function Card({ image, name, continent, cca3 }) {
    return (
        <div className={Style.card}>
            <div className={Style.card_text}>
                <h1>{name}</h1>
                <h2>{continent}</h2>
            </div>
            <div className={Style.card_image}>
                <img src={image} alt={name} />
            </div>
            <div className={Style.card_link}>
                <Link to={`/home/${cca3}`} content={name}>
                    <button className={Style.button1}>Details</button>
                </Link>
            </div>
        </div>
    );
}