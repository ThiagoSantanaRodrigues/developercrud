import React, { useState, useEffect } from 'react'
import FilterListIcon from '@material-ui/icons/FilterList';
import {
    makeStyles,
    IconButton,
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
import { validDate } from './../../tools/validDate';

const useStyles = makeStyles(theme => ({
    iconFilter: {
        color: '#50FA7B',
        fontSize: "2.8rem",
    },
    dialogTitle: {
        fontSize: '2.5rem',
        color: '#282A36',
        textAlign: 'center'
    },
    dialogActions: {
        display: 'flex',
        justifyContent: 'center'
    },
    buttonFilter: {
        backgroundColor: '#50fa7b',
        color: '#282A36',
        fontWeight: 'bolder',
        width: '50%'
    },
    chip: {
        margin: '1rem'
    }
}))

export default function DeveloperFilters(props) {

    const classes = useStyles();
    const { addFilter } = props;
    const [open, setOpen] = useState(false);
    const [filterList] = useState({ age: 'idade', hobby: 'hobby', birthDate: 'Data Nascimento', gender: 'sexo' });
    const [filter, setFilter] = useState('gender');
    const [valueFilter, setValueFilter] = useState('');
    const [valueFilterError, setValueFilterError] = useState(false);
    const [valueFilterErrorText, setValueFilterErrorText] = useState('');

    useEffect(() => {
        filter === 'gender' ? setValueFilter('M') : setValueFilter('');
    }, [filter])

    useEffect(() => {
        if (open) {
            setFilter('age');
            setValueFilter('');
        }
    }, [open])

    const handleOpen = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function sendFilter() {
        if (validFilds()) {
            addFilter(filter, valueFilter);
            setOpen(false)
        }

    }

    function validFilds() {
        let valid = true;


        if (valueFilter === '' && filter !== 'gender') {
            setValueFilterError(true);
            setValueFilterErrorText(`Preencha um valor.`)
            valid = false;
        } else {
            if (filter === 'birthDate') {
                if (validDate(valueFilter)) {
                    setValueFilterError(false);
                } else {
                    setValueFilterError(true);
                    setValueFilterErrorText(`Informe um data valida.`)
                    valid = false;
                }
            } else {
                setValueFilterError(false);
            }
        }

        return valid;

    };

    return (
        <>
            <IconButton aria-label="alterar" onClick={(e) => handleOpen(e)}>
                <FilterListIcon className={classes.iconFilter} />
            </IconButton>

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
                        Filtros
                    </Typography>
                </DialogTitle>
                <DialogContent className={classes.dialogColor} dividers="true">
                    <form>
                        <FormControl
                            fullWidth
                        >
                            <InputLabel >
                                Filtro
                            </InputLabel>
                            <Select
                                value={filter}
                                onChange={e => setFilter(e.target.value)}
                            >{Object.keys(filterList).map(key => (
                                <MenuItem value={key}>{filterList[key]}</MenuItem>
                            ))

                                }


                            </Select>
                        </FormControl>

                        {filter === 'gender' ? <FormControl
                            fullWidth
                        >
                            <InputLabel

                            >
                                Valor Pesquisa
                            </InputLabel>
                            <Select
                                value={valueFilter}
                                onChange={e => setValueFilter(e.target.value)}
                            >
                                <MenuItem value="M">Masculino</MenuItem>
                                <MenuItem value="F">Feminino</MenuItem>


                            </Select>
                        </FormControl> :
                            <TextField
                                type={filter === 'age' ? 'number' : 'text'}
                                className={classes.textField}
                                label="Valor Pesquisa"
                                fullWidth
                                value={valueFilter}
                                onChange={(e) => setValueFilter(e.target.value)}
                                error={valueFilterError}
                                helperText={valueFilterError && valueFilterErrorText}
                                InputProps={filter === 'birthDate' && {
                                    inputComponent: DateMask,
                                }}
                            />}

                    </form>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>

                    <Button
                        className={classes.buttonFilter}
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={sendFilter}
                        fullWidth
                    >
                        Filtrar
                    </Button>

                </DialogActions>

            </Dialog>
        </>
    );
}