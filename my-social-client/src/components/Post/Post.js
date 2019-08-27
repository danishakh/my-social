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
import Typography  from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';


const styles = {
    card: {
        display: 'flex',
        marginBottom: 10,
        backgroundColor: 'rgb(33,32,44)',
        border: '1px solid #71A0D4',
        color: '#fff',
        '& .createdAtCaption': {
            color: 'grey',
            marginTop: 1
        }
    },
    image: {
        width: 80,
        height: 80,
        margin: 5
    },
    content: {
        padding: 10,
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
                    {/* <CardMedia 
                        component={Avatar}
                        src={userImage}
                        title="Profile Image"
                        className={classes.image}
                    /> */}
                    <Avatar src={userImage} alt={username} className={classes.image} />
                    <CardContent className={classes.content}>
                        <Typography 
                            variant="h6" 
                            component={Link} 
                            to={`/users/${username}`} 
                            color="secondary">
                            @{username}
                        </Typography> <br/>
                        <Typography variant="caption" className='createdAtCaption' >{dayjs(createdAt).fromNow()}</Typography><br/>
                        <Typography variant="body1">{body}</Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Post);
