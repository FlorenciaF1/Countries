import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCountries, postActivities } from '../actions/index'
import Style from '../styles/form.module.css'

function validateCreateActivity(input) {
    const error = {};
    if (!input.name || isNaN(input.name) === false) { error.name = "Se requiere de un nombre" }
    if (!input.difficulty) { error.difficulty = "Se requiere una dificultad del 1 al 5" }
    if (!input.duration) { error.duration = "Se requiere una duracion" }
    if (!input.season) { error.season = "Debe seleccionar una temporada" }
    if (!input.countries.length) { error.countries = "Debe elgir al menos un pais" }
    console.log(error)
    return error;
}

export default function ActivitiesCreate() {
    const dispatch = useDispatch()
    const history = useNavigate()
    const allCountries = useSelector((state) => state.allCountry);

    const [error, setError] = useState({});
    const [input, setInput] = useState({ // aca me creo un estado local
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: []
    })

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
        setError(validateCreateActivity({
            ...input,
            [e.target.name]: e.target.value
        }))
    };

    function handleCheck(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                season: e.target.value
            })
        }
    };

    function handleSelect(e) {
        if (!input.countries.includes(e.target.value) && e.target.value !== 'country')
            setInput({
                ...input,
                countries: [...input.countries, e.target.value]                                                                 //Concateno el valor del input
            })
    };

    function handleDelete(e) {
        setInput({
            ...input,
            countries: input.countries.filter(c => c !== e)
        })
    };

    function handleSubmit(el) {
        el.preventDefault();
        console.log(input)
        setError(validateCreateActivity(input))
        const errorcitos = validateCreateActivity(input)
        if (Object.values(errorcitos).length !== 0) { alert('Se requieren todos los campos') }
        else {
            dispatch(postActivities(input))
            alert('Actividad creada exitosamente!')
            setInput({
                name: "",
                difficulty: "",
                duration: "",
                season: "",
                countries: []
            })
            history('/home')
        }
    };

    return (
        <div className={Style.caja} ><br />
            <h1 className={Style.titulo}>Crea una nueva actividad turistica</h1>
            <form onSubmit={(e) => handleSubmit(e)} >
                <div className={Style.error}>
                    <label className={Style.fuente}>Nombre: </label>
                    <input className={Style.label} placeholder='Ej: (Surf...)' type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} />
                    {error.name && (<p>{error.name}</p>)}
                </div><br />
                <div className={Style.error}>
                    <label className={Style.fuente}>Difficulty: </label>
                    <input className={Style.label} placeholder='1 a 5' type='number' max={5} min={1} value={input.difficulty} name="difficulty" onChange={(e) => handleChange(e)} />
                    {error.difficulty && (<p>{error.difficulty}</p>)}
                </div><br />
                <div className={Style.error}>
                    <label className={Style.fuente}>Duration: </label>
                    <input className={Style.label} placeholder='Ej: (30 minutos...)' type='number' /* min="00:10" max="12:00" */ value={input.duration} name="duration" onChange={(e) => handleChange(e)} />
                    {error.duration && (<p>{error.duration}</p>)}
                </div><br />
                <div className={Style.fuente}>
                    <label >Season: </label>
                    <label><input type="radio" value="Summer" name="check" onChange={(e) => handleCheck(e)} />Summer</label>
                    <label><input type="radio" value="Autumn" name="check" onChange={(e) => handleCheck(e)} />Autumn</label>
                    <label><input type="radio" value="Winter" name="check" onChange={(e) => handleCheck(e)} />Winter</label>
                    <label><input type="radio" value="Spring" name="check" onChange={(e) => handleCheck(e)} />Spring</label>
                    <div className={Style.error}>{error.season && (<p>{error.season}</p>)}</div>
                </div><br />
                <div>
                    <select onChange={(e) => handleSelect(e)} className={Style.botones_inicio}>
                        <option value='country'>Paises...</option>
                        {allCountries.map(c =>
                            <option value={c.name}>{c.name}</option>
                        )}
                    </select>
                    {/*  {error.countries && (<p>{error.countries}</p>)} */}
                </div><br />
                {/* <ul className={Style.fuente} >{input.countries.map(e => e + ", ")}</ul> */}  {/* //  lista que agarra mi estado input y renderiza cada cosita que vaya marcando en el select */}
                {input.countries.map((el) => (<button key={el} className={Style.delete} onClick={() => handleDelete(el)}>{el} X </button>))} <br /><br />
                <div>
                    <button className={Style.button} type='submit' /* disabled={!input.name || !input.countries.length || error.duration || error.difficulty ? true : false} */>Crear actividad</button><br />
                </div><br/>
            </form>
            <Link to='/home'><button className={Style.button}>Volver</button></Link>
        </div>
    )
}