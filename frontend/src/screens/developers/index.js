import React from 'react';
import DeveloperList from './../../components/developerList';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    controllContainer: {
        backgroundColor: '#282A36',
        padding: 30,
        minHeight: "100%",
    },
}))


export default function Developers(props) {

    const classes = useStyles();
    return (
        <Container  className={classes.controllContainer}>
            <DeveloperList></DeveloperList>
        </Container>

    )
}