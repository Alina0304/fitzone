import React, {useContext, useEffect, useState,useCallback} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, Typography, Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useHttp} from "../hooks/http.hook";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {Loader} from "../components/Loader";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import moment from "moment";


const useStyles = makeStyles((theme)=>({
root: {
    flexGrow: 1
},
menuButton: {
    marginRight: theme.spacing(1)
},
Buttons:{
    position: "center"
},
title: {
    flexGrow: 1
},

mainFeaturesPost: {
    position: "relative",
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(/img/grupptren.jpg)',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "centre"

},
overlay: {
    position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundOverlay: "rgba(0,0,0,0,.3)"
},
mainFeaturesPostContent: {
    position: "centre",
        padding: theme.spacing(6),
        marginTop: theme.spacing(8)

},
cardMedia: {
    paddingTop: "56.25%"
},
cardContent: {
    flexGrow: 1
},
cardGrid: {
    marginTop: theme.spacing(4)
},
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
    },


}))

export const ZanytiyPage = (props) =>{
    const {loading, error, request, clearError} = useHttp();
    const [zanytieForm, setZanytieForm] = useState([])
    const curRole=props.role
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [state, setState] = useState({open: false, stationNumber: 1,});
    const [name, setName]=useState()
    const [number, setNumber]=useState()
    const [trener, setTrener] = React.useState();
    const [opisanie, setOpisanie] = React.useState();
    const [opodrobno, setOpodrobno] = React.useState();

    const handleChangeName =(event,name) => {
        console.log("name", name)
        console.log("value", event.target.value)
       setName(name)

    };
    const handleChangeNumber = (event) => {
        setNumber(event.target.value);
    };

    const handleChangeTrener = (event) => {
        setTrener(event.target.value);
    };
    const handleChangeOpisanie = (event) => {
        setOpisanie(event.target.value);
    };

    const handleChangeOpodrobno = (event) => {
        setOpodrobno(event.target.value);
    };
    const handleOpen = stationNumber =>()=> {
        console.log("stationNumber",stationNumber )
        setState({openModal:true,stationNumber: stationNumber});
    };

    const handleClose = () => {
        setState({openModal:false,stationNumber: 1});
    };
    const handleDateChange=(date)=>{
        console.log(date);
        setSelectedDate(date);
    }
    const handleClickOpen = async (name,number,selectedDate,trener, opisanie, opodrobno) => {
        //setOpen(true);
        try {
            const fetched = await request(`/api/zanytiy/zanytiyPage`, 'POST',{name,number,selectedDate,trener,opisanie,opodrobno})
            console.log("",fetched)

        } catch (e) {
            console.log(e)
        }
    };
    const zanytie = useCallback(async () => {
        console.log("Before try")
        try {
            const fetched = await request('/api/zanytiy/zanytiyPage', 'GET', null, {

            })
            console.log("Fetched",fetched)
            console.log("Выборка",fetched.result[0].img)


            setZanytieForm(fetched.result)


        } catch (e) {
            console.log(e)
        }
    }, [request])

    useEffect(() => {
        zanytie()
    }, [])
    const classes = useStyles();
    return(
        <main>
            <Paper className={classes.mainFeaturesPost}>
                <Container fixed>
                    <div className={classes.overlay}/>
                    <Grid container>
                        <Grid item md={6}>
                            <div className={classes.mainFeaturesPostContent}>
                                <Typography
                                    component="h1"
                                    variant="h3"
                                    color='inherit'
                                    gutterBottom
                                >
                                    Fitness
                                </Typography>
                                <Typography

                                    variant='h5'
                                    color='inherit'
                                    paragraph
                                >
                                    Lorem ipsum
                                </Typography>
                                <Button variant="contained" color='secondary'>
                                    Learn more
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
            <div className={classes.mainContent}>
                <Container maxWidth="md">
                    <Typography variant="h2" align='center' color="textPrimary" gutterBottom> FitZone
                        right </Typography>
                    <Typography variant="h5" align='center' color="textSecondary" paragraph> Начни сегодня. Начни с
                        себя </Typography>
                    <div className={classes.mainButtons}>
                        <Grid container spacing={4} justify="center">
                            <Grid item>
                                <Button variant="outlined" color='primary'>
                                    Learn More
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                {loading && <Loader/>}
                {!loading && zanytieForm.length != 0 && (
                    <>
                <Grid container spacing={4}>
                    {
                        zanytieForm.map((card) => (

                            <Grid item key={card} xs={12} sm={6} md={4} spacing={3}>
                                <Card className={classes.card}>
                                    <CardMedia className={classes.cardMedia}
                                               image={card.img}
                                               title="Image title"/>
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h5" gutterBottom>
                                            {card.nazvanie}
                                        </Typography>
                                        <Typography>
                                            {card.opisanie}
                                        </Typography>
                                        <Typography>
                                            <AccessTimeIcon/>{moment(card.datetime).format("LLLL")}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Подробно
                                        </Button>
                                        {curRole=='admin' && (
                                            <>
                                            <Button size="small" color="primary" onClick={handleOpen(card.idzanytie)}>
                                                Редактировать
                                            </Button>
                                                <Dialog open={state.openModal} onClose={handleClose} aria-labelledby="form-dialog-title">
                                                    <DialogTitle id="form-dialog-title">Редактировать {zanytieForm[(state.stationNumber)-1].nazvanie}</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText>
                                                            Редактировать тренировку
                                                        </DialogContentText>
                                                        <div>
                                                            <FormControl className={classes.formControl}>
                                                        <TextField
                                                            autoFocus
                                                            onChange={()=>handleChangeName(zanytieForm[(state.stationNumber)-1].nazvanie)}
                                                            value={name}
                                                            margin="dense"
                                                            id="name"
                                                            label="Название тренировки"
                                                            defaultValue={zanytieForm[(state.stationNumber)-1].nazvanie}
                                                            fullWidth
                                                        />
                                                            </FormControl>
                                                        <FormControl className={classes.formControl}>
                                                        <FormHelperText>Тренер</FormHelperText>
                                                        <NativeSelect
                                                            defaultValue={zanytieForm[(state.stationNumber)-1].fio_trener}
                                                            inputProps={{
                                                                id: 'fio_trener',
                                                            }}
                                                            onChange={handleChangeTrener}
                                                        >
                                                            {zanytieForm.map((option) => (
                                                                <option value={option.fio_trener} key=
                                                                    {option.idtrenera}>
                                                                    {option.fio_trener}
                                                                </option>
                                                            ))}
                                                        </NativeSelect>
                                                        </FormControl>
                                                            <FormControl className={classes.formControl}>
                                                            <TextField
                                                                autoFocus
                                                               margin="dense"
                                                                onChange={handleChangeNumber}
                                                                value={number}
                                                                style={{width: 95}}
                                                                id="numberzal"
                                                                label="Номер зала"
                                                                defaultValue={zanytieForm[(state.stationNumber)-1].numberzal}
                                                                fullWidth
                                                            />
                                                        </FormControl>
                                                        </div>
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <FormControl className={classes.formControl}>
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
                                                                    />
                                                                        </FormControl>
                                                                    <FormControl className={classes.formControl}>
                                                                    <KeyboardTimePicker
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
                                                                    </FormControl>
                                                                </MuiPickersUtilsProvider>
                                                </DialogContent>
                                                    <FormControl className={classes.formControl}>
                                                    <FormHelperText>Краткое описание</FormHelperText>
                                                    <TextareaAutosize
                                                        rowsMax={5}
                                                        onChange={handleChangeOpisanie}
                                                        aria-label="Описание программы"
                                                        placeholder="Maximum 4 rows"
                                                        defaultValue={zanytieForm[(state.stationNumber)-1].opisanie}
                                                    />
                                                    </FormControl>
                                                    <FormControl className={classes.formControl}>
                                                        <FormHelperText>Подробное описание</FormHelperText>
                                                        <TextareaAutosize
                                                            rowsMax={5}
                                                            onChange={handleChangeOpodrobno}
                                                            aria-label="Описание программы"
                                                            placeholder="Maximum 4 rows"
                                                            defaultValue={zanytieForm[(state.stationNumber)-1].opisaniepodrobno}
                                                        />
                                                    </FormControl>
                                                    <DialogActions>
                                                        <Button onClick={handleClose} color="primary">
                                                            Отменить
                                                        </Button>
                                                        <Button onClick={()=>handleClickOpen(name,number,selectedDate, trener, opisanie,opodrobno)} color="primary">
                                                            {console.log('ZanForm',zanytieForm[(state.stationNumber)-1])}
                                                            Изменить
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </>
                                        )}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
                    </>
                )}
            </Container>
        </main>

);
}