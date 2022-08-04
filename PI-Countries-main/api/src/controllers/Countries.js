const axios = require('axios');
const { Country, Activities } = require('../db');
const { v4: uuidv4 } = require("uuid");

const countries = async () => {
    const api = await axios('https://restcountries.com/v3/all');
    await api.data.map((e) => {
        Country.findOrCreate({
            where: {
                name: e.name['common'],
                cca3: e.cca3,
                image: e.flags[1],
                continent: e.continents[0],
                capital: e.capital ? e.capital[0] : 'Capital not found',
                subregion: e.subregion ? e.subregion : 'Subregion not found',
                area: e.area,
                population: e.population
            }
        })
    });
};

const getCountries = async (req, res) => {
    let { name } = req.query;
    if (name) {
        try {
            const info = await axios(`https://restcountries.com/v3/name/${name}`);
            const c = info.data[0]
            const utilInfo = [{
                name: c.name.common,
                cca3: c.cca3,
                image: c.flags[1],
                continent: c.continents[0],
                capital: c.capital ? c.capital[0] : 'Capital not found',
                subregion: c.subregion ? c.subregion : 'Subregion not found',
                area: c.area,
                population: c.population
            }]
            res.status(200).send(utilInfo)
        } catch (error) {
            res.status(404).send('No encontre ese pais!')
        }
    } else {
        const count = await Country.findAll(
            {
                include: {
                    model: Activities,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }
            }
        )
        res.status(200).send(count)
    }
};

const getCountryById = async (req, res) => {
    let { id } = req.params
    const info = await Country.findByPk(id, {
        include: {
            model: Activities,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: {
                attributes: [],
            }
        }
    });
    res.status(200).json(info)
};

const createActivity = async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body
    const activity = { name, difficulty, duration, season }
    const validate = await Activities.findOne({
        where: { name }
    })
    if (!validate) {
        const actCreate = await Activities.create(activity)
        let actDb = await Country.findAll({
            where: { name: countries }
        })
        await actCreate.addCountry(actDb) // metodo de SQL que lo que hace es traerme de la tabla lo que le pido por parametro
        res.status(200).send('Actividad creada correctamente')
    } else {
        let actCreate2 = await Country.findAll({
            where: {
                name: countries
            }
        })
        await validate.addCountry(actCreate2)
        res.status(200).send('Actividad creada correctamente')
    }
}


/*     let idv4 = uuidv4();
    const dbid = idv4.slice(0, 4); */


const getActivities = async (req, res) => {
    try {
        const activity = await Activities.findAll({
            attributes: ['id', 'name', 'difficulty', 'duration', 'season'],
            include: Country
        })
        res.status(200).send(activity)
    }
    catch (error) {
        console.log(error)
    }
};

module.exports = {
    getCountryById,
    getCountries,
    createActivity,
    countries,
    getActivities
};












/*
const getCountryById = async (req, res) => {
    let { id } = req.params
    const info = await axios.get(`https://restcountries.com/v3/alpha/${id}`);
    const c = info.data[0]
    const utilInfo = [{
        name: c.name.common,
        cca3: c.cca3,
        image: c.flags[1],
        continent: c.continents[0],
        capital: c.capital ? c.capital[0] : 'Capital not found',
        subregion: c.subregion ? c.subregion : 'Subregion not found',
        area: c.area,
        population: c.population,
        activities: await Country.findAll(
            {
                where:
                    { name: c.name.common },
                include: {
                    model: Activities,
                    attributes: ['name', 'difficulty', 'duration', 'season'],
                    through: {
                        attributes: [],
                    }
                }
            }
        )
    }]
    res.status(200).send(utilInfo)
} */