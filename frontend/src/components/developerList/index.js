import React, { Fragment, useState, useEffect } from 'react';
import {
    InputBase,
    makeStyles,
    InputAdornment,
    IconButton,
    Grid,
    Chip,
} from "@material-ui/core";
import api from './../../services/api';
import SearchIcon from "@material-ui/icons/Search";
import DraculaImg from './../../assets/dracula.png';
import DeveloperCard from './../../components/developerCard';
import { Pagination } from '@material-ui/lab';
import DeveloperForm from './../developerForm';
import DeveloperFilters from './../developerFilters';
import {translateFieldName} from './../../tools/translateFieldName';

const useStyles = makeStyles(theme => ({
    draculaIcone: {
        width: '8%',
        position: 'absolute',
        top: '10px',
        left: '10px',
    },
    divSearch: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    search: {
        display: 'flex',
        justifyContent: 'center',
        position: "relative",
        borderRadius: '25px',
        backgroundColor: '#44475A',
        width: "60%",
        height: "3rem"
    },
    inputRoot: {
        color: "inherit",
        width: "90%",
    },
    inputInput: {
        width: "100%",
        color: "#50FA7B",
        fontSize: "1.2rem",
    },
    iconSearch: {
        color: '#50FA7B',
        fontSize: "1.8rem",
    },
    iconFilterList: {
        color: '#50FA7B',
        fontSize: "2.8rem",
    },
    paginationButton: {
        backgroundColor: '#F8F8F2',
        margin: '0.5rem',
        padding: '0 0.3rem',
        fontSize: '1.2rem'
    },
    divPagination: {
        display: 'flex',
        justifyContent: "center",
        width: '100%',
        margin: '2rem'
    },
    chip : {
        margin : '1rem'
    }

}))

export default function DevelopersList(props) {

    const classes = useStyles();

    const [searchValue, setSearchValue] = useState('');
    const [listDevelopers, setListDevelopers] = useState([]);
    const [totalDevelopers, setTotalDevelopers] = useState(0);
    const [limit] = useState(12);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [filters, setFilters] = useState({})

    useEffect(() => {
        findDevelopers()
    }, [])

    useEffect(() => {
        setPages(Math.ceil(totalDevelopers / limit));

        window.scrollTo({ top: 0, behavior: 'smooth' });

    }, [totalDevelopers])

    function addFilter(filter, value) {
        let filterstemp = filters;
        filterstemp[filter] = value;
        setFilters(filterstemp)
        findDevelopers();
    }

    function removeFilter(filter) {
        let filtersTemp = filters;
        delete filters[filter];
        setFilters(filtersTemp);
        findDevelopers();
    }

    function reload() {
        findDevelopers(page);

    }


    async function findDevelopers(page = 1) {
        try {
            let queryFilters = ``;
            setPage(page);
            if(Object.keys(filters).length > 0){
               
                for(let filter in filters){
                    queryFilters += `&${filter}=${filters[filter]}`
                }
            }
            const responseDevelopers = await api.get(`/developers?page=${page}&limit=${limit}${searchValue !== '' ? `&name=${searchValue}` : ''}${queryFilters}`);
            if (responseDevelopers.status === 200) {
                setListDevelopers(responseDevelopers.data.listDevelopers);
                setTotalDevelopers(responseDevelopers.headers['x-total-count']);
            }
        } catch (error) {
            setListDevelopers([]);
            setPages(0);
        }

    }

    return (
        <>
            <img src={DraculaImg}
                className={classes.draculaIcone}
                alt="icon developer"
            />


            <form onSubmit={(event) => { event.preventDefault(); findDevelopers() }}>
                <div className={classes.divSearch}>
                    <div className={classes.search}>
                        <InputBase
                            placeholder="Pesquisar..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={findDevelopers}
                                    >
                                        <SearchIcon fontSize="large" className={classes.iconSearch} />
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{ "aria-label": "search" }}
                        />
                    </div>
                    <DeveloperFilters addFilter={addFilter} />
                    <DeveloperForm reload={reload} />

                </div>

            </form>
            {Object.keys(filters).map(filter => {
                let labelChip = `${translateFieldName(filter)} - ${filters[filter]}`
                return <Chip
                    className={classes.chip}
                    label={labelChip}
                    onDelete={()=> removeFilter(filter)}
                />
            }

            )}
            <Grid container>
                {listDevelopers.length > 0 &&
                    listDevelopers.map(item => (
                        <DeveloperCard
                            id={item.id}
                            name={item.nome}
                            age={item.idade}
                            hobby={item.hobby}
                            gender={item.sexo}
                            birthDate={item.datanascimento}
                            reload={reload}
                        />
                    ))

                }
                {pages > 0 && <div className={classes.divPagination}>
                    <Pagination
                        size="large"
                        count={pages}
                        page={page}
                        variant="outlined"
                        shape="rounded"
                        color='#F8F8F2'
                        onChange={(event, page) => { findDevelopers(page) }} />
                </div>}
            </Grid>

        </>

    )
}