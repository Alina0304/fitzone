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
import { DataGrid } from '@material-ui/data-grid';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import DialogActions from "@material-ui/core/DialogActions";


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
    const [clientsTrenForm, setClientsTrenForm] = useState([{}])
    const [adminForm, setAdminForm] = useState([{}])
    const [trenerForm, setTrenerForm] = useState([{}])
    const [payForm, setPayForm] = useState([{}])
    const [payInfo, setPayInfo] = useState([{}])
    const [payModal, setPayModal] = useState(false)
    const [rowsClient, setRowsClient] = useState([{id:1}])
    const [rowsAdmin, setRowsAdmin] = useState([{id:1}])
    const [rowsTrener, setRowsTrener] = useState([{id:1}])
    const [select, setSelect] = useState([])

    const columns = [
        { field: 'FIO_cl', headerName: 'ФИО клиента', width: 150 },
        { field: 'nazvanie', headerName: 'Название', width: 150 },
        { field: 'fio_trener', headerName: 'ФИО тренера', width:150 },
        { field: 'datatime', headerName: 'Дата и время', width: 150},
        {
            field: 'status',
            headerName: 'Статус',
            width: 120,
        },
    ];
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
    const handleModalPayOpen = () => {
        setPayModal(true);
    };
    const handleModalPayСlose = () => {
        setPayModal(false);
    };

    const submitTren = async (id, statusNew) => {
        console.log("card", id)
        try {
            const fetched = await request(`/api/client/clientPage/admin/updating/${curId}`, 'POST', {
                id,
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
            console.log('ИНформация о пользователе', fetched.result)
            setClientForm(fetched.result)
        } catch (e) {
            console.log(e)
        }
    }, [request, token, curId])

    const clientsTren = useCallback(async () => {
        try {
            const fetched = await request(`/api/client/clientPage/clientstren/${curId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log('ИНформация о пользователе111', fetched.result)
            setRowsClient(fetched.result)
            //setClientsTrenForm(fetched.result)
        } catch (e) {
            console.log(e)
        }
    }, [request, token, curId])

    const admin = useCallback(async () => {
        try {
            const fetched = await request(`/api/client/clientPage/admin/${curId}`, 'GET', null, {Authorization: `Bearer ${token}`})
           // setAdminForm(fetched.result)
            setRowsAdmin(fetched.result)
            console.log("!!!",adminForm)
        } catch (e) {
            console.log(e)
        }
    }, [request, token, curId])
    const trener = useCallback(async () => {
        try {
            const fetched = await request(`/api/client/clientPage/trener/${curId}`, 'GET', null, {Authorization: `Bearer ${token}`})
            setRowsTrener(fetched.result)
            //setTrenerForm(fetched.result)
        } catch (e) {
            console.log(e)
        }
    }, [request, token, curId])


        useEffect(() => {
            admin()
            console.log("AdminForm", adminForm)
        }, [])
        useEffect(() => {
            trener()
        }, [])
        useEffect(() => {
            client()
            clientsTren()
        }, [])

    if (loading) {
        return <Loader/>
    }
console.log("PayInfo", payInfo)
    return (
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
                        <ListItem button component={Link} to="/longingabon">
                        <ListItemIcon>
                            <FaceIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Продлить абонемент"/>
                    </ListItem>
                        <ListItem button component={Link} to="/offlinepay">
                            <ListItemIcon>
                                <AccountBalanceWalletIcon />
                            </ListItemIcon>
                            <ListItemText primary="Оплатить"/>
                        </ListItem>
                        {curRole=='cl' && (
                            <>
                            <ListItem button component={Link} to="/noutingpt">
                                <ListItemIcon>
                                    <FitnessCenterIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Записаться"/>
                            </ListItem>
                            </>
                        )}
                        {curRole=='admin' && (
                            <>
                        <ListItem button component={Link} to="/registration">
                            <ListItemIcon>
                                <BorderColorIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Зарегестрировать"/>
                        </ListItem>

                            <ListItem button component={Link} to="/nout">
                            <ListItemIcon>
                            <BorderColorIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Запись"/>
                            </ListItem>
                        </>
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
                                {!loading && (rowsAdmin.length > 1 || rowsClient.length >1 || rowsTrener.length>1) && (
                                        <Paper className={fixedHeightPaper}>
                                            <TableContainer component={Paper}>
                                                <Table className={classes.table} size="small"
                                                       aria-label="a dense table">
                                                    {curRole == 'admin' && rowsAdmin.length >1 && (
                                                        <div>
                                                            <div style={{height: 400, width: '100%'}}>
                                                                    <DataGrid rows={rowsAdmin} columns={columns}
                                                                              pageSize={5} checkboxSelection onRowSelected={(x) => setSelect(x.data.id)}/>
                                                        </div>
                                                            <div align="right">
                                                                <Button onClick={()=>submitTren(select, "yes")}>Подтвердить</Button>
                                                                <Button onClick={()=>submitTren(select, "no")}>Отменить</Button>
                                                            </div>
                                                        </div>
                                                        )}
                                                    {curRole == 'cl' && rowsClient.length>1 && (
                                                        <>
                                                            <div align="right">
                                                                <div align="right">
                                                                    <Button onClick={handleModalPayOpen}>Оплатить</Button>
                                                                </div>
                                                                <Dialog
                                                                    open={payModal}
                                                                    keepMounted
                                                                    onClose={handleModalPayСlose}
                                                                    aria-labelledby="alert-dialog-slide-title"
                                                                    aria-describedby="alert-dialog-slide-description"
                                                                >
                                                                    <DialogTitle id="alert-dialog-slide-title">Оплата персональной тренировки</DialogTitle>
                                                                    <DialogContent>
                                                                        <PayForm />
                                                                    </DialogContent>
                                                                    <DialogActions>
                                                                        <Button onClick={handleModalPayСlose} color="primary">
                                                                            Позже
                                                                        </Button>
                                                                    </DialogActions>
                                                                 </Dialog>
                                                            </div>
                                                            <div style={{height: 400, width: '100%'}}>
                                                                <DataGrid rows={rowsClient} columns={[
                                                                    { field: 'fio_trener', headerName: 'ФИО тренера', width: 150 },
                                                                    { field: 'nazvanie', headerName: 'Название', width: 150 },
                                                                    { field: 'datatime', headerName: 'Дата и время', width: 150},
                                                                    { field: 'status', headerName: 'Статус', width: 120,},
                                                                    { field: 'oplacheno', headerName: 'Оплачено', width: 120,},
                                                                    { field: 'sumkoplate', headerName: 'Сумма к оплате', width: 120,},]}
                                                                          pageSize={5} checkboxSelection onRowSelected={(x) => setSelect(x.data.id)}/>
                                                            </div>
                                                            <div align="right">
                                                                <Button onClick={()=>submitTren(select, "yes")}>Подтвердить</Button>
                                                                <Button onClick={()=>submitTren(select, "no")}>Отменить</Button>
                                                            </div>

                                                        </>
                                                    )}
                                                    {curRole == 'tren' && rowsTrener.length>1 && (
                                                        <>
                                                            <div style={{height: 400, width: '100%'}}>
                                                                <DataGrid rows={rowsTrener} columns={[
                                                                    { field: 'FIO_cl', headerName: 'ФИО клиента', width: 150 },
                                                                    { field: 'nazvanie', headerName: 'Название', width: 150 },
                                                                    { field: 'datatime', headerName: 'Дата и время', width: 150},
                                                                    { field: 'status', headerName: 'Статус', width: 120,},
                                                                   ]}
                                                                          pageSize={5} checkboxSelection onRowSelected={(x) => setSelect(x.data.id)}/>
                                                            </div>
                                                            <div align="right">
                                                                <Button onClick={()=>submitTren(select, "yes")}>Подтвердить</Button>
                                                                <Button onClick={()=>submitTren(select, "no")}>Отменить</Button>
                                                            </div>
                                                        </>
                                                    )}
                                                </Table>
                                            </TableContainer>
                                        </Paper>
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

                                </Paper>
                            </Grid>
                        </Grid>
                            {curRole == 'admin' && (
                            <>
                            <Paper className={fixedHeightPaper}>

                            </Paper>
                            </>
                            )}
                    </Container>
                </main>

            </div>

    );
}

