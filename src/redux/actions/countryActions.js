import config from "../../config/covidApiConfig";
import axios from "axios";
import dateformat from "dateformat";

export const setCountry = (country) => (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    const userId = getState().firebase.auth.uid
    firebase.database().ref(`${userId}`).set({
        country: country
    })
    dispatch({
        type: "setCountry",
        payload: country
    })
}

const sortCountries = (a, b) => {
    return (a.name < b.name) ? -1 : (b.name < a.name) ? 1 : 0
}

export const addSelectedCountry = (country) => {
    return {
        type: "addSelectedCountry",
        payload: country
    }
}

export const removeSelectedCountry = (country) => {
    return {
        type: "removeSelectedCountry",
        payload: country
    }
}

export const addWatchCountry = (country) => {
    return {
        type: "addWatchCountry",
        payload: country
    }
}

export const removeWatchCountry = (country) => {
    return {
        type: "removeWatchCountry",
        payload: country
    }
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
        const obj = sortedCountries.reduce((obj, item) => (obj[item.iso] = item.name, obj), {})
        dispatch({
            type: "getListOfCountries",
            payload: obj
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
            if (aggregatedData.confirmed === 0) {
                dispatch({
                    type: "getCurrentData",
                    payload: [country, null]
                })
            }
            else {
                dispatch({
                    type: "getCurrentData",
                    payload: [country, aggregatedData]
                })
            }
        }
        catch (e) {
            dispatch({
                type: "countryError",
                payload: e.message
            })
        }
    }

}

export const getMonthlyData = (country) => async (dispatch, getState) => {
    if (!getState().country.monthlyData[country]) {
        dispatch({ type: "startSearchMonthlyData" })
        const date = new Date()
        date.setDate(date.getDate() - 1)
        let options = {
            method: "GET",
            url: config.countryUrl,
            params: {
                iso: country,
                date: ""
            },
            headers: config.headers
        }
        try {
            const monthlyData = {};
            for (let i = 0; i < 15; i++) {
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
                date.setDate(date.getDate() - 2)
            }
            dispatch({
                type: "getMonthlyData",
                payload: [country, monthlyData]
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

export const getSixMonthData = (country) => async (dispatch, getState) => {
    if (!getState().country.sixMonthData[country]) {
        dispatch({ type: "startSearchSixMonthData" })
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
            const sixMonthData = {};
            for (let i = 0; i < 15; i++) {
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
                sixMonthData[date] = aggregatedData
                date.setDate(date.getDate() - 12)
            }
            dispatch({
                type: "getSixMonthData",
                payload: [country, sixMonthData]
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

