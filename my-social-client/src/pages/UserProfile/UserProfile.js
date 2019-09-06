import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Post from '../../components/Post';
import StaticProfile from '../../components/StaticProfile';
import PostSkeleton from '../../utils/PostSkeleton';
import ProfileSkeleton from '../../utils/ProfileSkeleton';

// MUI
import Grid from '@material-ui/core/Grid'

// Redux
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/actions/dataActions'

export class UserProfile extends Component {
    constructor() {
        super();

        this.state = {
            profile: null,
            postIdParam: ''
        }
    }

    componentDidMount() {
        const username = this.props.match.params.username;

        // If notification is clicked, we want to direct to this page and the exact post in the notif
        const postId = this.props.match.params.postId;
        if (postId) {
            this.setState({ postIdParam: postId })
        }

        this.props.getUserProfile(username);

        axios.get(`/user/${username}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                });
            })
            .catch(err => console.log(err));
    }
    render() {
        const { posts, loading } = this.props.data;
        const { postIdParam } = this.state;

        // If loading
        const userPosts = loading ? (
            <PostSkeleton />
        // Else if no posts
        ) : posts === null ? (
            <p>No Posts!</p>
        // Else if no postIdParameter passed then just display the posts by this user
        ) : !postIdParam ? (
            posts.map(post => <Post key={post.postId} post={post} />)
        // Else list all the posts by this user, and open the PostDialog on the post which has a postId of postIdParameter (got that from when we click a notification)
        ) : (
            posts.map(post => {
                if(post.postId !== postIdParam)
                    return <Post key={post.postId} post={post} />
                else {
                    return <Post key={post.postId} post={post} openDialog/>
                }
            })
        )

        return (
            <Grid container spacing={6} justify='center' >
                <Grid item lg={3} md={3} sm={6} xs={6}>
                    {/* check if profile exists and has loaded */}
                    {this.state.profile === null ? (
                        <ProfileSkeleton />
                    ) : (
                        <StaticProfile profile={this.state.profile} />
                    )}
                </Grid>
                <Grid item lg={6} md={6} sm={10} xs={10}>
                    { userPosts }
                </Grid>
            </Grid>
        )
    }
}

UserProfile.propTypes = {
    getUserProfile: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getUserProfile})(UserProfile);
