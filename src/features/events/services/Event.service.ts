import EventRepository from "./Event.repository";
import EventModel from "../models/Event.model";

class EventService {
    async findAllEvents(): Promise<EventModel[]> {
        return await EventRepository.findAll();
    }

    async createEvent(event: EventModel): Promise<EventModel> {
        return await EventRepository.create(event);
    }
}

export default new EventService();