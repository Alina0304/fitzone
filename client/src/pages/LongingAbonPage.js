import React, {useCallback, useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import AppBar from "@material-ui/core/AppBar";
import FormHelperText from "@material-ui/core/FormHelperText";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {CardContent} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import moment from "moment";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {PayForm} from "../components/PayForm";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(30),
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
    formControl: {
        marginLeft: theme.spacing(0),
    },
    checkbox:{
        marginLeft: theme.spacing(0),
        marginTop: theme.spacing(0.5)
    },
}));

export const LongingAbonPage = (props) => {
    const classes = useStyles();
    const {token} = useContext(AuthContext)
    const {loading, request} = useHttp();
    const curId = props.userId
    const curRole = props.role
    const [curFio, setCurFio] = useState([{}])
    const [clients, setClients]=useState([{}])
    const [abonements, setAbonements]=useState([{}])
    const [sroki, setSroki]=useState([{}])
    const [summaAndId, setSummaAndId]=useState([{}])
    const [sr, setSr]=useState()
    const [selectedDate, setSelectedDate] = useState(new Date());
    const curDate=new Date()
    const [cl, setcl]=useState(curId)
    const [ab, setAb]=useState()
    const [check, setCheck]=useState(false)
    const [payModal, setPayModal] = useState(false)


    const handleChangeClient = (event) => {
        setcl(event.target.value);
    };
    const handleChangeAbonement = (event) => {
        setAb(event.target.value);
    };
    const handleChangeCheck = () => {
        setCheck(!check);
    };
    const handleDateChange=(date)=>{
        setSelectedDate(date);
    }
    const handleChangeSrok=(event)=>{
        setSr(event.target.value);
    }
    const handleClosePay = () => {
        setPayModal(false);
    };
    const handleClickLonging=async (idcl, idabon,summ,date, sdate) => {
        setPayModal(true);
        try {
            const fetched = await request(`/api/abonpay/updating`, 'POST',{idcl, idabon,summ,date, sdate})
            console.log("",fetched)
        } catch (e) {
            console.log(e)
        }
    };
    const findAbon = async (idabon, sr) => {
        idabon == undefined ? idabon=abonements[0].id : idabon=idabon
        sr == undefined ? sr=sroki[0].srok: sr=sr
        try {
            const fetched = await request(`/api/abonpay/findnew`, 'POST',{idabon, sr})
            console.log("findabon",fetched.result)
            setSummaAndId(fetched.result)
        } catch (e) {
            console.log(e)
        }
        handleClickLonging(cl,summaAndId[0].id,summaAndId[0].summ,curDate,selectedDate)
    }
    const allClient = useCallback(async () => {
        console.log("Before try")
        try {
            const fetched = await request('/api/abonpay/allclients', 'GET', null, {})
            console.log("Выборка",fetched.result)
            setClients(fetched.result)
        } catch (e) {
            console.log(e)
        }
    }, [])
    const client = useCallback(async () => {
        try {
            const fetched = await request(`/api/abonpay/curclient/${curId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log("Фамилия текущая", fetched.result)
            setCurFio(fetched.result)
        } catch (e) {
            console.log(e)
        }
    }, [])
    const abonement = useCallback(async () => {
        try {
            const fetched = await request(`/api/abonpay/abonements`, 'GET', null, {})
            console.log("F,jytvtyns", fetched.result)
            setAbonements(fetched.result)
        } catch (e) {
            console.log(e)
        }
    }, [])
    const srok = useCallback(async () => {
        try {
            const fetched = await request(`/api/abonpay/sroki`, 'GET', null, {})
            console.log("F,jytvtyns", fetched.result)
            setSroki(fetched.result)
        } catch (e) {
            console.log(e)
        }
    }, [])
    useEffect(() => {
        curRole == 'admin' ? allClient() : client()
    }, [])
    useEffect(() => {
        abonement()
    }, [])
    useEffect(() => {
        srok()
    }, [])

    return (
        <main className={classes.layout}>
            {loading && <Loader/>}
            {!loading && (curFio.length !== 0 || clients.length!==0) && sroki.length!==0 && abonements.length!=0 &&(
                <>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Продление абонемента
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Заполните необходимую информацию
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                {(curRole=='cl' || curRole=='tren') && (
                                    <>
                                        <FormHelperText>ФИО клиента</FormHelperText>
                                        <TextField disabled id="standard-disabled" label={curFio[0].FIO_cl} />
                                    </>
                                )}
                                {curRole=='admin' && (
                                    <>
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
                                    </>
                                )}
                            </Grid>
                                <Grid item xs={12} md={6}>
                                <FormHelperText>Тип абонемента</FormHelperText>

                                <NativeSelect className={classes.select}
                                              defaultValue={abonements[0].type}
                                              inputProps={{
                                                  id: 'id',
                                              }}
                                              onChange={handleChangeAbonement}
                                >
                                    {abonements.map((option) => (
                                        <Tooltip title={option.opisanie}>
                                        <option value={option.id} key=
                                            {option.id}>
                                            {option.type}
                                        </option>
                                        </Tooltip>
                                    ))}
                                </NativeSelect>
                                    <FormHelperText>Длительность в днях</FormHelperText>
                                    <NativeSelect className={classes.select}
                                                  defaultValue={sroki[0].srok}
                                                  inputProps={{
                                                      id: 'srok',
                                                  }}
                                                  onChange={handleChangeSrok}
                                    >
                                        {sroki.map((option) => (
                                                <option value={option.srok} key=
                                                    {option.srok}>
                                                    {option.srok}
                                                </option>
                                        ))}
                                    </NativeSelect>
                                </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControlLabel className={classes.formControl}
                                    value="bottom"
                                    control={<Checkbox className={classes.checkbox}
                                        color="primary"
                                        onChange={handleChangeCheck}
                                    />}
                                    label="Активировать абонемент позже?"
                                    labelPlacement="top"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {check && (
                                    <>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            locale="ru"
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Дата активации"
                                            views={['year', 'month', 'date']}
                                            value={selectedDate}
                                            format="dd/MM/yyyy"
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    </>
                                )}
                            </Grid>
                            <Button onClick={()=>findAbon(ab, sr)} color="primary">
                                ПРОДЛИТЬ
                            </Button>
                            <Dialog
                                open={payModal}
                                onClose={handleClosePay}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <DialogTitle id="responsive-dialog-title">{"Выберите подходящий способ оплаты"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <PayForm type={"Оплата продления абонемента"} sum={summaAndId[0].summ}/>
                                    </DialogContentText>
                                </DialogContent>
                            </Dialog>
                        </Grid>
                    </Paper>
                </>
            )}
        </main>
    )
}
