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
            <Alert severity="warning">
                <AlertTitle>Недействительная ссылка</AlertTitle>
                Ссылка для воостановления пароля не действительна <Link to="/resetpassword"><strong>попробовать снова!</strong></Link>
            </Alert>
        </div>
    )
}