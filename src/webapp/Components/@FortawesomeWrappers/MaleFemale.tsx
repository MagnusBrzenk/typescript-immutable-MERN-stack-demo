import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faMale from "@fortawesome/fontawesome-free-solid/faMale";
import faFemale from "@fortawesome/fontawesome-free-solid/faFemale";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

export const MaleFemale = (props: IFortawesomeProps) => (
    <div className="mf-wrapper">
        <style jsx>{`
            .mf-wrapper {
                position: relative;
                width: 100px;
                height: 100px;
                display: inline;
            }
            .male-wrapper {
                float: left;
            }
            .female-wrapper {
                float: left;
            }
        `}</style>
        <span className="male-wrapper">
            <FontAwesomeIcon //
                icon={faMale}
                {...props}
            />
        </span>
        <span className="female-wrapper">
            <FontAwesomeIcon //
                icon={faFemale}
                {...props}
            />
        </span>
    </div>
);
