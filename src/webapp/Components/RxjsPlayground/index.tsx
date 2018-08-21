import * as React from "react";
import Observable, { interval, Subscription, fromEvent } from "rxjs";
import { takeWhile, map, scan } from "rxjs/operators";
import ReactDOM from "react-dom";

/////////////////////////////////////////////////////////////
export class RxjsPlayground extends React.Component<{}, {}> {
    /////////////////////////////////////////////////////////

    componentDidMount() {
        //
        console.log("########################");
        console.log("########################");

        // const button: HTMLElement | null = document.getElementById("buttonId");
        // const x: HTMLElement = ReactDOM.findDOMNode(button!) as any;

        const button: HTMLElement | null = document.querySelector("#buttonId");

        // console.log(button);

        const click$ = fromEvent(button!, "click");

        // console.log(click$);

        const interval$ = interval(1000);

        const clicksToInterval$ = click$.pipe(
            map(event => {
                console.log("???");
                return interval$;
            })
        );

        clicksToInterval$.subscribe(e => {
            //
            console.log(
                e +
                    " Click event just happened, and the streamed click event was mapped to a stream of interval events; Let's now start subscribing to that interval stream"
            );
            //
            //
            e.subscribe(e2 => console.log(e2));
        });
    }

    render() {
        // clicksToInterval$.subscribe(intervalObservable => console.log(intervalObservable));

        console.log("########################");
        console.log("########################");
        /////////////////
        return (
            <div
                style={{
                    //
                    width: 200,
                    height: 200,
                    backgroundColor: "red"
                }}
            >
                SPACE FOR EXPLORING RXJS OPERATORS
                {/* <form
                // onSubmit={this.handleSubmit}
                > */}
                <button id="buttonId">Send data!</button>
                {/* </form> */}
            </div>
        );
    }
}
