import * as React from "react";

interface IProps {
    counter: number;
}

interface IState {
    counter: number;
}

export class Testing extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            counter: 0
        };

        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);
    }

    onIncrement() {
        this.setState(doIncrement);
    }

    onDecrement() {
        this.setState(doDecrement);
    }

    render() {
        const { counter } = this.state;

        return (
            <div>
                <h1>My Counter</h1>

                <Counter counter={counter} />

                <button type="button" onClick={this.onIncrement}>
                    Increment
                </button>

                <button type="button" onClick={this.onDecrement}>
                    Decrement
                </button>
            </div>
        );
    }
}

export const Counter = ({ counter }: any) => <p>{counter}</p>;

export const doIncrement = (prevState: IState) => ({
    counter: prevState.counter + 1
});

export const doDecrement = (prevState: IState) => ({
    counter: prevState.counter - 1
});
