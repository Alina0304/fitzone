import React, {useCallback, useContext, useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormHelperText from "@material-ui/core/FormHelperText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import {Link,} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";


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

export const ChangePage = (props) => {
    const {token} = useContext(AuthContext)
    const curId=props.userId
    console.log("текущий",curId)
    const upload = document.getElementById("upload");
    const {request, loading} = useHttp();
    const [client, setClient] = useState([{}])
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()
    const [file, setFile] = useState()
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [Modal, setModal] = useState(false)

    const handleCloseModal = () => {
        setModal(false);
    };
    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
    }

    const handleChangeName = (event) => {
        setName(event.target.value);
    }
    const handleChangePhone = (event) => {
        setPhone(event.target.value);
    }
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const curCient = useCallback(async () => {
        console.log("Функция")
        try {
            const fetched = await request(`/api/changing/clientinfo/${curId}`, 'GET', null, {Authorization: `Bearer ${token}`})
            console.log("F,jytvtyns", fetched.result)
            setClient(fetched.result)
            setEmail(fetched.result[0].email)
            setName(fetched.result[0].FIO_cl)
            setPhone(fetched.result[0].Phone)
            setSelectedDate(fetched.result[0].Age)
            setFile(fetched.result[0].img)
        } catch (e) {
            console.log(e)
        }
    }, [request, token, curId])
    const changing = async (id,email,name, phone, date, img) => {
       setModal(true)
        console.log(img, "img")
        const result = await toBase64(img)
        console.log("Form data", result)
        try{
            const fetched = await request(`/api/changing/changeinfo`, 'POST', {data: result, fileName: img.name, id,email,
                name,
                phone,
                date})
        }
        catch (e) {

        }
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const handleCapture = () => {
        console.log(upload.files)
        if (upload.files.length>0)
            setFile(upload.files[0])
    };
    useEffect(() => {
        curCient()
    }, [])

    const classes = useStyles();
    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                    Редактирование личного кабинета
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Заполните необходимую информацию:
                </Typography>
                {loading && <Loader/>}
                {!loading && client.length != 0 && (
                    <>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField required id="standard-disabled" label="email" value={email} defaultValue={email}
                                           onChange={handleChangeEmail}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField required id="standard-disabled" label="ФИО клиента" value={name}
                                           defaultValue={client.FIO_cl} onChange={handleChangeName}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField required id="standard-disabled" label="Контактный телфон" value={phone}
                                           defaultValue={client.Phone} onChange={handleChangePhone}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        locale="ru"
                                        margin="normal"
                                        id="date-picker-dialog"
                                        required
                                        label="Дата Рождения"
                                        views={['year', 'month', 'date']}
                                        defaultValue={client.Age}
                                        value={selectedDate}
                                        format="dd/MM/yyyy"
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormHelperText required>Загрузить фото</FormHelperText>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="upload"
                                    multiple
                                    type="file"
                                    onChange={handleCapture}
                                    style={{display: 'none'}}
                                />
                                <label htmlFor="upload" >
                                    <Button variant="contained" component="span">
                                        Загрузить
                                    </Button>
                                </label>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Button component={Link} to="/clientPage" onClick={() => {changing(curId,email, name, phone, selectedDate,file)
                                }} color="primary">
                                    ВНЕСТИ ИЗМЕНЕНИЯ
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Paper>
        </main>
    )
}