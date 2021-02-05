import React, {useContext, useEffect, useState,useCallback} from 'react';
import {Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";

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
export const NotAufPage = () => {
    const {request} = useHttp();
    const [infoForm, setInfoForm] = useState([
    ])

    const info = useCallback(async () => {
        console.log("Before try")
        try {
            const fetched = await request('/api/notauf/fitzone', 'GET', null, {

            })
            console.log("Fetched",fetched)
            console.log("Преобразование 1", fetched.result[0].img)
            setInfoForm(fetched.result)

        } catch (e) {}
    }, [request])

    useEffect(() => {
        info()
    }, [])


    const classes = useStyles();
    return (
        <main>
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
                                    <Button component={Link} to="/zanytiyPage" variant="contained" color='primary'>
                                        Start now
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color='primary'>
                                        Learn More
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {
                            infoForm.map((card) => (

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
                                            <Button size="small" color="primary">
                                                View
                                            </Button>
                                            <Button size="small" color="primary">
                                                Edit
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Container>
            </main>
            );
            </main>
    );
}
