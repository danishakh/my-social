import React, { Component } from 'react'
import {Link as BrowserLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import appIcon from '../../images/buzzer.png';
import axios from 'axios';

// Components
import NotifSnackbar from '../../components/NotifSnackbar';

// MUI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import withStyles from '@material-ui/core/styles/withStyles';
import { minWidth } from '@material-ui/system';


const styles = {
    windowContainer: {
        textAlign: 'center',
        marginTop: 50
    },
    paperGrid: {
        marginTop: '15%'
    },
    logoPaper: {
        borderRadius: '10px',
        backgroundColor: 'rgb(11, 10, 14)',
        minWidth: '75%',
        position: 'absolute',
        left: '12.5%',
        top: '-15%'
    },
    formPaper: {
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: 'rgb(254, 192, 56)',
        minHeight: '100%',
        minWidth: '100%',
        position: 'relative',
        paddingBottom: '5%'
    },
    image: {
        margin: '20px auto 10px auto'
    },
    textField: {
        margin: '5px auto 5px auto',
        minWidth: '50%',
        width: '70%',
        background: 'rgb(254, 192, 56)'
    },
    button: {
        marginTop: 20,
        width: '70%'
    }
}



class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            loading: false,
            notifOpen: false,
            errors: {}
        }
    }

    // Snackbar Close
    handleClose = () => {
        this.setState({notifOpen: false})
    }

    // Form Submit
    onSubmitHandler = (e) => {
        e.preventDefault();

        this.setState({
            loading: true
        });

        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/login', userData)
            .then(res => {
                console.log(res.data);
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false,
                    notifOpen: true
                });
            })
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;

        return (
            <Grid container className={classes.windowContainer} direction="row" justify="center" alignContent="center">
                <Grid item sm={2} md={4} />
                <Grid item sm={8} md={4} className={classes.paperGrid}>
                        <Grid item sm>
                            <Paper elevation={20} className={classes.formPaper}>
                                <Paper elevation={20} className={classes.logoPaper}>
                                    <img src={appIcon} alt="buzzer-bee" className={classes.image} />
                                </Paper>

                                <Typography style={{fontFamily: '"Long Cang", cursive'}} variant="h3" className="appTitle">buzzer</Typography>

                                <form noValidate onSubmit={this.onSubmitHandler} className="loginForm">  
                                    <TextField 
                                        id="email" 
                                        name="email" 
                                        type="email" 
                                        label="Email"
                                        className={classes.textField} 
                                        value={this.state.email} 
                                        onChange={this.onChangeHandler}
                                        error={errors.email ? true : false}
                                        helperText={errors.email}
                                        fullWidth
                                    />
                                    <TextField 
                                        id="password" 
                                        name="password" 
                                        type="password" 
                                        label="Password" 
                                        className={classes.textField} 
                                        value={this.state.password} 
                                        onChange={this.onChangeHandler}
                                        error={errors.password ? true : false}
                                        helperText={errors.password}
                                        fullWidth
                                    />
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        className={classes.button}
                                    >
                                        Login
                                    </Button>
                                </form>
                                <Typography style={{marginBottom: '5%'}} variant="caption" color="textSecondary">
                                    <i>Don't have an account yet? <Link component={BrowserLink} to="/register">Register here</Link></i>
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                <Grid item sm={2} md={4} />


                <NotifSnackbar 
                    variant='error'
                    open={this.state.notifOpen}
                    handleClose={this.handleClose}
                    message={errors.error}
                    onEntered={this.focus}
                />
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);