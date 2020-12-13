
import React from "react";

import { View } from '../components/Themed';
import { StyleSheet } from 'react-native';


const Sep = () => {
    return <View style={styles.separator} />
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 20,
        height: 1,
        width: '80%',
        backgroundColor: "#8888",
    },
});

export default Sep