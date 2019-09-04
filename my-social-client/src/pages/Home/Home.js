import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

// Components
import Post from '../../components/Post';
import NotifSnackbar from '../../components/NotifSnackbar';
import Profile from '../../components/Profile';
import PostSkeleton from '../../utils/PostSkeleton';

// Redux
import { connect } from 'react-redux';
import { getPosts } from '../../redux/actions/dataActions';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            notifOpen: false
        }
    }
    
    componentDidMount() {
        // this.setState({ notifOpen: true });
        this.props.getPosts();
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
        const { posts, loading } = this.props.data;

        let latestPosts = !loading ? (
           posts.map(post => <Post key={post.postId} post={post} />)
            ) : (
                <PostSkeleton />
            )

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

Home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getPosts })(Home);