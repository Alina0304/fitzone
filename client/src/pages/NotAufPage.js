import React, {useEffect, useState, useCallback} from 'react';
import {
    AppBar,
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid, IconButton,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import moment from 'moment'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import MobileStepper from '@material-ui/core/MobileStepper';
import {Loader} from "../components/Loader";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


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
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        display: 'block',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
    },


}))
let zanytie = []
export const NotAufPage = () => {
    const {loading, request} = useHttp();
    const [infoForm, setInfoForm] = useState([])
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = infoForm.length;
    const classes = useStyles();
    const theme = useTheme();
    const info = useCallback(async () => {
        console.log("Before try")
        try {
            console.log("try")
            const fetched = await request('/api/notauf/fitzone', 'GET', null, {})
            console.log("loading2", loading)
            for (let i = 0; i < fetched.result.length; i++) {
                zanytie[i] = {
                    idzanytie: fetched.result[i].idzanytie,
                    datetime: fetched.result[i].datetime,
                    numberzal: fetched.result[i].numberzal,
                    nazvanie: fetched.result[i].nazvanie,
                    img: fetched.result[i].img,
                    opisanie: fetched.result[i].opisanie
                }
            }
            console.log("zanytie", zanytie)
            setInfoForm(fetched.result)

        } catch (e) {
        }
    }, [request])

    useEffect(() => {
        info()
    }, [])

    console.log("infoForm", infoForm)
    console.log("zanytie", zanytie)
    console.log("loading", loading)
    console.log("infoFormLength", infoForm.length)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    if (loading) {
        return <Loader/>
    }
    return (
        <>
            <main>
                <AppBar position='fixed'>
                    <Container fixed>
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}> FitZone
                            </Typography>
                            <Box mr={2}>
                                <Button component={Link} to="/" color="inherit" align="left">
                                    Войти
                                </Button>
                            </Box>

                            <Button component={Link} to="/" color="inherit" align="left">Регистрация</Button>
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
                                    <Button component={Link} to="/" variant="contained" color='primary'>
                                        Start now
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        <div className={classes.root}>
                            {!loading && infoForm.length!=0 && (
                                <>
                                    <Paper square elevation={0} className={classes.header}>
                                        <Typography>{infoForm[activeStep].label}</Typography>
                                    </Paper>
                                    <img
                                        className={classes.img}
                                        src={infoForm[activeStep].imgPath}
                                        alt={infoForm[activeStep].label}
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
            </main>
        </>
    );

}
