import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import { getCountries, orderByName, filterPopulation, filterActivities, getActivities } from '../actions/index' // filterCountriesByActivities
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginado from './Paginado';
import SearchBar from './SearchBar'
import { Continent } from './Contient'
import Style from '../styles/home.module.css'

export default function Home() {
    const dispatch = useDispatch();
    const allCountry = useSelector((state) => state.allCountry)

    const allActivities = useSelector((state) => state.activities);

    const [orden, setOrden] = useState('')

    const [currentPage, setCurrentPage] = useState(1) // estado local, inicia siempre en la pagina uno
    const [countriesPerPage, setCountriesPerPage] = useState(10) // estado local, me piden 10 paises por pagina
    const indexOfLastCountries = currentPage * countriesPerPage // indice del ultimo pais: pagina actual * cantidad de paises por pagina / 10
    const indexOfFirstCountries = indexOfLastCountries - countriesPerPage // indice del primer pais: indice del ultimo - cantidad de paises por pagina / 0
    const currentCountries = allCountry.slice(indexOfFirstCountries, indexOfLastCountries) // Divido el array entre 0 y 10 - me guarda todos los paises que voy a tener en cada pagina

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber) // setear el paginado en ese numero de pagina
    };

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getActivities());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getCountries());
    };

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1); // seteo la pagina siempre en la primera
        setOrden(`Ordenado ${e.target.value}`) // modifico estado local y renderizo
    };

    function handleSortPopulation(e) {
        e.preventDefault();
        dispatch(filterPopulation(e.target.value))
        setCurrentPage(1); // seteo la pagina siempre en la primera
        setOrden(`Ordenado ${e.target.value}`) // modifico estado local y renderizo
    };

    function handleFilterActivities(e) {
        dispatch(filterActivities(e.target.value))
        setCurrentPage(1)
    };

    return (
        <div>
            <br />
            <div className={Style.juntos}>
                <Link to='/activities'><button className={Style.botones_inicio}>Crear actividad</button></Link>
                <br /><br />
                <button onClick={e => { handleClick(e) }} className={Style.botones_inicio}>Volver a cargar</button>
                <br /><br />
            </div>
            <div>
                <div className={Style.juntitos}>
                    <select onChange={e => handleSort(e)} className={Style.botones_inicio}>
                        <option hidden> Ordenar alfabeticamente </option>
                        <option value='asc'>A - Z</option>
                        <option value='desc'>Z - A</option>
                    </select>
                    <select onChange={e => handleSortPopulation(e)} className={Style.botones_inicio}>
                        <option hidden> Ordenar por poblacion </option>
                        <option value='Mayor population'>Mayor poblacion</option>
                        <option value='Menor population'>Menor poblacion</option>
                    </select>
                    <br />
                    <br />
                    <select onChange={e => handleFilterActivities(e)} className={Style.botones_inicio}>
                        <option hidden> Filtrar por actividad </option>
                        {/*  <option value='All'/> */}
                        {allActivities.map((act) => (
                            <option key={act.name}>{act.name}</option>
                        ))}
                    </select>
                    <p>
                        <Continent
                            setCurrentPage={setCurrentPage}></Continent>
                    </p>
                </div>
                <SearchBar
                    setCurrentPage={setCurrentPage} />
                <Paginado className={Style.paginado}
                    countriesPerPage={countriesPerPage}
                    allCountry={allCountry.length}
                    paginado={paginado}
                />
                <div className={Style.cardhijo}>
                    {currentCountries?.map((el) => {
                        return (
                            <div>
                                {/* <Link to={'/home' + el.cca3}> */}
                                <Card
                                    cca3={el.cca3}
                                    image={el.image}
                                    name={el.name}
                                    continent={el.continent}
                                    subregion={el.subregion}
                                />
                                {/* </Link> */}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
};