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


const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(30),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 850,
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

export const PayInfo = (props) => {
    const classes = useStyles();
    const {token} = useContext(AuthContext)
    const {loading, request} = useHttp();
    let fl=false
    const [clients, setClients]=useState([{}])
    const [rows, setRows]=useState([{id:1}])
    const oplata=[{id: 1, type:"абонемент"}, {id:2, type:"персональная тренировка"}]
    const [select, setSelect]=useState([{}])
    const [cl, setcl]=useState(1)
    const [op, setop]=useState(1)

    const handleChangeClient = (event) => {
        fl=true
        setcl(event.target.value);
    };
    const handleChangeOplata = (event) => {
        fl=true
        setop(event.target.value);
        console.log(op)
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
    const abonsTable=async(cl,op) => {
        fl=true
        console.log("fvdfg")
        if (op==1) {
            try {
                const fetched = await request(`/api/payinfo/aboutclientabon`, 'POST', {cl})
                console.log("Fetcheddata", fetched.result)
                setRows(fetched.result)
            } catch (e) {
                console.log(e)
            }
        }
        if(op==2){
            try {
                const fetched = await request(`/api/payinfo/aboutclientpt`, 'POST', {cl})
                console.log("Fetcheddata", fetched.result)
                setRows(fetched.result)
            } catch (e) {
                console.log(e)
            }
        }
        console.log("Вывод")
    }
    const pay=async(cl,op, select) => {
        console.log("!",select)
        if (op==1) {
            try {
                const fetched = await request(`/api/payinfo/payabon`, 'POST', {cl, ...select})
            } catch (e) {
                console.log(e)
            }
        }
        else {
            try {
                const fetched = await request(`/api/payinfo/paypt`, 'POST', {cl, ...select})
            } catch (e) {
                console.log(e)
            }
        }
        console.log("Вывод")
    }



    useEffect(() => {
        allClient()
    }, [])


    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                    Регистрация нового клиента
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Заполните необходимую информацию:
                </Typography>
                {loading && <Loader/>}
                {!loading && clients.length != 0 && (
                    <>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <FormHelperText>Клиент</FormHelperText>
                                <NativeSelect className={classes.select}
                                    // defaultValue={clients[0].FIO_cl}
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
                                <FormHelperText>Клиент</FormHelperText>
                                <NativeSelect className={classes.select}
                                              defaultValue={oplata[0].type}
                                              inputProps={{
                                                  id: 'id',
                                              }}
                                              onChange={handleChangeOplata}
                                >
                                    {oplata.map((option) => (
                                        <option value={option.id} key=
                                            {option.id}>
                                            {option.type}
                                        </option>
                                    ))}
                                </NativeSelect>
                            </Grid>
                            <Button onClick={()=>abonsTable(cl,op)}>Найти</Button>
                            <div style={{height: 280, width: '100%'}}>
                                {op == 1 ?
                                    <DataGrid rows={rows}
                                              columns={[{
                                                  field: 'FIO_cl',
                                                  headerName: 'ФИО клиента',
                                                  width: 150
                                              },
                                                  {
                                                      field: 'srok',
                                                      headerName: 'Срок действия в днях',
                                                      width: 200
                                                  },
                                                  {field: 'type', headerName: 'Тип', width: 100},
                                                  {
                                                      field: 'sumkoplate',
                                                      headerName: 'Сумма к олпате',
                                                      width: 120,
                                                  },
                                                  {
                                                      field: 'oplacheno',
                                                      headerName: 'Оплачено',
                                                      width: 120,
                                                  },]} pageSize={5} onRowSelected={(x) => setSelect(x.data)}/>
                                    :
                                    <DataGrid rows={rows}
                                              columns={[{
                                                  field: 'nazvanie',
                                                  headerName: 'Название ',
                                                  width: 150
                                              },
                                                  {field: 'fio_trener', headerName: 'ФИО тренера', width: 150},
                                                  {field: 'datatime', headerName: 'Дата и время', width: 150},
                                                  {field: 'status', headerName: 'Статус', width: 100},
                                                  {
                                                      field: 'sumkoplate',
                                                      headerName: 'Сумма к олпате',
                                                      width: 120,
                                                  },
                                                  {
                                                      field: 'oplacheno',
                                                      headerName: 'Оплачено',
                                                      width: 120,
                                                  }]} pageSize={5}
                                              onRowSelected={(x) => setSelect(x.data)}/>
                                }
                            </div>
                            <Button onClick={() =>pay(cl, op, select)} component={Link} to="/offlinepay">Оплатить</Button>
                        </Grid>
                    </>
                )}
            </Paper>
        </main>
    )
}