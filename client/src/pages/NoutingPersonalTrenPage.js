import React, {useContext, useEffect, useState,useCallback} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {useHttp} from "../hooks/http.hook";
import {Link} from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {AuthContext} from "../context/AuthContext";

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


export const NoutingPersonalTrenPage = (props) =>{
    const {loading, error, request, clearError} = useHttp();
    const {token} = useContext(AuthContext)
    const curId = props.userId
    const [noutingForm, setNoutingForm] = useState([{
        idzanytie:'',nazvanie:'', fio_trener:'',idtrener:'', img:'',datatime:''
    }])
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [open, setOpen] = React.useState(false);
const handleDateChange=(date)=>{
    console.log(date);
    setSelectedDate(date);
}
    const handleClickOpen = async (card) => {
        //setOpen(true);
        try {
            const fetched = await request(`/api/nouting/inserting/${curId}`, 'POST',{...card,selectedDate},{Authorization: `Bearer ${token}`})
            console.log("",fetched)

        } catch (e) {
            console.log(e)
        }
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
    }, [request])

    useEffect(() => {
        nouting()
    }, [])
    const classes = useStyles();
    console.log("SelectedDate", selectedDate)
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
                <Grid container spacing={4}>
                    {
                        noutingForm.map((card) => (

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
                                        <Button onClick={()=>handleClickOpen(card,selectedDate)} size="small" color="primary">
                                            ЗАПИСЬ {card.nazvanie}
                                        </Button>
                                        <Button size="small" color="primary">
                                            УЗНАТЬ БОЛЬШЕ
                                        </Button>

                                </CardActions>

                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </main>
</>
    );
}