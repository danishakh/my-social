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
        marginTop: '1%'
    },
    logoPaper: {
        borderRadius: '20px',
        backgroundColor: 'rgb(11, 10, 14)',
        maxWidth: '80%'
    },
    formPaper: {
        textAlign: 'center',
        borderRadius: '20px',
        backgroundColor: 'rgb(254, 192, 56)',
        minHeight: '70vh'
    },
    formContainer: {
        flex: '0 1 auto'
    },
    image: {
        margin: '20px auto 10px auto'
    },
    appTitle: {
        margin: '0 auto 20px auto'
    },
    textField: {
        margin: '5px auto 5px auto',
        minWidth: '50%',
        width: '75%'
    },
    button: {
        marginTop: 20,
        width: '75%'
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
                <Grid item sm={5} className={classes.paperGrid}>
                    <Grid container justify="center" alignContent="center">
                        <Grid item sm>
                            <Paper elevation={20} className={classes.logoPaper}>
                                <img src={appIcon} alt="buzzer-bee" className={classes.image} />
                            </Paper>
                        </Grid>
                    </Grid>
                    
                        <Grid item sm>
                            <Paper elevation={20} className={classes.formPaper}>
                            
                                <form noValidate onSubmit={this.onSubmitHandler}>
                                    
                                    <TextField 
                                        id="email" 
                                        name="email" 
                                        type="email" 
                                        label="Email" 
                                        variant="outlined"
                                        className={classes.textField} 
                                        value={this.state.email} 
                                        onChange={this.onChangeHandler}
                                        
                                    />

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