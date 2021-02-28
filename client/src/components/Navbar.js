import React, {useContext} from 'react'
import {Link as linkMaterial, AppBar,Container, Toolbar,IconButton,Box,Typography}from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Link, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {makeStyles} from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";


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
        //backgroundImage: "C:\\Users\\Alina\\WebstormProjects\\fittest\\src\\slider-1.jpg",
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

export const Navbar = () =>{
    const history=useHistory()
    const auth=useContext(AuthContext)
    const classes = useStyles();

    const logoutHandler=event=>{
        event.preventDefault()
        auth.logout()
        history.push('/fitzone')

    }
    return (
        <AppBar position='fixed'>
        <Container fixed>
            <Toolbar>
                <IconButton edge='start' color="inherit" aria-label='menu' className={classes.menuButton}>
                    <Avatar alt="Remy Sharp" src="img/slid.jpg" className={classes.large} />
                </IconButton>
                <Typography variant="h6" className={classes.title}> Fitness
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
                    <Button component={Link} to="/zanytiyPage" color="inherit" align="left">Групповые тренировки</Button>
                </Box>
                <Button component={Link} to="/" color="inherit" align="center" onClick={logoutHandler}>Выйти</Button>


            </Toolbar>
        </Container>
    </AppBar>

    )
}