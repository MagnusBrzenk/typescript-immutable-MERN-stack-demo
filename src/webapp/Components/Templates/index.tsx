import * as React from "react";
import $script from "scriptjs";

import { Coffee } from "__COMPONENTS/@FortawesomeWrappers/Coffee";
import { Rocket } from "__COMPONENTS/@FortawesomeWrappers/Rocket";
import { AngleArrow } from "__COMPONENTS/@FortawesomeWrappers/AngleArrow";
import { Education } from "__COMPONENTS/@FortawesomeWrappers/Education";

import cssStyless from "__COMPONENTS/Templates/styles.css";
import scssStyless from "__COMPONENTS/Templates/styles.scss";
import lessStyless from "__COMPONENTS/Templates/styles.less";

// import { localJsFunction } from "__COMPONENTS/Templates/localJsFunction";
import { localJsFunction } from "__COMPONENTS/Templates/localJsFunction.js";

import { TrendyTextField } from "__COMPONENTS/TrendyTextField";

////////////////////////////////////////////////////////
export class Templates extends React.Component<{}, {}> {
    ////////////////////////////////////////////////////

    componentDidMount() {
        loadExampleChartJs();
    }

    render() {
        console.log("########################");
        console.log("######### TEST #########");
        console.log("########################");
        return (
            <div className="templates">
                <style jsx>{`
                    div {
                        padding: 10px;
                        color: white;
                        box-sizing: border-box;
                        margin-bottom: 5px;
                    }
                    .test-container {
                        padding: 50px;
                        box-sizing: border-box;
                        background-color: rgba(0, 0, 0, 0.2);
                        width: 100%;
                    }
                    .test-styled-jsx-div {
                        height: 50px;
                        background-color: teal;
                        color: white;
                    }
                    @media (min-width: 550px) {
                        .test-styled-jsx-div {
                            background-color: orange;
                        }
                    }
                    @media (min-width: 700px) {
                        .test-styled-jsx-div {
                            background-color: pink;
                        }
                    }

                    .test-css-grid-layout div {
                        // padding: 0px;
                        // margin: 0px;
                    }

                    .test-css-grid-layout .column {
                        background: #eee;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        color: #777;
                        padding: 5px;
                        min-height: 30px;
                        text-align: center;
                    }

                    .test-css-grid-layout .row {
                        margin-bottom: 10px;
                    }

                    .test-css-grid-layout .row:last-child {
                        margin-bottom: 0;
                    }

                    .test-css-grid-layout .column .column {
                        color: #eee;
                        background: #333;
                        border-color: #000;
                    }

                    .test-css-grid-layout .p {
                        font-size: 14px;
                        text-align: center;
                        padding-top: 100px;
                    }

                    @media only screen and (max-width: 550px) {
                        .test-css-grid-layout .row {
                            margin-bottom: 0;
                        }
                        .test-css-grid-layout .column {
                            margin-bottom: 10px;
                        }
                        .test-css-grid-layout .row:last-child .column:last-child {
                            margin-bottom: 0;
                        }
                    }
                `}</style>
                <div style={{ backgroundColor: `white`, color: "black" }}>
                    <b>
                        {" "}
                        This is a space to test out basic architecture and to grab boilerplate code for building out
                        components{" "}
                    </b>
                </div>
                <div className="test-styled-jsx-div">
                    This div is styled with Styled-JSX and includes media-queries. Resize screen to change colors.{" "}
                </div>
                <div className="global-css-test">This div is styled using globally imported CSS </div>
                <div className="global-scss-test">This div is styled using globally imported SCSS/SASS </div>
                <div className="global-less-test">This div is styled using globally imported LESS</div>
                <div className={cssStyless.myLocalCssClass}>
                    {""}This div is styled using locally imported CSS Modules
                </div>
                <div className={scssStyless.myLocalScssClass}>
                    {""}This div is styled using locally imported SCSS Modules
                </div>
                <div className={lessStyless.myLocalLessClass}>
                    {""}This div is styled using locally imported LESS Modules
                </div>

                <div>
                    Some image sprites imported using global css import:
                    <img
                        src="/images/blank.gif"
                        className="flag flag-cz"
                        alt="Czech Republic"
                        width="30px"
                        style={{ width: 100 }}
                    />
                    <img src="/images/blank.gif" className="flag flag-fr" alt="Czech Republic" />
                    <img src="/images/blank.gif" className="flag flag-us" alt="Czech Republic" />
                    <img src="/images/blank.gif" className="flag flag-gb" alt="Czech Republic" />
                    <img src="/images/blank.gif" className="flag flag-gr" alt="Czech Republic" />
                    <img src="/images/blank.gif" className="flag flag-de" alt="Czech Republic" />
                    <img src="/images/blank.gif" className="flag flag-ar" alt="Czech Republic" />
                </div>

                <div style={{ height: 400 }}>
                    <TrendyTextField />
                </div>
                <div
                    style={{
                        backgroundColor: `black`
                    }}
                >
                    <div>A whole bunch of fortawesome icons with different props/styles:</div>
                    <Coffee style={{ margin: `20px`, backgroundColor: "red", padding: `30px` }} />
                    <Rocket spin size="3x" />
                    <AngleArrow direction="left" style={{ margin: `20px` }} />
                    <AngleArrow direction="right" style={{ margin: `20px` }} />
                    <Education size="4x" style={{ padding: `20px` }} />
                </div>
                <div style={{ backgroundColor: `yellow`, color: "black" }}>
                    {//
                    localJsFunction()}
                </div>

                <div //
                    className="test-css-grid-layout"
                    style={{ backgroundColor: "blue", color: "white" }}
                >
                    <div>{"https://codepen.io/SitePoint/pen/dPqqvN"}</div>
                    <div className="row">
                        <div className="column column-4" />
                        <div className="column column-4" />
                        <div className="column column-4" />
                    </div>
                    <div className="row">
                        <div className="column column-2" />
                        <div className="column column-4" />
                        <div className="column column-4" />
                        <div className="column column-2" />
                    </div>
                    <div className="row">
                        <div className="column column-5" />
                        <div className="column column-7" />
                    </div>
                    <div className="row">
                        <div className="column column-6">
                            <div className="row">
                                <div className="column column-6" />
                                <div className="column column-6" />
                            </div>
                            <div className="row">
                                <div className="column column-3" />
                                <div className="column column-3" />
                                <div className="column column-3" />
                                <div className="column column-3" />
                            </div>
                            <div className="row">
                                <div className="column column-4" />
                                <div className="column column-4" />
                                <div className="column column-4" />
                            </div>
                        </div>
                        <div className="column column-6">
                            <div className="row">
                                <div className="column column-7" />
                                <div className="column column-3" />
                                <div className="column column-2" />
                            </div>
                            <div className="row">
                                <div className="column column-2" />
                                <div className="column column-2" />
                                <div className="column column-4" />
                                <div className="column column-2" />
                                <div className="column column-2" />
                            </div>
                            <div className="row">
                                <div className="column column-9" />
                                <div className="column column-3" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column column-8" />
                        <div className="column column-4" />
                    </div>
                    <div className="row">
                        <div className="column column-1" />
                        <div className="column column-3" />
                        <div className="column column-4" />
                        <div className="column column-3" />
                        <div className="column column-1" />
                    </div>
                    <div className="row">
                        <div className="column column-3" />
                        <div className="column column-3" />
                        <div className="column column-3" />
                        <div className="column column-3" />
                    </div>
                    <div className="row">
                        <div className="column column-12" />
                    </div>

                    <p className="p">
                        Demo by Ryan Morr.{" "}
                        <a href="http://www.sitepoint.com/understanding-css-grid-systems" target="_blank">
                            See article
                        </a>.
                    </p>
                </div>

                <div //
                    className="test-css-grid-layout"
                    style={{ backgroundColor: "blue", color: "white" }}
                >
                    <div className="row" style={{ position: "relative" }}>
                        <div className="column column-6">
                            <div
                                className="test-height-determined-by-sibling-content"
                                style={{
                                    backgroundColor: `rgba(255,0,0,0.5)`,
                                    // height: "auto",
                                    height: "fit-content",

                                    // position: `absolute`,
                                    // top: `0px`,
                                    // bottom: `0px`,
                                    // left: `0px`,
                                    // right: `0px`,
                                    color: "black",
                                    border: "black 1px solid",
                                    borderRight: "black 0px solid",
                                    overflow: "scroll"
                                }}
                            >
                                <div className="aux-vertical-center">
                                    <div className="vertical-and-horizontal-center">
                                        <div //
                                            style={{
                                                //
                                                backgroundColor: "orange",
                                                padding: 20,
                                                width: "200px"
                                                // width: `auto`
                                            }}
                                        >
                                            <h1>Hello</h1>
                                            <p>This is a mini dashboard using ChartsJs</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column column-6">
                            <div
                                className="chart-container test-this-content-determines-parent-and-sibling-height"
                                style={{
                                    display: "block",
                                    width: `100%`,
                                    margin: 0,
                                    border: "black 1px solid"
                                }}
                            >
                                <canvas
                                    id="myChartX"
                                    className="mychart"
                                    width="200"
                                    height="200"
                                    style={{ width: "200px", height: "200px" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div //
                    className="test-mini-dashboard-container"
                    style={{
                        position: `relative`,
                        backgroundColor: "white",
                        width: `100%`,
                        padding: 0,
                        boxSizing: "content-box"
                    }}
                >
                    <div
                        className="test-height-determined-by-sibling-content"
                        style={{
                            backgroundColor: `rgba(255,0,0,0.5)`,
                            position: `absolute`,
                            top: `0px`,
                            bottom: `0px`,
                            left: `0px`,
                            right: `50%`,
                            padding: 0,
                            margin: 0,
                            color: "black",
                            border: "black 1px solid",
                            borderRight: "black 0px solid",
                            overflow: "scroll"
                        }}
                    >
                        <div className="aux-vertical-center">
                            <div className="vertical-and-horizontal-center">
                                <div //
                                    style={{
                                        //
                                        backgroundColor: "orange",
                                        padding: 20,
                                        width: "200px"
                                        // width: `auto`
                                    }}
                                >
                                    <h1>Hello</h1>
                                    <p>This is a mini dashboard using ChartsJs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="chart-container test-this-content-determines-parent-and-sibling-height"
                        style={{
                            display: "block",
                            width: `50%`,
                            margin: 0,
                            marginLeft: `50%`,
                            border: "black 1px solid"
                        }}
                    >
                        <canvas
                            id="myChart"
                            className="mychart"
                            width="200"
                            height="200"
                            style={{ width: "200px", height: "200px" }}
                        />
                    </div>
                </div> */}
                <div //
                    // className="test-mini-dashboard-container"
                    style={{
                        display: "flex",
                        position: `relative`,
                        backgroundColor: "white",
                        width: `100%`,
                        padding: 0,
                        boxSizing: "content-box"
                    }}
                >
                    <div
                        // className="test-height-determined-by-sibling-content"
                        style={{
                            backgroundColor: `rgba(255,0,0,0.5)`,
                            flex: "1",
                            // position: `absolute`,
                            // top: `0px`,
                            // bottom: `0px`,
                            // left: `0px`,
                            // right: `50%`,
                            // width: "50%",
                            // height: "100%",
                            padding: 0,
                            margin: 0,
                            color: "black",
                            border: "black 1px solid",
                            borderRight: "black 0px solid",
                            overflow: "scroll"
                        }}
                    >
                        {/* <div className="aux-vertical-center">
                            <div className="vertical-and-horizontal-center">
                                <div //
                                    style={{
                                        //
                                        flex: 1,
                                        backgroundColor: "orange",
                                        padding: 20,
                                        width: "200px"
                                        // width: `auto`
                                    }}
                                >
                                    <h1>Hello</h1>
                                    <p>This is a mini dashboard using ChartsJs</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div
                        className="chart-container test-this-content-determines-parent-and-sibling-height"
                        style={{
                            // display: "block",
                            width: `50%`,
                            flex: "1",
                            margin: 0,
                            // marginLeft: `50%`,
                            border: "black 1px solid"
                        }}
                    >
                        <canvas
                            id="myChart"
                            className="mychart"
                            width="200"
                            height="200"
                            style={{ width: "200px", height: "200px" }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

declare const Chart: any;
import dataCSV from "./demoData.csv"; //data2 is best

function loadExampleChartJs() {
    ///////////////////////////

    console.log("dataCSV", dataCSV.map((el: any) => el.data));

    $script("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js", () => {
        console.log("==============================================");
        const ctx: CanvasRenderingContext2D | null = (document.getElementById(
            //
            "myChart"
        ) as HTMLCanvasElement)!.getContext("2d");
        const myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [
                    {
                        label: "# of Votes",
                        // data: [12, 19, 3, 5, 2, 3],
                        data: dataCSV.map((el: any) => el.data),
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                            "rgba(153, 102, 255, 0.2)",
                            "rgba(255, 159, 64, 0.2)"
                        ],
                        borderColor: [
                            "rgba(255,99,132,1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)"
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        });
    });

    // //
    // //        myChart.canvas.parentNode.style.width = '200px';
    // window.onbeforeprint = function beforePrintHandler() {
    //     for (var id in Chart.instances) {
    //         console.log("!!!", id);
    //         //                Chart.instances[id].resize()
    //     }
    // };
}
