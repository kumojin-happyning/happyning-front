import EventsPage from "./Events.page";
import {render} from "@testing-library/react";

describe('Events', () => {
    it('should render successfully', () => {
        const {baseElement} = render(<EventsPage/>);
        expect(baseElement).toBeTruthy();
    });
});