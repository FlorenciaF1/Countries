import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions";
import Style from '../styles/search.module.css'

function validateSearchBar(name) {
    const error = {};
    if (!name || isNaN(name) === false) { error.name = "Se requiere de un nombre" }
    return error;
}

export default function SearchBar({ setCurrentPage }) {
    const dispatch = useDispatch()
    const [error, setError] = useState({})
    const [name, setName] = useState("") // seteo estados locales

    const handleInputChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(validateSearchBar(name))
        const errores = validateSearchBar(name)
        if(Object.values(errores).length !== 0) {alert('Se requiere de un nombre')}
        else {
        dispatch(getNameCountries(name))
        setCurrentPage(1)
    }}

    return (
        <div className={Style.conteinerSearch}>
            <div >
                <input className={Style.input}
                    value={name}
                    type="text"
                    placeholder="Buscar..."
                    onChange={(e) => handleInputChange(e)}
                />
            </div>
            <div>
                <button className={Style.button} type="submit" onClick={(e) => handleSubmit(e)}>🔎</button>
            </div>
        </div>
    )
}