import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { getCurrentData, setCountry } from '../redux/actions/countryActions';
import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Paper } from '@mui/material';

const CountryComparisonTable = ({
    selectedCountries,
    listOfCountries,
    loadingCurrent,
    currentData,
    getCurrentData,
    setCountry
}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Country</TableCell>
                        <TableCell>Confirmed</TableCell>
                        <TableCell>Confirmed/Capita</TableCell>
                        <TableCell>Vaccinated</TableCell>
                        <TableCell>Vaccinated/Capita</TableCell>
                        <TableCell>Deaths</TableCell>
                        <TableCell>Deaths/Capita</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {selectedCountries.map(scKey => {
                        setCountry(scKey);
                        getCurrentData(scKey);
                        if (currentData[scKey]) {
                            return (
                                <TableRow>
                                    <TableCell>{listOfCountries[scKey]}</TableCell>
                                    <TableCell>{currentData[scKey].confirmed}</TableCell>
                                    <TableCell>TODO</TableCell>
                                    <TableCell>TODO</TableCell>
                                    <TableCell>TODO</TableCell>
                                    <TableCell>{currentData[scKey].deaths}</TableCell>
                                    <TableCell>TODO</TableCell>
                                </TableRow>)
                        }
                    }
                    )}
                </TableBody>
            </Table>
        </TableContainer >
    )
}

const mapStateToProps = state => {
    return {
        selectedCountries: state.country.selectedCountries,
        listOfCountries: state.country.listOfCountries,
        currentData: state.country.currentData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCountry: (country) => dispatch(setCountry(country)),
        getCurrentData: (country) => dispatch(getCurrentData(country))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryComparisonTable)