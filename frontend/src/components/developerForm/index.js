import React, { useState, useEffect } from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CreateIcon from '@material-ui/icons/Create';
import {
    makeStyles,
    IconButton,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import DateMask from './../../tools/mask/dateMask';
import api from './../../services/api';
import Swal from 'sweetalert2';
import {validDate} from './../../tools/validDate';

const useStyles = makeStyles(theme => ({
    iconAdd: {
        color: '#50FA7B',
        fontSize: "2.8rem",
    },
    dialogColor: {
        backgroundColor: '#F8F8F2',
    },
    dialogTitle: {
        fontSize: '2.5rem',
        color: '#282A36',
        textAlign: 'center'
    },
    buttonAdd: {
        color: '#282A36',
        backgroundColor: '#F8F8F2'
    },
    buttonCancel: {
        backgroundColor: '#ff5555',
        color: '#282A36',
        fontWeight: 'bolder',
        width: '50%'
    },
    buttonSave: {
        backgroundColor: '#50fa7b',
        color: '#282A36',
        fontWeight: 'bolder',
        width: '50%'
    },
    gridButton: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

export default function DeveloperForm(props) {

    const classes = useStyles();
    const { uuid, card = false, reload } = props;
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [nameErrorText, setNameErrorText] = useState('');
    const [gender, setGender] = useState('M');
    const [hobby, setHobby] = useState('');
    const [hobbyError, setHobbyError] = useState('');
    const [hobbyErrorText, setHobbyErrorText] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [birthDateError, setBirthDateError] = useState('');
    const [birthDateErrorText, setBirthDateErrorText] = useState('');

    useEffect(() => {
        if (open) {
            setName('');
            setGender('M');
            setHobby('');
            setBirthDate('')

            uuid && findDeveloper();
        }
    }, [open])

    const handleOpen = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function validFilds() {
        let valid = true;

        if (name === '') {
            setNameError(true);
            setNameErrorText(`Campo obrigatorio`)
        } else {
            setNameError(false);
        }

        if (hobby === '') {
            setHobbyError(true);
            setHobbyErrorText(`Campo obrigatorio`)
        } else {
            setHobbyError(false);
        }

        if (birthDate === '') {
            setBirthDateError(true);
            setBirthDateErrorText(`Campo obrigatorio`)
        } else if(!validDate(birthDate)) {
            setBirthDateError(true);
            setBirthDateErrorText(`Data Invalida`)
        }else{
            setBirthDateError(false);
        }

        return valid;

    };

    async function save() {
        let resultSave;

        if (!validFilds()) {

            Swal.fire({
                icone: 'error',
                title: 'Campos Inválidos',
            });
            return
        }

        if (uuid) {
            resultSave = await api.put(`/developers/${uuid}`, { name, gender, hobby, birthDate })
        } else {
            resultSave = await api.post('/developers', { name, gender, hobby, birthDate })
        }

        if (resultSave.status === 201 || resultSave.status === 200) {
            setOpen(false);
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Desenvolverdor Salvo !!'
            });
            reload();
        }

    }

    function cancel() {
        setOpen(false);
    }

    async function findDeveloper() {
        try {
            const resultDeveloper = await api.get(`/developers/${uuid}`);
            if (resultDeveloper.status === 200) {
                setName(resultDeveloper.data.developer[0].nome);
                setGender(resultDeveloper.data.developer[0].sexo);
                setHobby(resultDeveloper.data.developer[0].hobby);
                setBirthDate(resultDeveloper.data.developer[0].datanascimento);
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>

            {card ?
                <Button
                    size="medium"
                    className={classes.buttonAdd}
                    onClick={(e) => handleOpen(e)}><CreateIcon /></Button> :
                <IconButton aria-label="alterar" onClick={(e) => handleOpen(e)}>
                    <AddCircleIcon className={classes.iconAdd} />
                </IconButton>}


            <Dialog

                fullWidth={true}
                open={open}
                onClose={handleClose}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle className={classes.dialogColor} id="customized-dialog-title" onClose={handleClose}>
                    <Typography className={classes.dialogTitle}>
                        DEV's
                    </Typography>
                </DialogTitle>
                <DialogContent className={classes.dialogColor} dividers="true">
                    <form>
                        <TextField
                            className={classes.textField}
                            label="Nome"
                            fullWidth
                            value={name}
                            error={nameError}
                            helperText={nameError && nameErrorText}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <FormControl
                            fullWidth
                        >
                            <InputLabel >
                                Tipo Documento
                            </InputLabel>
                            <Select
                                value={gender}
                                onChange={e => setGender(e.target.value)}
                            >
                                <MenuItem value={'M'}>Masculino</MenuItem>
                                <MenuItem value={'F'}>Feminino</MenuItem>

                            </Select>
                        </FormControl>
                        <TextField
                            className={classes.textField}
                            label="Hobby"
                            fullWidth
                            value={hobby}
                            error={hobbyError}
                            helperText={hobbyError && hobbyErrorText}
                            onChange={(e) => setHobby(e.target.value)}
                        />
                        <TextField
                            className={classes.textField}
                            label="Data Nascimento"
                            fullWidth
                            value={birthDate}
                            error={birthDateError}
                            helperText={birthDateError && birthDateErrorText}
                            onChange={(e) => setBirthDate(e.target.value)}
                            InputProps={{
                                inputComponent: DateMask,
                            }}
                        />
                    </form>
                </DialogContent>
                <DialogActions className={classes.dialogColor}>
                    <Grid container>
                        <Grid item xs={6} className={classes.gridButton}>
                            <Button
                                className={classes.buttonCancel}
                                variant="contained"
                                color="secondary"
                                type="button"
                                onClick={cancel}
                                fullWidth
                            >
                                Cancelar
                      </Button>
                        </Grid>
                        <Grid item xs={6} className={classes.gridButton}>
                            <Button
                                className={classes.buttonSave}
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={save}
                                fullWidth
                            >
                                Salvar
                      </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    );
}