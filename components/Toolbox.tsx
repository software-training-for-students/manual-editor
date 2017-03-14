import * as React from "react";

interface ToolboxEntry {
    imgSrc: string;
    name: string;
    description: string;
}

interface Props {
    value: ToolboxEntry[];
    onClick: (e: React.SyntheticEvent<HTMLDivElement>) => void;
}

const Toolbox = (props: Props) => {
    return (
        <div className="toolbox" onClick={props.onClick}>
            {
                props.value.map((entry, idx) => (
                    <div key={idx}>
                        <img src={entry.imgSrc} />
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
