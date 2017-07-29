import * as React from "react";

interface Props {
    number: number;
    diameter: string;
    duration: number;
    color: string;
    activeColor: string;
    borderRadius: string;
    borderWidth: string;
    borderColor: string;
}

export default class ActivityIndicator extends React.Component<Partial<Props>, {}> {}