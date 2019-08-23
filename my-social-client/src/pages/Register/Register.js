import React, { Component } from 'react'
import {Link as BrowserLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import appIcon from '../../images/buzzer.png';

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
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/userActions';


const styles = theme => ({
    ...theme.styling,
    paperGrid: {
        marginTop: '12%'
    },
    textField: {
        margin: '2px auto 2px auto',
        minWidth: '50%',
        width: '70%',
        background: 'rgb(254, 192, 56)'
    }
});



class Register extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
            notifOpen: false,
            errors: {}
        }
    }

    // Updating errors from Redux store and triggering Snackbar if needed
    componentDidUpdate(prevProps) {
        if (this.props.ui.errors !== prevProps.ui.errors) {
            this.setState({
                errors: this.props.ui.errors
            }, () => {
                if (this.props.ui.errors.error) {
                    this.setState({ notifOpen: true });
                }
            });
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

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            username: this.state.username
        }
        
        this.props.registerUser(newUserData, this.props.history);
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { classes, ui: { loading } } = this.props;
        const { errors } = this.state;

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

                                <form noValidate onSubmit={this.onSubmitHandler} className="registerForm">  
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
                                    <TextField 
                                        id="confirmPassword" 
                                        name="confirmPassword" 
                                        type="password" 
                                        label="Confirm Password" 
                                        className={classes.textField} 
                                        value={this.state.confirmPassword} 
                                        onChange={this.onChangeHandler}
                                        error={errors.confirmPassword ? true : false}
                                        helperText={errors.confirmPassword}
                                        fullWidth
                                    />
                                    <TextField 
                                        id="username" 
                                        name="username" 
                                        type="text" 
                                        label="Username" 
                                        className={classes.textField} 
                                        value={this.state.username} 
                                        onChange={this.onChangeHandler}
                                        error={errors.username ? true : false}
                                        helperText={errors.username}
                                        fullWidth
                                    />
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        className={classes.button}
                                        disabled={loading}
                                    >
                                        Register
                                        
                                        {loading && (
                                            <CircularProgress 
                                                size={30} 
                                                className={classes.progress} 
                                            />
                                        )}
                                    </Button>
                                </form>
                                <Typography style={{marginBottom: '5%'}} variant="caption" color="textSecondary">
                                    <i>Already have an account? <Link component={BrowserLink} to="/login">Login here</Link></i>
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

Register.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    ui: state.ui
});

export default connect(mapStateToProps, { registerUser })(withStyles(styles)(Register));