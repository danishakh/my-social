import React from 'react';
import NoImg from '../images/no-img.png';
import PropTypes from 'prop-types'

// MUI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'

import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
    ...theme.styling,
    card: {
        display: 'flex',
        marginBottom: 10,
        backgroundColor: 'rgb(33,32,44)',
        border: '1px solid #71A0D4'
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: 10
    },
    image: {
        width: 80,
        height: 80,
        margin: 5,
        objectFit: 'cover'
    },
    username: {
        width: 100,
        height: 10,
        backgroundColor: theme.palette.secondary.main,
        marginBottom: 15
    },
    date: {
        height: 5,
        width: 50,
        backgroundColor: '#808080',
        marginBottom: 10
    },
    fullLine: {
        height: 15,
        width: '90%',
        marginBottom: 10,
        backgroundColor: '#c0c0c0',
    },
    halfLine: {
        height: 15,
        width: '30%',
        marginBottom: 5,
        backgroundColor: '#c0c0c0',
    }
})

const PostSkeleton = props => {
    const { classes } = props;

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <Avatar src={NoImg} alt='noImg' className={classes.image} />
            <CardContent className={classes.cardContent}>
                <div className={classes.username}></div>
                <div className={classes.date}></div>
                <div className={classes.fullLine}></div>
                <div className={classes.fullLine}></div>
                <div className={classes.halfLine}></div>
            </CardContent>
        </Card>
    ));

    return content;
}

PostSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostSkeleton)