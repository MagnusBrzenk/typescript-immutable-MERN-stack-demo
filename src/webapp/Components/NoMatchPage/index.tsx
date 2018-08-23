import * as React from "react";

interface IProps {
    id?: string;
}

interface IState {
    id?: string;
}

export class NoMatchPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    render() {
        return <div>Route Not Found! </div>;
    }
}
