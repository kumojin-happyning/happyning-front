import {render} from "@testing-library/react";
import {EventCreateFooter} from "./EventCreateFooter.component";

describe('EventCreateFooter', () => {

    it('should render successfully', () => {
        const {baseElement} = render(<EventCreateFooter
            onSubmit={() => {}}
            onCancel={() => {}}
            isSubmitDisabled={false}
        />
        );
        expect(baseElement).toBeTruthy();
    });
});