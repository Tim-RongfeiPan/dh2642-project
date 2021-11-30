import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { setCountry, getCurrentData, getListOfCountries } from '../redux/actions/countryActions';

const DropDown = ({
    countries,
    getListOfCountries,
    getCurrentData,
    setCountry,
}) => {
    useEffect(() => {
        if (countries)
            return;
        getListOfCountries()
    }, [])
    return (
        <div>
            {!countries ? <div></div>
                : <select
                    id="dropdown"
                    onChange={e => {
                        setCountry(e.target.value)
                        getCurrentData(e.target.value)
                    }}>
                    <option hidden></option>
                    {countries.map(c => (
                        <option key={c.name} value={c.iso}>{c.name}</option>
                    ))}
                </select>}
        </div >
    )
}

const mapStateToProps = state => {
    return {
        countries: state.country.listOfCountries,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getListOfCountries: () => dispatch(getListOfCountries()),
        setCountry: (country) => dispatch(setCountry(country)),
        getCurrentData: (country) => dispatch(getCurrentData(country))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown)
