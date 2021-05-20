import React, {useCallback, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { LineChart, Line, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useHttp} from "../hooks/http.hook";
import {Loader} from "./Loader";
import AppBar from "@material-ui/core/AppBar";


const useStyles = makeStyles((theme) => ({
    diagramm: {
        display: "",
        maxWidth: "900",
    },
}));

export const Diagram=()=>{
    const {loading, request} = useHttp();
    const [trenerAndClient, setTrenerClient] = useState([{}])
    const [trenerovkaData, setTrenData] = useState([{}])

    const data = useCallback(async () => {
        console.log("Before try")
        try {
            const fetched = await request('/api/diagramm/diagramTrenerClient', 'GET', null, {})
            console.log("Fetched",fetched)
            setTrenerClient(fetched.result)

        } catch (e) {}
    }, [request])

    const trenData = useCallback(async () => {
        console.log("Before try")
        try {
            const fetched = await request('/api/diagramm/diagramTrenData', 'GET', null, {})

            setTrenData(fetched.result)

        } catch (e) {}
    }, [request])

    useEffect(() => {
        data()
    }, [])

    useEffect(() => {
        trenData()
    }, [])

console.log("trenerClient", trenerAndClient)
    console.log("trenerovkaData", trenerovkaData)
    const classes = useStyles();

    return (
        <main>
            {loading && <Loader/>}
            {!loading && trenerAndClient.length != 0 && (
                <>
                    <Typography component="h1" variant="h6" color="inherit">Тренер-персональные тренировки</Typography>
                    <div>
                        <BarChart width={600} height={300} data={trenerAndClient}>
                            <XAxis dataKey="FIO_cl" stroke="#8884d8"/>
                            <YAxis/>
                            <Tooltip/>
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                            <Bar dataKey="Всего" fill="#8884d8" barSize={30}/>
                        </BarChart>
                    </div>
                </>
            )}
        </main>
    );
}
