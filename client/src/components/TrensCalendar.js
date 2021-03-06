import {Calendar, momentLocalizer, Views} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import React, {useCallback, useEffect, useState} from "react";
import {Loader} from "./Loader";
import {useHttp} from "../hooks/http.hook";
import {makeStyles} from "@material-ui/core/styles";

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const useStyles = makeStyles((theme) => ({
    calendar:{
        height: 800,
        width: 'auto',
    },
}))

export const MyCalendar = () => {
    let allViews = Object.keys(Views).map(k => Views[k])
    const classes=useStyles();
    const {loading,request} = useHttp();
    const [calendar, setCalendar] = useState([{}]);

    const trensInfo = useCallback(async () => {
        try {
            const fetched = await request(`/api/calendar/calendarinfo`, 'GET', null, {})
            setCalendar(fetched.result)
        } catch (e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        trensInfo()
    }, [])

    const myEventList = [{
        title: 'test',
        start: new Date(2021, 6, 8, 14, 0),
        end: new Date(2021, 6, 8, 18, 0),
    }];

    return (
    <div>
        {loading && <Loader/>}
        {!loading && calendar.length != 0 && (
        <Calendar
            views={allViews}
            className={classes.calendar}
            localizer={localizer}
            events={myEventList}
            startAccessor="start"
            endAccessor="end"
        />
        )}
    </div>
    )
}