import React, {useCallback, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { LineChart, Line, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useHttp} from "../hooks/http.hook";


const useStyles = makeStyles((theme) => ({
    diagramm: {
        display: "",
        maxWidth: "900",
    },
}));

export const RoleAccess=()=>{
    const {request} = useHttp();
    const [trenerAndClient, setTrenerClient] = useState([])
    const [trenerovkaData, setTrenData] = useState([])

    const data = useCallback(async () => {
        console.log("Before try")
        try {
            const fetched = await request('/api/diagramm/diagramTrenerClient', 'GET', null, {

            })
            console.log("Fetched",fetched)
            setTrenerClient(fetched.result)

        } catch (e) {}
    }, [request])

    const trenData = useCallback(async () => {
        console.log("Before try")
        try {
            const fetched = await request('/api/diagramm/diagramTrenData', 'GET', null, {

            })
            console.log("Fetched",fetched)
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
        <>


        </>
    );
}
