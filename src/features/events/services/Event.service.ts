import EventRepository from "./Event.repository";
import EventModel from "../models/Event.model";

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
            event.start = new Date(event.start);
            event.end = new Date(event.end);
        }
    }
}

const eventService = new EventService();

export default eventService;