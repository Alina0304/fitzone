import React, {useEffect, useState, useCallback} from 'react';
import {
    AppBar,
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import ChatBot from 'react-simple-chatbot';
import Button from "@material-ui/core/Button";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import moment from 'moment'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MobileStepper from '@material-ui/core/MobileStepper';
import {Loader} from "../components/Loader";
import Slide from '@material-ui/core/Slide';
import Avatar from "@material-ui/core/Avatar";


moment.lang('ru');
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(1)
    },
    Buttons: {
        position: "center"
    },
    title: {
        flexGrow: 1
    },
    text: {
        left: 10000000,
    },
    rootAvatar: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    mainFeaturesPost: {
        position: "relative",
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(img/slid.jpg)',
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
        padding: theme.spacing(40),
        marginTop: theme.spacing(8)

    },
    cardMedia: {
        // position:"right",
        padding: theme.spacing(20),
        //: 300,

    },
    cardContent: {
        flexGrow: 1
    },
    cardGrid: {
        marginTop: theme.spacing(4)
    },
    cover: {
        width: 300,
        length: 150,
    },
    rootswipe: {
        maxWidth: 400,
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
    },
    img: {
        height: 255,
        display: 'block',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    buttonPadding: {
        margin: "20px",
    },


}))
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const NotAufPage = () => {
    const {loading, request} = useHttp();
    const [infoFormZan, setInfoFormZan] = useState([])
    const [infoFormTrener, setInfoFormTrener] = useState([])
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        openModal: false,
        stationNumber: 1,
    });
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpenModal = stationNumber =>()=> {
        console.log("stationNumber",stationNumber )
        setState({openModal:true,stationNumber: stationNumber});
    };

    const handleCloseModal = () => {
        setState({openModal:false,stationNumber: 1});
    };
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = infoFormZan.length;
    const classes = useStyles();
    const theme = useTheme();
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    const steps = [
        {
            id: '1',
            message: 'Привет! Чем я могу тебе помочь?',
            trigger: '2',
        },
        {
            id: '2',
            options: [
                { value: 1, label: 'Узнать расписание', trigger: '3' },
                { value: 2, label: 'Как стать клиетом фитнес-клуба?', trigger: '4' },
                { value: 3, label: 'Какие тренировки есть?', trigger: '5' },
            ],
        },
        {
            id: '3',
            message: 'Мы работаем: Пн-Пт: 8:00-23:00, Сб-Вс: 9:00-21:00',
            trigger: '2',
        },
        {
            id: '4',
            message: 'Оставьте нам заявку на сайте, свяжитесь с нами в соц-сетях или позвоните по номеру: +********* наш менеджер свяжется с Вами!',
            trigger: "2",
        },
        {
            id: '5',
            message: 'Список наших тренировок: ',
            component: (
                    <div> {infoFormTrener.map((card) => (<Typography> variant="h4">{card.nazvanie}</Typography>))}</div>
            ),
            trigger: "2",
        },
    ];
    const info = useCallback(async () => {
        try {
            const fetched = await request('/api/notauf/fitzone', 'GET', null, {})
            setInfoFormZan(fetched.result)

        } catch (e) {
        }
    }, [request])
    const infoTrener = useCallback(async () => {
        try {
            const fetched = await request('/api/notauf/fitzonetreners', 'GET', null, {})
            setInfoFormTrener(fetched.result)

        } catch (e) {
        }
    }, [request])

    useEffect(() => {
        info()
    }, [])
    useEffect(() => {
        infoTrener()
    }, [])


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <>
            <main>
                <AppBar position='fixed'>
                    <Container fixed>
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}> FitZone
                            </Typography>
                            <Box mr={2}>
                                <Button component={Link} to="/login" color="inherit" align="left">
                                    Войти
                                </Button>
                            </Box>

                            <Button component={Link} to="/registration" color="inherit" align="left">Регистрация</Button>
                        </Toolbar>
                    </Container>
                </AppBar>
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
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
                <div className={classes.mainContent}>
                    <Container maxWidth="md">
                        <Typography variant="h2" align='center' color="textPrimary" gutterBottom> FitZone</Typography>
                        <Typography variant="h5" align='center' color="textSecondary" paragraph> Начни сегодня. Начни с
                            себя </Typography>
                        <div className={classes.mainButtons}>
                            <Grid container spacing={4} justify="center">
                                <Grid item>
                                    <Button component={Link} to="/login" variant="contained" color='primary'>
                                        Начать сейчас
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>

                <Container className={classes.cardGrid} maxWidth="md">

                    <Grid container spacing={4}>
                        <div className={classes.root} align="center">
                            {loading && <Loader/>}
                            {!loading && infoFormZan.length != 0 && (
                                <>
                                    <div className={classes.root} align="center">
                                        <Typography variant="h4">{infoFormZan[activeStep].nazvanie}</Typography>

                                        <Button className={classes.buttonPadding} variant="outlined" color="primary"
                                                onClick={handleClickOpen}>
                                            Узнать больше
                                        </Button>
                                        <Dialog
                                            open={open}
                                            TransitionComponent={Transition}
                                            keepMounted
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-slide-title"
                                            aria-describedby="alert-dialog-slide-description"
                                        >
                                            <DialogTitle
                                                id="alert-dialog-slide-title">{infoFormZan[activeStep].nazvanie}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-slide-description">
                                                    {infoFormZan[activeStep].opisaniepodrobno}

                                                </DialogContentText>
                                                <DialogContentText id="alert-dialog-slide-description">
                                                    <AccessTimeIcon/>{moment(infoFormZan[activeStep].datetime).format("dddd HH:MM")}
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose} color="primary">
                                                    ОК
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                    <img
                                        className={classes.img}
                                        src={infoFormZan[activeStep].img}
                                        alt={infoFormZan[activeStep].idtrenera}
                                    />
                                    <MobileStepper
                                        steps={maxSteps}
                                        position="static"
                                        variant="text"
                                        activeStep={activeStep}
                                        nextButton={
                                            <Button size="small" onClick={handleNext}
                                                    disabled={activeStep === maxSteps - 1}>
                                                Next
                                                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> :
                                                    <KeyboardArrowRight/>}
                                            </Button>
                                        }
                                        backButton={
                                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                                {theme.direction === 'rtl' ? <KeyboardArrowRight/> :
                                                    <KeyboardArrowLeft/>}
                                                Back
                                            </Button>
                                        }
                                    />
                                </>
                            )}

                        </div>
                    </Grid>
                </Container>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {
                            infoFormTrener.map((card) => (

                                <Grid item key={card} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardMedia className={classes.cardMedia}
                                                   image={card.img}
                                                   title="Image title"/>
                                        <CardContent className={classes.cardContent}>
                                            <Typography variant="h5" gutterBottom>
                                                {card.fio_trener}
                                            </Typography>
                                            <Typography> Стаж работы:
                                                {card.stag}
                                            </Typography>
                                            <Typography> Контактные данные:
                                                {card.phone}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary" onClick={handleClickOpenModal(card.idtrener)}>
                                                Подробнее
                                            </Button>
                                            <Dialog onClose={handleCloseModal} aria-labelledby="customized-dialog-title" open={state.openModal}>
                                                <DialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
                                                    <div className={classes.rootAvatar}>
                                                    <Avatar src={infoFormTrener[(state.stationNumber-1)].img} />
                                                    {infoFormTrener[(state.stationNumber-1)].fio_trener}
                                                    {console.log("Station number", state.stationNumber)}
                                                    </div>
                                                </DialogTitle>
                                                <DialogContent dividers>
                                                    <Typography gutterBottom paragraph>
                                                        {infoFormTrener[(state.stationNumber-1)].kategory}
                                                    </Typography>
                                                    <Typography gutterBottom paragraph>
                                                        {infoFormTrener[(state.stationNumber-1)].opisanie}
                                                    </Typography>
                                                    <Typography gutterBottom paragraph>
                                                        {infoFormTrener[(state.stationNumber-1)].citat}
                                                    </Typography>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button autoFocus onClick={handleCloseModal} color="primary">
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
                </Container>
            </main>
            <div align="right">
                <ChatBot
                    headerTitle="Speech Recognition"
                    recognitionEnable={true}
                    steps={steps}/>
            </div>
        </>
    );

}
