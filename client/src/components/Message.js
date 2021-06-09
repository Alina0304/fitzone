import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));
export const AlertPass = () =>{
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Alert severity="error">
                <AlertTitle>Неверные данные для входа</AlertTitle>
                Вы ввели неверный логин пользователя или пароль: <Link to="/login"><strong>попробутйе снова </strong></Link>
                или <Link to="/resetpassword"><strong>восстановите пароль.</strong></Link>
            </Alert>
        </div>
    )
}