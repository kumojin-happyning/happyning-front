import React from 'react';
import useEvents from "../hooks/useEvents.hook";
import {EventList, EventListSkeleton} from "../components";


const EventsPage = () => {

    const {events, isLoading} = useEvents();

    return (
        <>
            {
                isLoading && (
                    <EventListSkeleton />
                )
            }
            {
                !isLoading && (
                    <EventList value={events} test-id="eventList"/>
                )
            }
        </>
    );
};

export default EventsPage;