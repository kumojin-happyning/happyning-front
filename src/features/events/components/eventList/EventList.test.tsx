import {render} from "@testing-library/react";
import {EventList} from "../index";
import EventModel from "../../models/Event.model";

describe('EventsList', () => {

    it('should render successfully', () => {
        const {baseElement} = render(<EventList value={[] as EventModel[]} header={<></>}/>);
        expect(baseElement).toBeTruthy();
    });
});