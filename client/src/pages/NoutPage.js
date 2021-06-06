import React, {useCallback, useContext, useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/Lock';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {CardActions, CardContent} from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {PhotoCamera} from "@material-ui/icons";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {PayForm} from "../components/PayForm";
import Dialog from "@material-ui/core/Dialog";
import {AuthContext} from "../context/AuthContext";
import {DataGrid} from "@material-ui/data-grid";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import moment from "moment";
import DialogActions from "@material-ui/core/DialogActions";
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import PersonIcon from "@material-ui/icons/Person";
import ScheduleIcon from "@material-ui/icons/Schedule";


const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(30),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    input: {
        marginTop: theme.spacing(5),
    },
}));

export const NoutPage = () => {
    const classes = useStyles();
    const {loading, request} = useHttp();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [clients, setClients]=useState([{}])
    const [treners, setTreners]=useState([{}])
    const [zanytie, setZaytie]=useState([{}])
    const [state, setState]=useState(false)
    const [resultCount, setResultCount]=useState(true)
    const [cl, setcl]=useState(1)
    const [zan, setzan]=useState(1)
    const [sum, setSum]=useState(1)
    const [tren, settren]=useState(1)

    const handleDateChange=(date)=>{
        console.log(date);
        setSelectedDate(date);
    }
    const handleChangeClient = (event) => {
        setcl(event.target.value);
    };
    const handleChangeZanytie = (event) => {
        setzan(event.target.value);
    };
    const handleChangeTrener = (event) => {
        settren(event.target.value);
    };
    const handleCloseModal = () => {
        setState(false);
    };
    const insertingInfo = async (cl,tren,selectedDate,zan) => {
        try {
            const fetched = await request(`/api/nout/insertingpt`, 'POST', {cl, tren, selectedDate,zan}, {})
        } catch (e) {
            console.log(e)
        }
    }
    const handleClickOpenModal = async (idtrener,selectedDate,zan) => {
        setState(true);
        try {
            const fetched = await request(`/api/nouting/selecttrenerpt`, 'POST',{idtrener, selectedDate},{})
            if (fetched.resultCount>0)
                setResultCount(false);
        } catch (e) {
            console.log(e)
        }
        try {
            const fetched = await request(`/api/nouting/selectsum`, 'POST',{zan},{})
            setSum(fetched.result)
        } catch (e) {
            console.log(e)
        }

    };

    const allClient = useCallback(async () => {
        try {
            const fetched = await request('/api/abonpay/allclients', 'GET', null, {})
            console.log("Выборка",fetched.result)
            setClients(fetched.result)
        } catch (e) {
            console.log(e)

        }
    }, [])
    const allZanytie = useCallback(async () => {
        try {
            const fetched = await request(`/api/nouting/noutingpt`, 'GET', null, {})
            console.log("Fetched",fetched)
            setZaytie(fetched.result)
        } catch (e) {
            console.log(e)
        }
    }, [])
    const allTreners = useCallback(async () => {
        console.log("Before try")
        try {
            const fetched = await request('/api/trener/trenersPage', 'GET', null, {

            })
            console.log("Fetched",fetched)
            setTreners(fetched.result)

        } catch (e) {}
    }, [])
    const pay = async (sum, zan, tren, cl, selectedDate) => {
        insertingInfo(cl,tren,selectedDate,zan)
        try {
            const fetched = await request(`/api/nout/insertingtwo`, 'POST', {cl, tren, sum}, {})
            console.log("", fetched)

        } catch (e) {
            console.log(e)
        }
        try {
            const fetched = await request(`/api/nout/insertingthree`, 'POST', {}, {})
            console.log("", fetched)

        } catch (e) {
            console.log(e)
        }
        handleCloseModal()
    };



    useEffect(() => {
        allClient()
    }, [])
    useEffect(() => {
        allZanytie()
    }, [])
    useEffect(() => {
        allTreners()
    }, [])

    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                    Запись на персональную тренировку
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Заполните необходимую информацию:
                </Typography>
                {loading && <Loader/>}
                {!loading && clients.length != 0 && treners.length!=0 && zanytie.length!=0 &&(
                    <>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <FormHelperText>Клиент</FormHelperText>
                                <NativeSelect className={classes.select}
                                     defaultValue={clients[0].FIO_cl}
                                              inputProps={{
                                                  id: 'id',
                                              }}
                                              onChange={handleChangeClient}
                                >
                                    {clients.map((option) => (
                                        <option value={option.id} key=
                                            {option.id}>
                                            {option.FIO_cl}
                                        </option>
                                    ))}
                                </NativeSelect>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormHelperText>Тренировка</FormHelperText>
                                <NativeSelect className={classes.select}
                                              defaultValue={zanytie[0].nazvanie}
                                              inputProps={{
                                                  id: 'idzanytie',
                                              }}
                                              onChange={handleChangeZanytie}
                                >
                                    {zanytie.map((option) => (
                                        <option value={option.idzanytie} key=
                                            {option.idzanytie}>
                                            {option.nazvanie}
                                        </option>
                                    ))}
                                </NativeSelect>
                            </Grid>
                            <Grid item xs={12} md={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    locale="ru"
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Дата"
                                    views={['year', 'month', 'date']}
                                    value={selectedDate}
                                    format="dd/MM/yyyy"
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                /><KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Время"
                                value={selectedDate}
                                format="HH:MM"
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                            </MuiPickersUtilsProvider>
                        </Grid>
                            <Grid item xs={12} md={6}>
                                <FormHelperText>Тренер</FormHelperText>
                                <NativeSelect className={classes.select}
                                              defaultValue={treners[0].fio_trener}
                                              inputProps={{
                                                  id: 'idtrener',
                                              }}
                                              onChange={handleChangeTrener}
                                >
                                    {treners.map((option) => (
                                        <option value={option.idtrener} key=
                                            {option.idtrener}>
                                            {option.fio_trener}
                                        </option>
                                    ))}
                                </NativeSelect>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button component={Link} to="/clientPage">Назад</Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button onClick={()=>handleClickOpenModal(tren, selectedDate)}>Записать</Button>
                                <Dialog
                                    open={state}
                                    keepMounted
                                    onClose={handleCloseModal}
                                    aria-labelledby="alert-dialog-slide-title"
                                    aria-describedby="alert-dialog-slide-description"
                                >
                                    {resultCount==false ? (
                                        <>
                                        <DialogTitle id="alert-dialog-slide-title">Выбранное вами время уже
                                            занято</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-slide-description">
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={handleCloseModal}>
                                        Попробовать снова
                                        </Button>
                                        )}
                                        <Button onClick={handleCloseModal} color="primary">
                                        Назад
                                        </Button>
                                        </DialogActions>
                                        </>
                                        )
                                        :
                                        (
                                            <>
                                            <DialogTitle id="alert-dialog-slide-title">Оплата персональной тренировки</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-slide-description">
                                                    <Typography gutterBottom paragraph>Внесите сведения об оплате наличными сейчас, нажав "Оплатить"</Typography>
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={()=>insertingInfo(cl,tren,selectedDate,zan)} component={Link} to="/clientPage">
                                                    Позже
                                                </Button>
                                                <Button onClick={()=>pay(sum, zan, tren, cl, selectedDate)} component={Link} to="/clientPage">
                                                    Оплатить
                                                </Button>
                                            </DialogActions>
                                            </>
                                        )
                                    }
                                </Dialog>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Paper>
        </main>
    )
}