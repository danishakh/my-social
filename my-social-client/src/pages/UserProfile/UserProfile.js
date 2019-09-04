import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Post from '../../components/Post';
import StaticProfile from '../../components/StaticProfile';

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

        const userPosts = loading ? (
            <p>Loading Posts...</p>
        ) : posts === null ? (
            <p>No Posts!</p>
        ) : (
            posts.map(post => <Post key={post.postId} post={post} />)
        )

        return (
            <Grid container spacing={6} justify='center' >
                <Grid item lg={3} md={3} sm={6} xs={6}>
                    {/* check if profile exists and has loaded */}
                    {this.state.profile === null ? (
                        <p>Loading Profile...</p>
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
