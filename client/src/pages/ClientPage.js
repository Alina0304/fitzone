import React, {useCallback, useContext, useEffect, useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment'
import 'moment/locale/ru';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import FaceIcon from '@material-ui/icons/Face';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from '../context/AuthContext'
import {useHttp} from "../hooks/http.hook";
import {Loader} from '../components/Loader'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Card, CardMedia} from "@material-ui/core";
import {Diagram} from "../components/Diagram";
import {PayForm} from "../components/PayForm";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import BorderColorIcon from '@material-ui/icons/BorderColor';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

let rows = []
moment.locale('ru');
const drawerWidth = 240;
const formatter = new Intl.DateTimeFormat("ru", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
});
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 500,
    },
    cardMedia: {
        paddingTop: "101.25%"
    },
    table: {
        minWidth: 650,
    },
}));

export const ClientPage = (props) => {
    const {token} = useContext(AuthContext)
    const auth=useContext(AuthContext)
    const {loading, request} = useHttp();
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const curId = props.userId
    const curRole = props.role
    const history = useHistory()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [clientForm, setClientForm] = useState([{}])
    const [adminForm, setAdminForm] = useState([{}])
    const [trenerForm, setTrenerForm] = useState([{}])
    const [payForm, setPayForm] = useState([{}])
    const [payInfo, setPayInfo] = useState([{}])
    const [payModal, setPayModal] = useState(false)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/fitzone')
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClickOpenPay = async (card) => {
        setPayModal(true);
        console.log("idpt", card)
        try {
            const fetched = await request(`/api/tablepay/payinfo/${curId}`, 'POST', {card}, {Authorization: `Bearer ${token}`})
            console.log("PayInfo", fetched)
            setPayInfo(fetched.result)
            ptPay(fetched.result)

        } catch (e) {
            console.log("Ошибка", e)
        }
    }

    const handleClosePay = () => {
        setPayModal(false);
    };


    const submitTren = async (card, statusNew) => {
        try {
            const fetched = await request(`/api/client/clientPage/admin/updating/${curId}`, 'POST', {
                ...card,
                statusNew
            }, {Authorization: `Bearer ${token}`})
            console.log("", fetched)

        } catch (e) {
            console.log(e)
        }
        switch (curRole) {
            case 'admin':
                admin()
                break
            case 'tren':
                trener()
                break
            case 'cl':
                break
        }
    }

    const client = useCallback(async () => {
        try {
            const fetched = await request(`/api/client/clientPage/client/${curId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setClientForm(fetched.result)
        } catch (e) {
            console.log(e)
        }
    }, [request, token, curId])
    const admin = useCallback(async () => {
        try {
            const fetched = await request(`/api/client/clientPage/admin/${curId}`, 'GET', null, {Authorization: `Bearer ${token}`})
            setAdminForm(fetched.result)
        } catch (e) {
            console.log(e)
        }
    }, [request, token, curId])
    const trener = useCallback(async () => {
        try {
            const fetched = await request(`/api/client/clientPage/trener/${curId}`, 'GET', null, {Authorization: `Bearer ${token}`})
            setTrenerForm(fetched.result)
        } catch (e) {
            console.log(e)
        }
    }, [request, token, curId])
    const payTable = useCallback(async () => {
        try {
            const fetched = await request(`/api/tablepay/tablepay/${curId}`, 'GET', null, {Authorization: `Bearer ${token}`})
            console.log("Fetched", fetched)
            setPayForm(fetched.result)

        } catch (e) {
        }
    }, [request, token, curId])

    const ptPay = async (card) => {
        console.log("PTPay", card)
        try {
            const fetched = await request(`/api/tablepay/insertinfo/${curId}`, 'POST', {...card}, {Authorization: `Bearer ${token}`})
            console.log("Fetched", fetched)
        } catch (e) {
            console.log("Ошибка", e)
        }
    }


    useEffect(() => {
        payTable()
    }, [])

    useEffect(() => {
        client()
    }, [])
    useEffect(() => {
        admin()
        console.log("AdminForm", adminForm)
    }, [])
    useEffect(() => {
        trener()
    }, [])
    if (loading) {
        return <Loader/>
    }
console.log("PayInfo", payInfo)
    return (
        <>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    {loading && <Loader/>}
                    {!loading && clientForm.length != 0 && (
                        <>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon/>
                        </IconButton>

                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            {clientForm[0]["FIO_cl"]}
                        </Typography>

                        <Box mr={2}>
                            <Button component={Link} to="/clientPage" color="inherit" align="left">
                                Клиент
                            </Button>
                        </Box>
                        <Box mr={2}>
                            <Button component={Link} to="/trenersPage" color="inherit" align="left">Тренеры</Button>
                        </Box>
                        <Box mr={2}>
                            <Button component={Link} to="/zanytiyPage" color="inherit" align="left">Групповые
                                тренировки</Button>
                        </Box>
                        <Button component={Link} to="/fitzone" color="inherit" align="center"
                                onClick={logoutHandler}>Выйти</Button>
                    </Toolbar>
                        </>
                    )}
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>

                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        <ListItem button component={Link} to="/abonpay">
                        <ListItemIcon>
                            <FaceIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Продлить абонемент"/>
                    </ListItem>
                        <ListItem button component={Link} to="/noutingpt">
                            <ListItemIcon>
                                <FitnessCenterIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Записаться"/>
                        </ListItem>
                        {curRole=='admin' && (
                        <ListItem button component={Link} to="/registration">
                            <ListItemIcon>
                                <BorderColorIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Зарегестрировать"/>
                        </ListItem>
                        )}
                    </List>
                    <Divider/>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            {loading && <Loader/>}
                            {!loading && clientForm.length != 0 && (

                            <Grid item xs={12} md={4} lg={3}>
                                <Card>
                                    <CardMedia className={classes.cardMedia}
                                               image={clientForm[0]["img"]}
                                               title="Image title"/>
                                </Card>
                            </Grid>

                                )}
                            {/* Chart */}
                            <Grid item xs={12} md={8} lg={9}>
                                {loading && <Loader/>}
                                {!loading && (adminForm.length != 0 || clientForm.length != 0) && (
                                    <>
                                        <Paper className={fixedHeightPaper}>
                                            <TableContainer component={Paper}>
                                                <Table className={classes.table} size="small"
                                                       aria-label="a dense table">
                                                    {curRole == 'admin' && (
                                                        <>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="center">ФИО клиента</TableCell>
                                                                    <TableCell align="center">Название</TableCell>
                                                                    <TableCell align="center">Дата и время</TableCell>
                                                                    <TableCell align="center">Тренер</TableCell>
                                                                    <TableCell align="center">Статус</TableCell>
                                                                    <TableCell align="center">Подтвердить</TableCell>
                                                                    <TableCell align="center">Отменить</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>

                                                                {adminForm.map((row, index) => (
                                                                    <TableRow key={row.nazvanie}>

                                                                        <TableCell
                                                                            align="center">{row.FIO_cl}</TableCell>
                                                                        <TableCell align="center">{row.nazvanie}</TableCell>
                                                                        <TableCell align="center">
                                                                            {moment(row.datatime).format('LLLL')}</TableCell>
                                                                        <TableCell
                                                                            align="center">{row.fio_trener}</TableCell>
                                                                        <TableCell
                                                                            align="center">{row.status}</TableCell>
                                                                        <TableCell align="center"><CheckIcon
                                                                            onClick={() => submitTren(adminForm[index], "yes")}/></TableCell>
                                                                        <TableCell align="center"><CloseIcon
                                                                            onClick={() => submitTren(adminForm[index], "no")}/></TableCell>

                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>

                                                        </>
                                                    )}
                                                    {curRole == 'cl' && (
                                                        <>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="center">Название</TableCell>
                                                                    <TableCell align="center">Дата и время</TableCell>
                                                                    <TableCell align="center">Тренер</TableCell>
                                                                    <TableCell align="center">Статус</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {clientForm.map((row) => (
                                                                    <TableRow key={row.nazvanie}>
                                                                        <TableCell align="center">{row.nazvanie}</TableCell>
                                                                        <TableCell align="center">
                                                                            {moment(row.datatime).format('LLLL')}</TableCell>
                                                                        <TableCell
                                                                            align="center">{row.fio_trener}</TableCell>
                                                                        <TableCell
                                                                            align="center">{row.status}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>

                                                        </>
                                                    )}
                                                    {curRole == 'tren' && (
                                                        <>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="center">ФИО клиента</TableCell>
                                                                    <TableCell align="center">Название</TableCell>
                                                                    <TableCell align="center">Дата и время</TableCell>
                                                                    <TableCell align="center">Тренер</TableCell>
                                                                    <TableCell align="center">Статус</TableCell>
                                                                    <TableCell align="center">Подтвердить</TableCell>
                                                                    <TableCell align="center">Отменить</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>

                                                                {trenerForm.map((row, index) => (
                                                                    <TableRow key={row.nazvanie}>

                                                                        <TableCell
                                                                            align="center">{row.FIO_cl}</TableCell>
                                                                        <TableCell align="center">{row.name}</TableCell>
                                                                        <TableCell align="center">
                                                                            {moment(row.datatime).format('LLLL')}</TableCell>
                                                                        <TableCell
                                                                            align="center">{row.fio_trener}</TableCell>
                                                                        <TableCell
                                                                            align="center">{row.status}</TableCell>
                                                                        <TableCell align="center"><CheckIcon
                                                                            onClick={() => submitTren(trenerForm[index], "yes")}/></TableCell>
                                                                        <TableCell align="center"><CloseIcon
                                                                            onClick={() => submitTren(trenerForm[index], "no")}/></TableCell>

                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </>
                                                    )}
                                                </Table>
                                            </TableContainer>
                                        </Paper>
                                    </>
                                )}
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    {curRole == 'admin' && (
                                        <>
                                            <Diagram/>

                                        </>
                                    )}
                                    {curRole == 'cl' && (
                                        <>
                                        <Paper className={fixedHeightPaper}>
                                            <TableContainer component={Paper}>
                                                <Table className={classes.table} size="small"
                                                       aria-label="a dense table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="center">Название</TableCell>
                                                            <TableCell align="center">Тренер</TableCell>
                                                            <TableCell align="center">Дата и время</TableCell>
                                                            <TableCell align="center">Статус оплаты</TableCell>
                                                            <TableCell align="center">Оплатить</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {payForm.map((row, index) => (
                                                            <TableRow key={row.name}>
                                                                <TableCell align="center">{row.nazvanie}</TableCell>
                                                                <TableCell
                                                                    align="center">{row.fio_trener}</TableCell>
                                                                <TableCell align="center">
                                                                    {moment(row.datatime).format('LLLL')}</TableCell>
                                                                <TableCell
                                                                    align="center">no</TableCell>
                                                                <TableCell align="center">
                                                                   <Button
                                                                       color="inherit"
                                                                       align="center"
                                                                       startIcon={<CheckIcon align="center"/>}
                                                                       onClick={()=>handleClickOpenPay(payForm[index].idpt)}
                                                                       >Оплатить</Button>
                                                                    <Dialog
                                                                        open={payModal}
                                                                        onClose={handleClosePay}
                                                                        aria-labelledby="responsive-dialog-title"
                                                                    >
                                                                        <DialogTitle id="responsive-dialog-title">{"Выберите подходящий способ оплаты"}</DialogTitle>
                                                                        <DialogContent>
                                                                            <DialogContentText>
                                                                                <PayForm type={"Оплата персональной тренировки"} sum={payInfo[0].sum}/>
                                                                            </DialogContentText>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Paper>
                                        </>
                                    )}

                                </Paper>
                            </Grid>
                        </Grid>
                            {curRole == 'admin' && (
                            <>
                            <Paper className={fixedHeightPaper}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} size="small"
                                           aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">Сотрудник</TableCell>
                                                <TableCell align="center">Уровень доступа</TableCell>
                                                <TableCell align="center">Изменить уровень прав</TableCell>
                                                <TableCell align="center">Подтвердить</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {payForm.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell align="center">{row.nazvanie}</TableCell>
                                                    <TableCell
                                                        align="center">{row.fio_trener}</TableCell>
                                                    <TableCell align="center">
                                                        {moment(row.datatime).format('LLLL')}</TableCell>
                                                    <TableCell
                                                        align="center">no</TableCell>
                                                    <TableCell align="center">
                                                        <Button
                                                            component={Link} to="/pay"
                                                            color="inherit"
                                                            align="center"
                                                            startIcon={<CheckIcon align="center"/>}
                                                        >Оплатить</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                            </>
                            )}
                    </Container>
                </main>

            </div>
        </>

    );
}

