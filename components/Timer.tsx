import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { displayTime } from "../utils/displayTime";

interface TimerProps {
    running: boolean;
    reset: boolean;
}

const Timer = (props: TimerProps) => {
    let [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (props.running) {
            let timer = setInterval(() => setSeconds(seconds++), 1000);
            return () => clearInterval(timer)
        }
    }, [props.running])

    useEffect(() => {
        if (props.reset) setSeconds(0);
    }, [props.reset]);


    return <Text style={{ color: "white", fontSize: 16, marginBottom: 15 }}> {displayTime(seconds)}</Text >;
};

export default Timer;

