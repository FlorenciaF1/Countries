import React from "react";
import { useSelector } from "react-redux";
import { getCountries, filterContinent } from "../actions";
import { useDispatch } from "react-redux";
import Style from '../styles/home.module.css'

export function Continent({ setCurrentPage }) {
    const dispatch = useDispatch();
    let all_Countries = useSelector((state) => state.setCountry);
    let all_Continents = all_Countries.map(e => e.continent);
    let allContinent = new Set(all_Continents);
    let continent = [];
    continent = [...allContinent]

    function handleChange(c) {
        c.preventDefault()
        dispatch(filterContinent(c.target.value))
        setCurrentPage(1)
    }

    return (
        <nav>
            <select onChange={c => handleChange(c)} className={Style.botones_inicio}>
                <option value='All'>Filtrar por continente</option>
                {
                    continent.map(e =>
                        <option key={e.toString()} value={e}>{e}</option>)
                }
            </select>
        </nav>
    )
}