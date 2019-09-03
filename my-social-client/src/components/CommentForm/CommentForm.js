import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

// Redux
import { connect } from 'react-redux'
import { submitComment } from '../../redux/actions/dataActions';

const styles = theme => ({
    ...theme.styling,
    commentTextField: {
        background: '#21202C',
        '& label.MuiInputLabel-root': {
            color: '#E3AC31'
        },
        '& label.Mui-focused': {
            color: 'rgba(254,192,56)',
        },
        '& label.Mui-error': {
            color: 'red',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'rgba(254,192,56)',
        }
    },
    commentTextFieldInput: {
        color: '#F5F5F4'
    },
    submitButton: {
        float: 'right',
        marginTop: 10,
        marginBottom: 5
    }
})

export class CommentForm extends Component {   
    constructor() {
        super()

        this.state = {
            body: '',
            errors: {}
        }
    } 

    componentDidUpdate(prevProps) {
        // Helper Function to check if an object is empty
        function isEmpty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }

        if (prevProps.ui.errors !== this.props.ui.errors) {
            if(isEmpty(this.props.ui.errors)) {
                this.setState({
                    body: '',
                    errors: {}
                });
            }
            else {
                this.setState({
                    errors: this.props.ui.errors
                });
            }
        } 
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmitHandler = e => {
        e.preventDefault();

        this.props.submitComment(this.props.postId, { body: this.state.body });
    }
    render() {
        const { authenticated, classes } = this.props;
        const { errors } = this.state;

        const commentForm = authenticated ? (
            <Grid item sm={12}>
                <form onSubmit={this.onSubmitHandler}>
                    <TextField
                        name='body'
                        type='text'
                        label='Comment here...'
                        multiline
                        rows='3'
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.onChangeHandler}
                        fullWidth
                        className={classes.commentTextField}
                        InputProps={{className: classes.commentTextFieldInput}}
                    />

                    <Button 
                        type='submit' 
                        variant='outlined' 
                        color='secondary'
                        className={classes.submitButton}
                    >
                        Submit
                    </Button>

                </form>
            </Grid>
        ) : null;

        return commentForm;
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    ui: state.ui,
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));
