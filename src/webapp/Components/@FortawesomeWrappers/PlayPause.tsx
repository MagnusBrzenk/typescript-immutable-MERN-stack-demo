import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faPlay from "@fortawesome/fontawesome-free-solid/faPlay";
import faPause from "@fortawesome/fontawesome-free-solid/faPause";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

interface IMyCustomProps {
    bPlay: boolean;
}

export const PlayPause = (props: IFortawesomeProps & IMyCustomProps) => {
    const { bPlay, ...fortawesomeProps }: IFortawesomeProps & IMyCustomProps = props;
    return (
        <FontAwesomeIcon //
            icon={!!bPlay ? faPlay : faPause}
            {...fortawesomeProps}
        />
    );
};
