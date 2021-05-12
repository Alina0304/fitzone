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
import {CardContent} from "@material-ui/core";
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

export const RegistrationPage = (props) => {
    const curRole=props.role
    const upload = document.getElementById("upload");
    const {request, loading} = useHttp();
    const [abonements, setAbonements] = useState([{}])
    const [email, setEmail] = useState()
    const [password, setPass] = useState()
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [idabon, setIdAbon] = useState()
    const [sumAndId, setSumAndId] = useState([{}])
    const [sroki, setSroki] = useState([{}])
    const [roles, setRoles] = useState([{}])
    const [file, setFile] = useState()
    const [sr, setSr] = useState()
    const [newRole, setNewRole] = useState()
    const [check, setCheck] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedActiveDate, setSelecteActiveDate] = useState(new Date());
    const [payModal, setPayModal] = useState(false)

    const handleClosePay = () => {
        setPayModal(false);
    };
    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
    }
    const handleDateActiveChange = (date) => {
        console.log(date);
        setSelecteActiveDate(date);
    }
    const handleChangeAbon = (event) => {
        setIdAbon(event.target.value);
    }
    const handleChangeSrok = (event) => {
        setSr(event.target.value);
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
    const handleChangePass = (event) => {
        setPass(event.target.value);
    }
    const handleChangeCheck = () => {
        setCheck(!check);
    };
    const handleChangeRole = (event) => {
        setNewRole(event.target.value);
    };
    const abons = useCallback(async () => {
        console.log("Before try")
        try {
            const fetched = await request('/api/registration/abonstype', 'GET', null, {})
            console.log("Fetched", fetched)
            console.log("Преобразование 1", fetched.result[0].img)
            setAbonements(fetched.result)

        } catch (e) {
        }
    }, [request])
    const srok = useCallback(async () => {
        try {
            const fetched = await request(`/api/registration/sroki`, 'GET', null, {})
            console.log("F,jytvtyns", fetched.result)
            setSroki(fetched.result)
        } catch (e) {
            console.log(e)
        }
    }, [])
    const registrate = async (email, password, name, phone, date, idabon, img, summ, active) => {
        setPayModal(true)
        console.log(img, "img")
       const result = await toBase64(img)
        console.log("Form data", result)
        try{
           const fetched = await request(`/api/auth/register`, 'POST', {data: result, fileName: img.name, email,
               password,
               name,
               phone,
               date,
               idabon,
               summ,
               active})
        }
        catch (e) {

        }
    }
    const findAbon = async (idabon, sr) => {
        idabon == undefined ? idabon = abonements[0].id : idabon = idabon
        sr == undefined ? sr = sroki[0].srok : sr = sr
        try {
            const fetched = await request(`/api/abonpay/findnew`, 'POST', {idabon, sr})
            console.log("findabon", fetched.result)
            setSumAndId(fetched.result)
        } catch (e) {
            console.log(e)
        }
    }
    const allrole = useCallback(async () => {
        try {
            const fetched = await request(`/api/registration/role`, 'GET', null, {})
            console.log("F,jytvtyns", fetched.result)
            setRoles(fetched.result)
        } catch (e) {
            console.log(e)
        }
    }, [])
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
        srok()
    }, [])
    useEffect(() => {
        abons()
    }, [])
    useEffect(() => {
        if (curRole=='admin')
        allrole()
    }, [])

    const classes = useStyles();
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
                {!loading && abonements.length != 0 && (
                    <>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField required id="standard-disabled" label="email" defaultValue="example@ya.com"
                                           onChange={handleChangeEmail}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField required type="password" id="standard-disabled" label="Пароль"
                                           defaultValue="123456789" onChange={handleChangePass}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField required id="standard-disabled" label="ФИО клиента"
                                           defaultValue="ФИО клиента" onChange={handleChangeName}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField required id="standard-disabled" label="Контактный телфон"
                                           defaultValue="Контактный телефон" onChange={handleChangePhone}/>
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
                                        value={selectedDate}
                                        format="dd/MM/yyyy"
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            {loading && <Loader/>}
                            {!loading && curRole==='admin' && roles.length!=0 && (
                                <>
                                <Grid item xs={12} md={6}>
                                    <FormHelperText required>Уровень доступа</FormHelperText>
                                    <NativeSelect className={classes.select}
                                                  defaultValue={roles[0].role}
                                                  inputProps={{
                                                      id: 'role',
                                                  }}
                                                  onChange={handleChangeRole}
                                    >
                                        {roles.map((option) => (
                                            <option value={option.role} key=
                                                {option.role}>
                                                {option.role}
                                            </option>
                                        ))}
                                    </NativeSelect>
                                </Grid>
                                </>
                            )
                            }
                            <Grid item xs={12} md={6}>
                                <FormHelperText>Тип абонемента</FormHelperText>
                                <NativeSelect
                                    defaultValue={abonements[0].id}
                                    onChange={handleChangeAbon}
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
                                <FormHelperText required>Длительность в днях</FormHelperText>
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
                                                onChange={handleDateActiveChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button onClick={() => {
                                    findAbon(idabon, sr);
                                    registrate(email, password, name, phone, selectedDate, sumAndId[0].id, file, sumAndId[0].summ, selectedActiveDate)
                                }} color="primary">
                                    РЕГИСТРАЦИЯ
                                </Button>
                                    <>
                                    <Dialog
                                        open={payModal}
                                        onClose={handleClosePay}
                                        aria-labelledby="responsive-dialog-title"
                                    >
                                        <DialogTitle
                                            id="responsive-dialog-title">{"Выберите подходящий способ оплаты"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                <PayForm type={"Покупка абонемента"} sum={sumAndId[0].summ}/>
                                            </DialogContentText>
                                        </DialogContent>
                                    </Dialog>
                                    </>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Paper>
        </main>
    )
}