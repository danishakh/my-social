import React, { Component } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

// Components
import Post from '../../components/Post';
import NotifSnackbar from '../../components/NotifSnackbar';
import Profile from '../../components/Profile';


class Home extends Component {
    constructor() {
        super();

        this.state = {
            posts: null,
            notifOpen: false
        }
    }
    
    componentDidMount() {
        // this.setState({ notifOpen: true });
        axios.get('/posts')
            .then(res => {
                //console.log(res.data);
                this.setState({
                    posts: res.data
                })
            })
            .catch(err => console.error(err));
    }

    //TODO

    // Trigger Snackbar after Update Succesful
    // componentDidUpdate(prevProps) {
    //     console.log('componentDidUpdate')
    //     if (this.props.credentials !== prevProps.credentials) {
    //         this.setState({
    //             notifOpen: true
    //         });
    //         console.log('props updated');
    //     }
    // }

    // Snackbar Close
    handleClose = () => {
        this.setState({notifOpen: false})
    }
    
    render() {
        let latestPosts = this.state.posts ? (
            this.state.posts.map(post => <Post key={post.postId} post={post} />)
            ) : <p>Loading...</p>

        return (
            <Grid container spacing={6} justify='center' >
                <Grid item lg={3} md={3} sm={6} xs={6}>
                    <Profile />
                </Grid>
                <Grid item lg={6} md={6} sm={10} xs={10}>
                    { latestPosts }
                </Grid>

                <NotifSnackbar 
                    variant='success'
                    open={this.state.notifOpen}
                    handleClose={this.handleClose}
                    message='Update Successful!'
                    onEntered={this.focus}
                />
            </Grid>
        )
    }
}

export default Home;