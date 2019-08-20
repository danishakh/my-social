import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// MUI
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';


const styles = {
    card: {
        display: 'flex',
        marginBottom: 15
    },
    image: {
        minWidth: 150
    },
    content: {
        padding: 20,
        objectFit: 'cover'      // so that your images don't stretch
    }
}

class Post extends Component {
    render() {

        dayjs.extend(relativeTime);
        const { classes, post : { body, createdAt, userImage, username, postId, likeCount, commentCount } } = this.props;
        
        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia 
                        image={userImage}
                        title="Profile Image"
                        className={classes.image}
                    />
                    <CardContent className={classes.content}>
                        <Typography 
                            variant="h6" 
                            component={Link} 
                            to={`/users/${username}`} 
                            color="primary">{username}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                        <Typography variant="body1">{body}</Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Post);
