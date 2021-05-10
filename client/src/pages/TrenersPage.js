import React, {useContext, useEffect, useState,useCallback} from 'react';
import {AppBar,Container, Toolbar, IconButton, Typography,Box,Paper,Grid,Card,CardMedia,CardContent, CardActions} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useHttp} from "../hooks/http.hook";
import { makeStyles } from '@material-ui/core/styles';
import {Loader} from "../components/Loader";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {Link} from "react-router-dom";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import NativeSelect from "@material-ui/core/NativeSelect";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import useMediaQuery from "@material-ui/core/useMediaQuery";


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
    select:{
        marginTop:theme.spacing(2)
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


export const TrenersPage = (props) => {
    const {request,loading} = useHttp();
    const curRole=props.role
    const [trenerForm, setTrenerForm] = useState([{}])
    const [name, setName]=useState()
    const [stag, setStag]=useState()
    const [phone, setPhone]=useState()
    const [kategory, setKategory]=useState()
    const [opisanie, setOpisanie]=useState()
    const [citat, setCitat]=useState()
    const [trener, setIdTrener]=useState()
    const [state, setState] = useState({openModal: false, stationNumber: 1});
    const [stateDelete, setStateDelete] = useState({openModalDelete: false, stationNumber: 1});
    const [statePodrobno, setStatePodrobno] = React.useState({
        openModalPodrobno: false,
        stationNumber: 1,
    });

    const handleChangeName =(event) => {
        setName(event.target.value)
    };
    const handleChangeStag = (event) => {
        setStag(event.target.value);
    };
    const handleChangePhone =(event) => {
        setPhone(event.target.value)
    };
    const handleChangeKategory =(event) => {
        setKategory(event.target.value)
    };
    const handleChangeOpisanie =(event) => {
        setOpisanie(event.target.value)
    };
    const handleChangeCitat =(event) => {
        setCitat(event.target.value)
    };

    const handleClickOpenModal = stationNumber =>()=> {
        setStatePodrobno({openModalPodrobno:true,stationNumber: stationNumber});
    };

    const handleCloseModal = () => {
        setStatePodrobno({openModalPodrobno:false,stationNumber: 1});
    };

    const handleClickOpen = async (name, stag, phone, kategory, opisanie, citat, trener) => {
        //setOpen(true);
        try {
            const fetched = await request('/api/trener/trenersPage', 'POST',{name, stag, phone, kategory, opisanie, citat, trener})
            console.log("",fetched)
            handleClose()
        } catch (e) {
            console.log(e)
        }
    };

    const handleOpen = stationNumber =>()=> {
        console.log("stationNumber",stationNumber )
        setState({openModal:true,stationNumber: stationNumber});
        setName(trenerForm[stationNumber-1].fio_trener)
        setStag(trenerForm[stationNumber-1].stag)
        setPhone(trenerForm[stationNumber-1].phone)
        setKategory(trenerForm[stationNumber-1].kategory)
        setOpisanie(trenerForm[stationNumber-1].opisanie)
        setCitat(trenerForm[stationNumber-1].citat)
        setIdTrener(stationNumber)
    };

    const handleClose = () => {
        setState({openModal:false,stationNumber: 1});
        treners()
    };

    const handleOpenDelete = stationNumber =>()=> {
        console.log("stationNumber",stationNumber )
        setStateDelete({openModalDelete:true,stationNumber: stationNumber});

    };

    const handleCloseDelete = () => {
        setStateDelete({openModalDelete:false,stationNumber: 1});
        treners()
    };
    const treners = useCallback(async () => {
        console.log("Before try")
        try {
            const fetched = await request('/api/trener/trenersPage', 'GET', null, {

            })
            console.log("Fetched",fetched)
            console.log("Преобразование 1", fetched.result[0].img)
            setTrenerForm(fetched.result)

        } catch (e) {}
    }, [request])

    useEffect(() => {
        treners()
    }, [])

    const classes = useStyles();

     return (
        <main>
            {loading && <Loader/>}
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
                    <Typography variant="h2" align='center' color="textPrimary" gutterBottom> FitZone</Typography>
                    <Typography variant="h5" align='center' color="textSecondary" paragraph> Начни сегодня. Начни с
                        себя </Typography>
                    <div className={classes.mainButtons}>
                        <Grid container spacing={4} justify="center">
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color='primary'
                                    component={Link} to="/noutingpt">
                                    Start now
                                </Button>
                            </Grid>
                            <Grid item>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                {loading && <Loader/>}
                {!loading && trenerForm.length != 0 && (
                    <>
                <Grid container spacing={4}>
                    {
                        trenerForm.map((card) => (

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
                                            Подробно
                                        </Button>
                                        <Dialog onClose={handleCloseModal} aria-labelledby="customized-dialog-title" open={statePodrobno.openModalPodrobno}>
                                            <DialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
                                                <div className={classes.rootAvatar}>
                                                    <Avatar src={trenerForm[(statePodrobno.stationNumber)-1].img} />
                                                    {trenerForm[(statePodrobno.stationNumber)-1].fio_trener}
                                                </div>
                                            </DialogTitle>
                                            <DialogContent dividers>
                                                <Typography gutterBottom paragraph>
                                                    {trenerForm[(statePodrobno.stationNumber)-1].kategory}
                                                </Typography>
                                                <Typography gutterBottom paragraph>
                                                    {trenerForm[(statePodrobno.stationNumber)-1].opisanie}
                                                </Typography>
                                                <Typography gutterBottom paragraph>
                                                    {trenerForm[(statePodrobno.stationNumber)-1].citat}
                                                </Typography>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button autoFocus onClick={handleCloseModal} color="primary">
                                                    Назад
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                        {curRole=='admin' && (
                                            <>
                                                <Button size="small" color="primary" onClick={handleOpen(card.idtrener)}>
                                                    Редактировать
                                                </Button>
                                                <Dialog open={state.openModal} onClose={handleClose} aria-labelledby="form-dialog-title">
                                                    <DialogTitle id="form-dialog-title">Редактировать {trenerForm[(state.stationNumber)-1].fio_trener}</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText>
                                                            Редактировать тренера
                                                        </DialogContentText>
                                                        <div>
                                                            <FormControl className={classes.formControl}>
                                                                <TextField
                                                                    autoFocus
                                                                    onChange={handleChangeName}
                                                                    value={name}
                                                                    margin="dense"
                                                                    id="name"
                                                                    label="ФИО тренера"
                                                                    defaultValue={trenerForm[(state.stationNumber)-1].fio_trener}
                                                                    fullWidth
                                                                />
                                                            </FormControl>
                                                            <FormControl className={classes.formControl}>
                                                                <TextField
                                                                    autoFocus
                                                                    onChange={handleChangeStag}
                                                                    value={stag}
                                                                    margin="dense"
                                                                    id="stag"
                                                                    label="Стаж работы"
                                                                    defaultValue={trenerForm[(state.stationNumber)-1].stag}
                                                                    fullWidth
                                                                />
                                                            </FormControl>
                                                        </div>
                                                        <div>
                                                            <FormControl className={classes.formControl}>
                                                                <TextField
                                                                    autoFocus
                                                                    onChange={handleChangePhone}
                                                                    value={phone}
                                                                    margin="dense"
                                                                    id="phone"
                                                                    label="Контактный телефон"
                                                                    defaultValue={trenerForm[(state.stationNumber)-1].phone}
                                                                    fullWidth
                                                                />
                                                            </FormControl>
                                                            <NativeSelect className={classes.select}
                                                                defaultValue={trenerForm[(state.stationNumber)-1].kategory}
                                                                inputProps={{
                                                                    id: 'kategory',
                                                                }}
                                                                onChange={handleChangeKategory}
                                                            >
                                                                {trenerForm.map((option) => (
                                                                    <option value={option.kategory} key=
                                                                        {option.idtrener}>
                                                                        {option.kategory}
                                                                    </option>
                                                                ))}
                                                            </NativeSelect>
                                                        </div>

                                                    </DialogContent>
                                                    <FormControl className={classes.formControl}>
                                                        <FormHelperText>Информация о тренере</FormHelperText>
                                                        <TextareaAutosize
                                                            rowsMax={5}
                                                            onChange={handleChangeOpisanie}
                                                            aria-label="Информация о тренере"
                                                            placeholder="Maximum 4 rows"
                                                            defaultValue={trenerForm[(state.stationNumber)-1].opisanie}
                                                        />
                                                    </FormControl>
                                                    <FormControl className={classes.formControl}>
                                                        <FormHelperText>Мотивация</FormHelperText>
                                                        <TextareaAutosize
                                                            rowsMax={5}
                                                            onChange={handleChangeCitat}
                                                            aria-label="Мотивация"
                                                            placeholder="Maximum 4 rows"
                                                            defaultValue={trenerForm[(state.stationNumber)-1].citat}
                                                        />
                                                    </FormControl>

                                                    <DialogActions>
                                                        <Button onClick={handleClose} color="primary">
                                                            Отменить
                                                        </Button>
                                                        <Button onClick={()=>handleClickOpen(name, stag, phone, kategory, opisanie, citat, trener)} color="primary">
                                                            {console.log('ZanForm',trenerForm[(state.stationNumber)-1])}
                                                            Изменить
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                                <Button size="small" color="primary" onClick={handleOpenDelete(card.idtrener)}>
                                                    Удалить
                                                </Button>
                                                <Dialog
                                                    open={stateDelete.openModalDelete}
                                                    onClose={handleCloseDelete}
                                                    aria-labelledby="delete-dialog-title"
                                                >
                                                    <DialogTitle id="delete-dialog-title">Удалить {trenerForm[(state.stationNumber)-1].fio_trener}</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText>
                                                            Вы действительно хотите удалить тренера {trenerForm[(state.stationNumber)-1].fio_trener}?
                                                            Восстановление информации будет невозможно.
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button autoFocus onClick={handleCloseDelete} color="primary">
                                                            Удалить
                                                        </Button>
                                                        <Button onClick={handleCloseDelete} color="primary" autoFocus>
                                                            Отменить
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