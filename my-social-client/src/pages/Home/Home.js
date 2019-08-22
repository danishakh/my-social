import React, { Component } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

// Components
import Post from '../../components/Post';
import NotifSnackbar from '../../components/NotifSnackbar';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            posts: null,
            notifOpen: false
        }
    }
    
    componentDidMount() {
        this.setState({notifOpen: true});
        axios.get('/posts')
            .then(res => {
                //console.log(res.data);
                this.setState({
                    posts: res.data
                })
            })
            .catch(err => console.error(err));
    }

    // Snackbar Close
    handleClose = () => {
        this.setState({notifOpen: false})
    }
    
    render() {
        let latestPosts = this.state.posts ? (
            this.state.posts.map(post => <Post key={post.postId} post={post} />)
            ) : <p>Loading...</p>

        return (
            <Grid container spacing={6}>
                <Grid item sm={3} xs={12}>
                    Profile...
                </Grid>
                <Grid item sm={6} xs={12}>
                    { latestPosts }
                </Grid>

                <NotifSnackbar 
                    variant='success'
                    open={this.state.notifOpen}
                    handleClose={this.handleClose}
                    message='Login Successful!'
                    onEntered={this.focus}
                />
            </Grid>
        )
    }
}

export default Home;