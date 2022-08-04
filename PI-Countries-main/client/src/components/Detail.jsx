import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailCountry, setDetailCountry } from '../actions/index'
import { Link, useParams } from 'react-router-dom';
import Style from '../styles/detail.module.css'

export default function DetailCountry() {
    const { cca3 } = useParams();
    const dispatch = useDispatch();

    const country = useSelector((state) => state.stateDetailCountry);

    useEffect(() => {
        dispatch(detailCountry(cca3))
        return () => {dispatch(setDetailCountry())}
    }, [dispatch, cca3])

    return (
        <div className={Style.top}><br />
            <div className={Style.fuente}>
                <div>
                    <h4> País: {country ? country.name : 'Cargando'}</h4>
                    <h4> Id: {country ? country.cca3 : 'Cargando'}</h4>
                    <h4> Continente: {country ? country.continent : "Cargando"}</h4>
                    <h4> Subregion: {country ? country.subregion : "Cargando"}</h4>
                    <h4> Capital: {country ? country.capital : "Cargando"}</h4>
                    <h4> Area: {country ? country.area : "Cargando"}</h4>
                    <h4> Poblacion: {country ? country.population : "Cargando"}</h4>
                </div>
                <div className={Style.espaciado}>
                    <img src={country ? country.image : 'Cargando'} alt="Not Found" width="230px" height="150px" />
                    <h4> Actividades: <br />{country.activities ? country.activities.map(e => 'Nombre: ' + e.name + ', ' + 'Dificultad: ' + e.difficulty + ', ' + 'Duracion: ' + e.duration + ', ' + 'Temporada: ' + e.season + '. ') : "No hay actividades"}</h4>
                </div>
            </div>
            <div className={Style.altura}>
                <Link to='/home'>
                    <button className={Style.button}>Volver</button>
                </Link>
            </div>
        </div>
    )
}