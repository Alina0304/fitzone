import React, {useContext, useEffect, useState,useCallback} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useHttp} from "../hooks/http.hook";
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {AuthContext} from "../context/AuthContext";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PersonIcon from '@material-ui/icons/Person';
import ScheduleIcon from '@material-ui/icons/Schedule';
import moment from "moment";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import {Loader} from "../components/Loader";
import Avatar from "@material-ui/core/Avatar";

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
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
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
    }


}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const NoutingPersonalTrenPage = (props) =>{
    const {loading, error, request, clearError} = useHttp();
    const {token} = useContext(AuthContext)
    const curId = props.userId
    const [resultCount, setResultCount]=useState(true);
    console.log("CurId", curId)
    const curEmail=props.email
    console.log("Email", curEmail)
    const [noutingForm, setNoutingForm] = useState([{
        idzanytie:'',nazvanie:'', fio_trener:'',idtrener:'', img:'',datatime:''
    }])
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [state, setState] = useState({openModal: false,stationNumber: 1,});
    const [more, setMore] = useState({openModalMore: false,stationNumber: 1,});
    const [alert, setAlert]=useState([])
    const handleDateChange=(date)=>{
    console.log(date);
    setSelectedDate(date);
    }

    const handleClickOpen = async (card,selectedDate,curEmail) => {
            try {
                const fetched = await request(`/api/nouting/inserting/${curId}`, 'POST', {
                    ...card,
                    selectedDate,
                    curEmail
                }, {Authorization: `Bearer ${token}`})
                console.log("", fetched)

            } catch (e) {
                console.log(e)
            }
        try {
            const fetched = await request(`/api/nouting/insertingtwo/${curId}`, 'POST', {
                ...card,
                selectedDate,
            }, {Authorization: `Bearer ${token}`})
            console.log("", fetched)

        } catch (e) {
            console.log(e)
        }
            handleCloseModal()
    };

    const handleClickOpenModal = async (stationNumber,card,selectedDate) => {
        console.log("stationNumber",stationNumber )
        setState({openModal:true,stationNumber: stationNumber});
       try {
           console.log("ТУТТ")
            const fetched = await request(`/api/nouting/selecttrenerpt/${curId}`, 'POST',{...card,selectedDate},{Authorization: `Bearer ${token}`})
            console.log("Поймали",fetched)
           if (fetched.resultCount>0)
               setResultCount(false);
        } catch (e) {
            console.log(e)
        }

    };

    const handleCloseModal = () => {
        setState({openModal:false,stationNumber: 1});
    };

    const handleClickOpenMore = stationNumber =>()=> {
        console.log("StationNumber", stationNumber)
        setMore({openModalMore:true,stationNumber: stationNumber});
    };

    const handleCloseMore = () => {
        setMore({openModalMore:false,stationNumber: 1});
    };

    const handleAlertOpen = () => {
        setAlert(true);
    };

    const handleAlertClose = () => {
        setAlert(false);
        handleCloseModal()
    };


    const nouting = useCallback(async () => {
        console.log("Before try")
        try {
            const fetched = await request(`/api/nouting/noutingpt/${curId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log("Fetched",fetched)
            setNoutingForm(fetched.result)
        } catch (e) {
            console.log(e)
        }
    }, [request, token, curId])

    useEffect(() => {
        nouting()
    }, [])
    const classes = useStyles();
    console.log("SelectedDate", selectedDate)
    console.log("NoutingForm", noutingForm)
    return(
        <>
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
                            </Grid>
                            <Grid item>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                {loading && <Loader/>}
                {!loading && noutingForm.length != 1 && (
                    <>
                    <Grid container spacing={4}>
                        {
                        noutingForm.map((card,index) => (
                            <Grid item key={card} xs={12} sm={6} md={4} spacing={3}>
                                <Card id={card.idzanytie} className={classes.card}>
                                    <CardMedia className={classes.cardMedia}
                                               image={card.img}
                                               title="Image title"/>
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h5" gutterBottom>
                                            {card.nazvanie}
                                        </Typography>
                                        <Typography>
                                            {card.fio_trener}
                                        </Typography>
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
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={()=>handleClickOpenModal(card.idzanytie, noutingForm[(state.stationNumber)-1], selectedDate)} size="small" color="primary">
                                            ЗАПИСЬ {console.log("idzanytie",card.idzanytie)}
                                        </Button>

                                        <Dialog
                                            open={state.openModal}
                                            TransitionComponent={Transition}
                                            keepMounted
                                            onClose={handleCloseModal}
                                            aria-labelledby="alert-dialog-slide-title"
                                            aria-describedby="alert-dialog-slide-description"
                                        >
                                            <DialogTitle id="alert-dialog-slide-title">Подтвердите запись</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-slide-description">
                                                    {noutingForm[(state.stationNumber)-1].nazvanie}
                                                </DialogContentText>
                                                <DialogContentText id="alert-dialog-slide-description">
                                                    <AccessTimeIcon/>{moment(selectedDate).format("LLLL")}
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                {console.log("RESULT", resultCount)}
                                                {resultCount ? (
                                                        <Button
                                                            onClick={() => handleClickOpen(noutingForm[(state.stationNumber) - 1], selectedDate, curEmail)}
                                                            color="primary">
                                                            Запись
                                                        </Button>)
                                                    : (
                                                        <>
                                                            <Button onClick={() => handleAlertOpen()} color="primary">
                                                                Запись
                                                            </Button>
                                                            <Dialog
                                                                open={alert}
                                                                onClose={handleAlertClose}
                                                                aria-labelledby="alert-dialog-title"
                                                                aria-describedby="alert-dialog-description"
                                                            >
                                                                <DialogTitle
                                                                    id="alert-dialog-title">{"Данное время уже занято"}</DialogTitle>
                                                                <DialogContent>
                                                                    <DialogContentText id="alert-dialog-description">
                                                                        Выбранное время для записи уже занято. Пожалуйста, выберете другое время или свяжитесь с нами по телефону для записи.
                                                                        тел: 895742024621
                                                                    </DialogContentText>
                                                                </DialogContent>
                                                                <DialogActions>
                                                                    <Button onClick={handleAlertClose} color="primary">
                                                                        Закрыть
                                                                    </Button>
                                                                </DialogActions>
                                                            </Dialog>
                                                        </>
                                                    )}
                                                <Button onClick={handleCloseModal} color="primary">
                                                    Назад
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                        <Button size="small" color="primary" onClick={handleClickOpenMore(card.idzanytie)}>
                                            Подробно
                                        </Button>
                                        <Dialog onClose={handleCloseMore} aria-labelledby="customized-dialog-title" open={more.openModalMore}>
                                            <DialogTitle id="customized-dialog-title" onClose={handleCloseMore}>
                                                <div className={classes.rootAvatar}>
                                                    <Avatar src={noutingForm[(more.stationNumber-1)].img} />
                                                    {noutingForm[(more.stationNumber-1)].nazvanie}
                                                </div>
                                            </DialogTitle>
                                            <DialogContent dividers>
                                                <Typography gutterBottom paragraph>
                                                    <PersonIcon fontSize="large" />{noutingForm[(more.stationNumber-1)].fio_trener}
                                                </Typography>
                                                <Typography gutterBottom paragraph>
                                                    <ScheduleIcon fontSize="large"/>
                                                    {moment(noutingForm[(more.stationNumber-1)].datatime).format("dddd, HH:MM")}
                                                </Typography>
                                                <Typography gutterBottom paragraph>
                                                    {noutingForm[(more.stationNumber-1)].opisaniepodrobno}
                                                </Typography>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button autoFocus onClick={handleCloseMore} color="primary">
                                                    Назад
                                                </Button>
                                            </DialogActions>
                                        </Dialog>

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
</>
    );
}