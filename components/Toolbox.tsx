import SmartImagePresenter from "containers/SmartImagePresenter";
import {Toolbox as Props} from "core/ElementInfo";
import * as React from "react";

const Toolbox = (props: Props) => {
    return (
        <div className="toolbox">
            {
                props.value.map((entry, idx) => (
                    <div key={idx}>
                        {
                            entry.imgSrc ? <SmartImagePresenter src={entry.imgSrc} /> : null
                        }
                        <p>
                            <strong>{entry.name}</strong>
                            {entry.description}
                        </p>
                    </div>
                ))
            }
        </div>
    );
};

export default Toolbox;
