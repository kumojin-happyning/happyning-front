import EventModel from "../models/Event.model";

const DEFAULT_EVENT: EventModel = {
    id: 0,
    name: "",
    start: new Date(),
    end: new Date(),
    description: "",
}

export default DEFAULT_EVENT;