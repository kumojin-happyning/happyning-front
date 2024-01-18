import {render} from "@testing-library/react";
import {EventListSkeleton} from "../index";

describe('EventListSkeleton', () => {

    it('should render successfully', () => {
        const {baseElement} = render(<EventListSkeleton />);
        expect(baseElement).toBeTruthy();
    });
});