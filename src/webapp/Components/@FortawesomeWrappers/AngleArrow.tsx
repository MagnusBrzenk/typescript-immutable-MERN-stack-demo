import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faAngleLeft from "@fortawesome/fontawesome-free-solid/faAngleLeft";
import faAngleRight from "@fortawesome/fontawesome-free-solid/faAngleRight";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

interface IMyCustomProps {
    direction: "left" | "right";
}

export const AngleArrow = (props: IMyCustomProps & IFortawesomeProps) => {
    const { direction, ...fortawesomeProps }: IFortawesomeProps & IMyCustomProps = props;
    return (
        <FontAwesomeIcon //
            icon={direction === "left" ? faAngleLeft : faAngleRight}
            {...fortawesomeProps}
        />
    );
};
