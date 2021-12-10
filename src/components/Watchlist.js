import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentData, getListOfCountries } from '../redux/actions/countryActions'
import { Grid, Card, CardContent, CardActions, Typography, Button, CircularProgress } from '@mui/material'
import Carousel from 'react-material-ui-carousel';
import { height } from '@mui/system'


const Watchlist = ({
    uid,
    watchlist,
    currentData,
    listOfCountries,
    getListOfCountries,
    getCurrentData,
    loadingCurrent
}) => {
    useEffect(() => {
        !listOfCountries && getListOfCountries();
        watchlist.forEach(country => getCurrentData(country))
    }, []);

    if (!uid) {
        return (
            <div>Log in to add countries to your watchlist and display them on the homepage</div>
        )
    }

    return (
        <div>
            {!listOfCountries?
                <div></div>:
                !watchlist?
                    <div></div>:
                    <div>
                        <Carousel   className='watchlist' stopAutoPlayOnHover={true} interval={5000} animation={"slide"} navButtonsAlwaysVisible={true}
                                    navButtonsProps={{ style: { backgroundColor: "#6271a3", opacity: 0.2 }}}
                        >
                            {watchlist.map(wKey => {
                                return (
                                    <Card className='watchlistCard'>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                                {listOfCountries[wKey]}
                                            </Typography>

                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                <table>
                                                    <tr>
                                                        <td>Confirmed cases: </td>
                                                        <td>TODO</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Vaccinated: </td>
                                                        <td>TODO</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Deaths: </td>
                                                        <td>TODO</td>
                                                    </tr>
                                                </table>
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Card>
                                )
                            })}
                        </Carousel>

                        <Link to="/account">Modify watchlist</Link>
                    </div>

                    
                    // <div>
                    //     {watchlist.map(country => (
                    //         <div>
                    //             {listOfCountries[country]}<br />
                    //             {/* {loadingCurrent ? <CircularProgress /> : currentData[country].deaths} */}
                    //         </div>
                    //     ))}
                    //     <Link to="/account">Modify watchlist</Link>
                    // </div>
            }
        </div>
    )
}



const mapStateToProps = (state) => {
    return {
        uid: state.firebase.auth.uid,
        watchlist: state.watchlist.watchlist,
        currentData: state.country.currentData,
        listOfCountries: state.country.listOfCountries,
        loadingCurrent: state.country.loadingCurrent
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListOfCountries: () => dispatch(getListOfCountries()),
        getCurrentData: (country) => dispatch(getCurrentData(country))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
