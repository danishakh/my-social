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


const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    title: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '5px auto 5px auto'
    },
    button: {
        marginTop: 20
    },
    paper: {
        padding: 20
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
            <Grid container className={classes.form}>
                <Grid item sm={2} />
                <Grid item sm={8} >
                    <img src={appIcon} alt="buzzer-beer" className={classes.image} />
                    <Paper elevation={20}>
                        <Typography variant="h3" className={classes.title}>Login</Typography>
                        <form noValidate onSubmit={this.onSubmitHandler}>
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
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                Login
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item sm={2} />
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);