import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faPlus from "@fortawesome/fontawesome-free-solid/faPlusSquare";
import faMinus from "@fortawesome/fontawesome-free-solid/faMinusSquare";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

interface IMyCustomProps {
    bPlus?: boolean;
}

export const PlusMinus = (props: IFortawesomeProps & IMyCustomProps) => {
    const { bPlus, ...fortawesomeProps }: IFortawesomeProps & IMyCustomProps = props;
    return (
        <FontAwesomeIcon //
            icon={!!bPlus ? faPlus : faMinus}
            {...fortawesomeProps}
        />
    );
};
