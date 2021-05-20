import React, {useContext, useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/Lock';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {useHttp} from "../hooks/http.hook";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import PersonIcon from "@material-ui/icons/Person";
import ScheduleIcon from "@material-ui/icons/Schedule";
import moment from "moment";
import DialogActions from "@material-ui/core/DialogActions";
import {CardActions} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        height: '93vh',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const ResetPage = () => {
    const {request,loading} = useHttp();
    const [email, setEmail]=useState()
    const [state, setState]=useState(false)
    const handleChangeEmail =(event) => {
        setEmail(event.target.value)
        console.log("event.target.value", event.target.value)
    };
    const handleCloseModal = () => {
        setState(false);
    };
    const handleOpenModal = () => {
        setState(true);
    };
    const reset = async () => {
        handleOpenModal()
        try {
            const data = await request('/api/reset/inputemail', 'POST', {email})
            console.log("Data", data);

        } catch (e) {
            console.log(e)
        }
    }
    const classes = useStyles();
    return (
        <Grid container component="main" className={classes.root}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Восстановление пароля
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChangeEmail}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={reset}
                    >
                       Восстановить доступ
                    </Button>
                    <Dialog onClose={handleCloseModal} aria-labelledby="customized-dialog-title" open={state}>
                        <DialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
                            <Typography variant='h5' gutterBottom>
                                Запрос на восстановление пароля
                            </Typography>
                        </DialogTitle>
                        <DialogContent dividers>
                            <Typography gutterBottom paragraph>
                               На указанный адрес электронной почты: {email} выслана ссылка для восстановления пароля.
                            </Typography>
                            <Typography gutterBottom paragraph>
                               Если Вам не пришло письмо, пожалуйста, проверьте папку СПАМ и корректность адреса электрронной почты.
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleCloseModal} color="primary">
                                ОК
                            </Button>
                        </DialogActions>
                    </Dialog>
                </form>
            </div>
        </Container>
        </Grid>
    );
}