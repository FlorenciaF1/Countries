const initialState = {
    allCountry: [],
    setCountry: [], // estado global 
    activities: [],
    stateDetailCountry: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_COUNTRIES':
            return {
                ...state,
                allCountry: action.payload,
                setCountry: action.payload
            }

        case 'DETAIL_COUNTRY':
            return {
                ...state,
                stateDetailCountry: action.payload,
            }

        case 'SET_DETAIL_COUNTRY':
            return {
                ...state,
                stateDetailCountry: []
            }

        case 'GET_NAME_COUNTRIES':
            return {
                ...state,
                allCountry: action.payload,
            }

        case 'POST_ACTIVITIES':
            return {
                ...state,
            }

        case 'FILTER_CONTINENT':
            const allContinents = state.setCountry
            const filterContinent = action.payload === 'All' ? allContinents : allContinents.filter(e => e.continent === action.payload)
            return {
                ...state,
                allCountry: filterContinent
            }

        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ?
                state.allCountry.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.allCountry.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                allCountry: sortedArr
            }

        case 'FILTER_POPULATION':
            let filterPopulation = action.payload === 'Menor population' ?
                state.allCountry.sort(function (a, b) {
                    if (a.population > b.population) {
                        return 1;
                    }
                    if (b.population > a.population) {
                        return -1;
                    }
                    return 0;
                }) :
                state.allCountry.sort(function (a, b) {
                    if (a.population > b.population) {
                        return -1;
                    }
                    if (b.population > a.population) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                allCountry: filterPopulation
            }

        case 'GET_ACTIVITIES':
            return {
                ...state,
                activities: action.payload
            }

        case 'FILTER_ACTIVITIES':
            const allCountries = state.setCountry
            const filterAct = action.payload === "All" ? allCountries.filter(c => c.activities.length > 0)
                : allCountries.filter(c => c.activities && c.activities.map(a => a.name).includes(action.payload))
            console.log(filterAct)
            return {
                ...state,
                allCountry: filterAct
            }

        default:
            return {
                ...state,
            }
    }
}
export default rootReducer;