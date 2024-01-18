import React, {useEffect} from "react";
import EventModel from "../models/Event.model";
import EventService from "../services/Event.service";

const useEvents = () => {
    const [events, setEvents] = React.useState<EventModel[]>([] as EventModel[]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {
        (async () => {
            await getEvents();
        })()
    }, []);

    /**
     * Réupère la liste des évènements
     */
    const getEvents = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const events = await EventService.findAllEvents();
            setEvents(events);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return {events, isLoading, error}
}

export default useEvents;