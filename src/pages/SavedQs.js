import * as React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Question from '../components/Question';
import Footer from '../components/Footer';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRight: '2px solid #fff',
        backgroundColor: '#72A0C1'
    },

    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        margin: theme.spacing(5)
    },
    bio: {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '300',
        color: 'black',
        padding: '20px'
    },
    subtitle: {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '500',
        color: 'black',
        padding: '20px',
        textAlign: 'center'
    },
    paperStyle: {
        display: 'flex',
        margin: '20px',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    boxStyle: {
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '700',
        color: 'white',
        backgroundColor: '#72A0C1'
    },
}));

function SavedQs() {
    const [popSavedQs, setPopSavedQs] = React.useState('');
    const [token, setToken] = React.useState(localStorage.getItem('token'));

    const classes = useStyles();
    const guest = !token;

    React.useEffect(
        function () {
            populateSavedQs();
            if (!!token) {
                localStorage.setItem('token', token);
            } else {
                localStorage.removeItem('token');
            }
        },
        [token]
    );

    // populates questions from the users fav
    const populateSavedQs = () => {
        axios
            .post('/api/SavedQ', {}, { headers: { Authorization: "Bearer " + token }})
            .then((res) => setPopSavedQs(res.data))
            .catch((err) => console.log(err));
    };

    return (
        <div style={{ width: '100%' }} className={classes.root}>
            <div className={classes.root}>
                <br />
                {guest ? (
                    <>
                        <Paper elevation={3} className={classes.paperStyle}>
                            <Typography
                                variant='subtitle'
                                className={classes.bio}>
                                <h2>Favorites</h2>
                            </Typography>
                            <Typography variant='h6'>
                                You don't have an account.
                            </Typography>
                        </Paper>
                    </>
                ) : (
                    <>
                        <Paper elevation={3} className={classes.paperStyle}>
                            <Typography
                                variant='subtitle'
                                className={classes.bio}>
                                <h2>Favorites</h2>
                            </Typography>
                        </Paper>
                    </>
                )}
                <div>
                    <br />
                    {popSavedQs.length > 0 ? (
                        <>
                            <Box className={classes.boxStyle}>
                                {popSavedQs.map((qa) => (
                                    <>
                                        <Question
                                            key={qa._id}
                                            question={qa.question}
                                            answer={qa.answer}
                                            id={qa._id}
                                        />
                                    </>
                                ))}
                            </Box>
                        </>
                    ) : (
                        <>
                            <Typography variant='h6'>
                                You don't have any saved questions. :c
                            </Typography>
                        </>
                    )}
                </div>
                <Footer />
            </div>
        </div>
    );
}
export default SavedQs;
