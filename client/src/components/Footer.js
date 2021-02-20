import React, {useContext} from 'react'
import {Link as linkMaterial, AppBar,Container, Toolbar,IconButton,Box,Typography}from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Link, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {makeStyles} from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import BottomNavigation from "@material-ui/core/BottomNavigation";


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

export const Footer = () =>{
    const history=useHistory()
    const auth=useContext(AuthContext)
    const classes = useStyles();
    return (
       <footer>
           <Typography variant="h6" align="center" gutterBottom> Footer</Typography>
           <BottomNavigation
               className={classes.root}>
           </BottomNavigation>
       </footer>

    )
}