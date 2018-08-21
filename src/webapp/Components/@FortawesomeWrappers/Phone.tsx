import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faMobile from "@fortawesome/fontawesome-free-solid/faMobile";
import faPhone from "@fortawesome/fontawesome-free-solid/faPhone";
import IFortawesomeProps from "./@FortawesomeProps";
import { FlipProp } from "@fortawesome/fontawesome-svg-core";

interface IMyCustomProps {
    bMobile: boolean;
}

export const Phone = (props: IFortawesomeProps & IMyCustomProps) => {
    const { bMobile, ...fortawesomeProps }: IFortawesomeProps & IMyCustomProps = props;
    const flipper: FlipProp | undefined = !!bMobile ? undefined : "horizontal";
    return (
        <span>
            <FontAwesomeIcon //
                icon={!!bMobile ? faMobile : faPhone}
                flip={flipper}
                {...fortawesomeProps}
            />
        </span>
    );
};
