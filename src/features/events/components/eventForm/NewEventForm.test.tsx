import {render} from "@testing-library/react";
import EventModel from "../../models/Event.model";
import NewEventFormComponent from "./NewEventForm.component";

describe('NewEventForm', () => {

    it('should render successfully', () => {
        const {baseElement} = render(<NewEventFormComponent
            events={[] as EventModel[]}
            isDialogVisible={false}
            setDialogVisible={() => {}}
        />);
        expect(baseElement).toBeTruthy();
    });
});