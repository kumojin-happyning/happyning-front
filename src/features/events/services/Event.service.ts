import EventRepository from "./Event.repository";
import EventModel from "../models/Event.model";
import moment from "moment-timezone";

class EventService {
    async findAllEvents(): Promise<EventModel[]> {

        const events: EventModel[] =  await EventRepository.findAll();
        this.convertDates(events);

        return events;
    }

    async createEvent(event: EventModel): Promise<EventModel> {
        return await EventRepository.create(event);
    }

    /**
     * Redéfinit la date en fonction du fuseau horaire
     * @param events
     * @private
     */
    private convertDates(events: EventModel[]) {
        for (const event of events) {
            event.start = moment.tz(event.start, event.timezone).format('DD/MM/YYYY HH:mm:ss');
            event.end = moment.tz(event.end, event.timezone).format('DD/MM/YYYY HH:mm:ss');
        }
    }
}

const eventService = new EventService();

export default eventService;