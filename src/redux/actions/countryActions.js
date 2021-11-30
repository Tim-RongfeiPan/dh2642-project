import config from "../../config/covidApiConfig";
import axios from "axios";
import dateformat from "dateformat";


export const setCountry = (country) => {
    return {
        type: "setCountry",
        payload: country
    }
}

const sortCountries = (a, b) => {
    return (a.name < b.name) ? -1 : (b.name < a.name) ? 1 : 0
}

export const getListOfCountries = () => async dispatch => {
    const options = {
        method: "GET",
        url: config.regionsUrl,
        params: {},
        headers: config.headers
    }
    try {
        const response = await axios.request(options)
        const sortedCountries = response.data.data.sort(sortCountries)
        dispatch({
            type: "getListOfCountries",
            payload: sortedCountries
        })
    }
    catch (e) {
        dispatch({
            type: "countryError",
            payload: e.message
        })
    }
}

export const getCurrentData = (country) => async (dispatch, getState) => {
    if (!getState().country.currentData[country]) {
        dispatch({ type: "startSearchCurrentData" })
        const options = {
            method: "GET",
            url: config.countryUrl,
            params: { iso: country },
            headers: config.headers
        }
        try {
            const response = await axios.request(options)
            const aggregatedData = {
                confirmed: 0,
                deaths: 0,
                confirmed_diff: 0,
                deaths_diff: 0
            }
            response.data.data.forEach((region) => {
                aggregatedData.confirmed += region.confirmed;
                aggregatedData.deaths += region.deaths;
                aggregatedData.confirmed_diff += region.confirmed_diff;
                aggregatedData.deaths_diff += region.deaths_diff;
            })
            dispatch({
                type: "getCurrentData",
                payload: aggregatedData
            })
        }
        catch (e) {
            dispatch({
                type: "countryError",
                payload: e.message
            })
        }
    }

}

export const getMonthlyData = (country) => async dispatch => {
    dispatch({ type: "startSearchMonthlyData" })
    const date = new Date()
    date.setDate(date.getDate() - 1)
    let options = {
        method: "GET",
        url: config.countryUrl,
        params: {
            iso: country,
            date: dateformat(date, "isoDate")
        },
        headers: config.headers
    }
    try {
        const monthlyData = {};
        for (let i = 0; i < 30; i++) {
            date.setDate(date.getDate() - 1)
            options = { ...options, params: { ...options.params, date: dateformat(date, "isoDate") } }
            const response = await axios.request(options)
            const aggregatedData = {
                confirmed: 0,
                deaths: 0,
                confirmed_diff: 0,
                deaths_diff: 0
            }
            response.data.data.forEach((region) => {
                aggregatedData.confirmed += region.confirmed;
                aggregatedData.deaths += region.deaths;
                aggregatedData.confirmed_diff += region.confirmed_diff;
                aggregatedData.deaths_diff += region.deaths_diff;
            })
            monthlyData[date] = aggregatedData
        }
        dispatch({
            type: "getMonthlyData",
            payload: monthlyData
        })
    }
    catch (e) {
        dispatch({
            type: "countryError",
            payload: e.message
        })
    }
}