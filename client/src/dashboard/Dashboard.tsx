import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../common/header'

const BACKEND_ADDR = "http://localhost:5000";

const TIME = "T00:00:00.000Z";
function Dashboard() {
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const [events, setEvents] = useState([]);

    const getEvents = () => {
        fetch(BACKEND_ADDR + "/events", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startDate: startDate,
                endDate: endDate
            })
        }).then((res) => {
            res.text().then(data => {
                setEvents(JSON.parse(data));
            })

        });
    }


    const eventList = events.length !== 0 ? events.map((event: any, index: number) => {
        return (< tr key={event.created} >
            <th scope="row">{index + 1}</th>
            <td>{event.created}</td>
            <td>{event.summary}</td>
        </tr >
        )
    }) : < tr>
        <th scope="row">---</th>
        <td>---</td>
        <td>---</td>
    </tr >;
    return (
        <>
            <Header />
            <div className='my-3'>
                <label htmlFor='startDate' className='text-light mx-2'>Start Date</label>
                <input id="startDate" type="date" onChange={(e) => setStartDate(e.target.value + TIME)} />
                <label htmlFor='endDate' className='text-light mx-2'>End Date</label>
                <input type="date" id="endDate" onChange={e => setEndDate(e.target.value + TIME)} />
                <button onClick={getEvents}>Get Events</button>
            </div>
            <div className='container'>
                <table className="table table-sm table-bordered">
                    <thead className='text-success'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Description</th>

                        </tr>
                    </thead>
                    <tbody className='text-light'>
                        {eventList}
                    </tbody>
                </table>

            </div>

        </>
    )
}

export default Dashboard