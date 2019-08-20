import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import appIcon from '../../images/buzzer.png';

// MUI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
        position: 'relative'
    },
    image: {
        margin: '20px auto 10px auto'
        },
    textField: {
        margin: '10px auto 5px auto',
        minWidth: '50%',
        width: '70%'
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
            errors: {}
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        console.log('submitted');
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container className={classes.windowContainer} direction="row" justify="center" alignContent="center">
                <Grid item sm={3} />
                <Grid item sm={4} className={classes.paperGrid}>
                        <Grid item sm>
                            <Paper elevation={20} className={classes.formPaper}>
                                <Paper elevation={20} className={classes.logoPaper}>
                                    <img src={appIcon} alt="buzzer-bee" className={classes.image} />
                                </Paper>

                                <Typography variant="h3" className="appTitle">buzzer</Typography>

                                <form noValidate onSubmit={this.onSubmitHandler} className="loginForm">
                                    
                                    <TextField 
                                        id="email" 
                                        name="email" 
                                        type="email" 
                                        label="Email" 
                                        className={classes.textField} 
                                        value={this.state.email} 
                                        onChange={this.onChangeHandler}
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
                            </Paper>
                        </Grid>
                    
                    {/* <Paper elevation={20} className={classes.formPaper}>
                        <Grid container justify="center" alignContent="center">
                            <Grid item sm>
                                <Paper elevation={20} className={classes.logoPaper}>
                                    <img src={appIcon} alt="buzzer-bee" className={classes.image} />
                                </Paper>
                            </Grid>
                        </Grid>
                        
                        <form noValidate onSubmit={this.onSubmitHandler}>
                            <Grid className={classes.formContainer} container direction="column" justify="flex-end" alignContent="stretch">
                                <Grid item sm={8}>
                                <TextField 
                                    id="email" 
                                    name="email" 
                                    type="email" 
                                    label="Email" 
                                    className={classes.textField} 
                                    value={this.state.email} 
                                    onChange={this.onChangeHandler}
                                    fullWidth
                                />
                                </Grid>
                                <Grid item sm={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >
                                    Login
                                </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper> */}
                </Grid>
                <Grid item sm={3} />
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);