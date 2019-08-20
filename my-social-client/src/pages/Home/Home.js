import React, { Component } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

// Components
import Post from '../../components/Post';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            posts: null
        }
    }
    
    componentDidMount() {
        axios.get('/posts')
            .then(res => {
                //console.log(res.data);
                this.setState({
                    posts: res.data
                })
            })
            .catch(err => console.error(err));
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
            </Grid>
        )
    }
}

export default Home;