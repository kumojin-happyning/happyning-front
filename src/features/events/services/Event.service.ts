import EventRepository from "./Event.repository";
import EventModel from "../models/Event.model";
import moment from "moment-timezone";
import ConvertDates from "../utils/ConvertDates";

class EventService {
    async findAllEvents(): Promise<EventModel[]> {

        const events: EventModel[] =  await EventRepository.findAll();
        this.convertDates(events);

        return events;
    }

    async createEvent(event: EventModel): Promise<EventModel> {
        moment.tz.setDefault(event.timezone);
        event.start = moment(event.start).utc(false).format();
        event.end = moment(event.end).utc(false).format();
        return await EventRepository.create(event);
    }

    /**
     * Redéfinit la date en fonction du fuseau horaire
     * @param events
     * @private
     */
    private convertDates(events: EventModel[]) {
        for (const event of events) {
            event.start = ConvertDates.toLocalDate(event.start, event.timezone);
            event.end = ConvertDates.toLocalDate(event.end, event.timezone);
        }
    }
}

const eventService = new EventService();

export default eventService;