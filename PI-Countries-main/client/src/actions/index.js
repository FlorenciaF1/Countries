import axios from 'axios';

//--- connection ---//
//--- All countries data ---//

export function getCountries() {
    return (dispatch) => {
        return fetch('http://localhost:3001/countries')
            .then(response => response.json())
            .then(res => dispatch({
                type: "GET_COUNTRIES",
                payload: res
            }))
            .catch(error => console.error(error))
    }
};

export function getActivities() {
    return (dispatch) => {
        return fetch('http://localhost:3001/activity')
        .then(response => response.json())
        .then(res =>dispatch({
            type: 'GET_ACTIVITIES',
            payload: res
        }))
        .catch(error => console.error(error))
    }
};

export function setDetailCountry() {
    return {
        type: 'SET_DETAIL_COUNTRY',
    }
};

export function postActivities(payload) {
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/activities", payload);
        console.log(response)
        return response
    }
};

export function detailCountry(cca3) {
    return async function (dispatch) {
        try {
            const detCountry = await axios.get('http://localhost:3001/countries/' + cca3)
            return dispatch(
                {
                    type: 'DETAIL_COUNTRY',
                    payload: detCountry.data
                })
            }
            catch (error) {
                console.error(error)
            }
        }
    };

    export function filterActivities(payload) {
        return {
            type: 'FILTER_ACTIVITIES',
            payload
        }
    };

    export function filterContinent(payload) {
        return {
            type: 'FILTER_CONTINENT',
            payload
        }
    };

    export function filterPopulation(payload) {
        return {
            type: 'FILTER_POPULATION',
            payload
        }
    };

    export function orderByName(payload) {
        return {
            type: 'ORDER_BY_NAME',
            payload
        }
    };

    export function getNameCountries(name) {
        return async function (dispatch) {
            try {
                var json = await axios.get(`http://localhost:3001/countries?name=${name}`)
                return dispatch({
                    type: 'GET_NAME_COUNTRIES',
                    payload: json.data
                })
            }
            catch (error) {
                if (error.response) {
                    alert(error.response.data)
                }
            }
        }
    };












    /* export function getCountries() {
        return async function (dispatch) {
            const json = await axios.get('http://localhost:3001/countries') // me traigo todo del back
            return dispatch({
                type: 'GET_COUNTRIES',
                payload: json.data
            })
        }
    }; */
    
    /* export function getActivities() {
        return async function (dispatch) {
            var json = await axios.get('http://localhost:3001/activity')
            return dispatch({
                type: 'GET_ACTIVITIES',
                payload: json.data
            })
        }
    }; */