import React from 'react';
import {
    makeStyles,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button
} from "@material-ui/core";

import MaleImg from './../../assets/male.png';
import FemaleImg from './../../assets/female.png';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeveloperForm from './../developerForm';
import api from './../../services/api';
import Swal from 'sweetalert2';

const useStyles = makeStyles(theme => ({
    card: {
        backgroundColor: '#44475A',
        border: 'solid 2px #F8F8F2',
        borderRadius: '5px',
        margin: '1rem'

    },
    cardDivTitle: {
        backgroundColor: '#F8F8F2',
        borderRadius: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        margin: 0,
        padding: '.5rem 0',
        fontSize: '1.5rem',
        color: '#282A36',
    },
    cardMedia: {
        height: 140,
        backgroundSize: 'contain',
    },
    cardInfo: {
        backgroundColor: '#282A36',
        borderTop: 'solid 2px #F8F8F2'
    },
    cardInfoAttribute: {
        color: '#BD93F9',
        fontWeight: 'bolder'
    },
    cardInfoValue: {
        color: '#50FA7B'
    },
    cardAction: {
        backgroundColor: '#282A36',
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    cardActionButton: {
        backgroundColor: '#F8F8F2'
    },
}))


export default function DeveloperCard(props) {
    const { id, name, age, gender, hobby, birthDate,reload } = props;
    const classes = useStyles();

    async function deleteDeveloper(id) {
        Swal.fire({
            icon: 'question',
            title: 'Deletar Desenvolvedor ?',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            showLoaderOnConfirm: true,
            preConfirm: (result) => {
                return new Promise(async (resolve, reject) => {
                    let resultDelete = await api.delete(`developers/${id}`);
                    resolve(resultDelete.data);
                });

            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {

                Swal.fire({
                    icon: 'success',
                    html: result.value.message,
                });
                reload();

            }
        }).catch(error =>{
            console.log(error);
        });
    }
    return (

        <Grid item xs={3}>
            <Card className={classes.card}>
                <CardContent>
                    <div className={classes.cardDivTitle}>
                        <Typography className={classes.cardTitle}>
                            {name}
                        </Typography>
                    </div>
                </CardContent>
                <CardMedia
                    className={classes.cardMedia}
                    image={gender === 'M' ? MaleImg : FemaleImg}
                />
                <CardContent className={classes.cardInfo}>
                    <Typography >
                        <span className={classes.cardInfoAttribute}>Idade: </span>
                        <span className={classes.cardInfoValue}>{age}</span>
                    </Typography>
                    <Typography >
                        <span className={classes.cardInfoAttribute}>Data nascimento: </span>
                        <span className={classes.cardInfoValue}>{birthDate}</span>
                    </Typography>
                    <Typography >
                        <span className={classes.cardInfoAttribute}>Hobby: </span>
                        <span className={classes.cardInfoValue}>{hobby}</span>
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardAction}>
                    <Button size="medium" className={classes.cardActionButton} onClick={() => deleteDeveloper(id)}><DeleteForeverIcon /></Button>
                    <DeveloperForm card uuid={id} reload={reload}/>
                </CardActions>
            </Card>
        </Grid>

    )
}


