import EventRepository from './Event.repository';
import eventService from "./Event.service";

jest.mock('./Event.repository');

describe('EventService', () => {
    let mockEvent: any;

    beforeEach(() => {
        mockEvent = {
            start: '2025-01-01 00:00:00',
            end: '2025-01-01 01:00:00',
            timezone: 'America/New_York'
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should find all events', async () => {
        const mockEvents = [mockEvent];
        (EventRepository.findAll as jest.Mock).mockResolvedValue(mockEvents);
        await eventService.findAllEvents();
        expect(EventRepository.findAll).toHaveBeenCalled();
    });

    it('should create an event', async () => {
        (EventRepository.create as jest.Mock).mockResolvedValue(mockEvent);
        const event = await eventService.createEvent(mockEvent);
        expect(event).toEqual(mockEvent);
        expect(EventRepository.create).toHaveBeenCalledWith(mockEvent);
    });

});