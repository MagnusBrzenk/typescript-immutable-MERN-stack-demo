import React from "react";
import { doIncrement, doDecrement, Counter, Testing } from "./index.tsx";

/**
 * Mocha unit tests on isolatable functions
 */
describe("Local State", () => {
    it("should increment the counter in state", () => {
        const state = { counter: 0 };
        const newState = doIncrement(state);

        expect(newState.counter).to.equal(1);
    });

    it("should decrement the counter in state", () => {
        const state = { counter: 0 };
        const newState = doDecrement(state);

        expect(newState.counter).to.equal(-1);
    });
});

/**
 * React Testing with Enzyme: Unit and Integrations Tests for React Components
 */
describe("Testing Component", () => {
    it("renders the Counter wrapper", () => {
        const wrapper = shallow(<Testing />);
        expect(wrapper.find(Counter)).to.have.length(1);
    });

    it("passes all props to Counter wrapper", () => {
        const wrapper = shallow(<Testing />);
        let counterWrapper = wrapper.find(Counter);

        expect(counterWrapper.props().counter).to.equal(0);

        wrapper.setState({ counter: -1 });

        counterWrapper = wrapper.find(Counter);
        expect(counterWrapper.props().counter).to.equal(-1);
    });

    it("increments the counter", () => {
        const wrapper = shallow(<Testing />);

        wrapper.setState({ counter: 0 });
        wrapper
            .find("button")
            .at(0)
            .simulate("click");

        expect(wrapper.state().counter).to.equal(1);
    });

    it("decrements the counter", () => {
        const wrapper = shallow(<Testing />);

        wrapper.setState({ counter: 0 });
        wrapper
            .find("button")
            .at(1)
            .simulate("click");

        expect(wrapper.state().counter).to.equal(-1);
    });
});
