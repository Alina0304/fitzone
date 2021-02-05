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


export const NoutingPersonalTrenPage = () =>{
    const {loading, error, request, clearError} = useHttp();

    const [expanded, setExpanded] = React.useState(false);
    const [noutingForm, setNoutingForm] = useState([])
    const [selectedDate, handleDateChange] = useState(new Date());
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState([]);

    const handleClickOpen = async () => {
        //setOpen(true);
        try {
            const fetched = await request('/api/noutingpt/inserting', 'POST', null)
            console.log("",fetched)

        } catch (e) {
            console.log(e)
        }
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };


    const handleExpandClick = (index) => {
        setExpanded({ [index]: false })
    };


    const nouting = useCallback(async () => {
        console.log("Before try")
        try {
            const fetched = await request('/api/nouting/noutingpt', 'GET', null, {

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
    function SimpleDialog(props) {
        const classes = useStyles();
        const { onClose, selectedValue, open } = props;

        const handleClose = () => {
            onClose(selectedValue);
        };

        const handleListItemClick = (value) => {
            onClose(value);
        };

        return (
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Запись на персональную тренировку</DialogTitle>
                <List>
                    {noutingForm.map((form) => (
                        <ListItem button onClick={() => handleListItemClick(form.nazvanie)} key={form.idzanytie}>
                            <ListItemText primary={form.fio_trener} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        );
    }

    SimpleDialog.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        selectedValue: PropTypes.string.isRequired,
    };
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

                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={handleClickOpen} size="small" color="primary">
                                            ЗАПИСЬ {card.nazvanie}
                                        </Button>
                                        <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
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