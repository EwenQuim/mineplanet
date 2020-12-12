import React, { useEffect } from "react";
import {
    Animated,
    Easing,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";


const EndView = ({ victory, newGameButton }: { victory: boolean, newGameButton: any }) => {

    let yPos = new Animated.Value(1200);
    let width = new Animated.Value(200);
    let height = width.interpolate({
        inputRange: [200, 280],
        outputRange: [200, 280]
    })

    const animate = () => {

        yPos.setValue(1200);

        Animated.timing(yPos, {
            duration: 1000,
            easing: Easing.out(Easing.ease),
            toValue: 0,
            useNativeDriver: false,
        }).start();

        width.setValue(200);

        Animated.sequence([
            Animated.timing(width, {
                delay: 1000,
                duration: 200,
                easing: Easing.cubic,
                toValue: 280,
                useNativeDriver: false,
            }),
            Animated.timing(width, {
                duration: 200,
                easing: Easing.cubic,
                toValue: 200,
                useNativeDriver: false,
            }
            )
        ]).start();
    }

    useEffect(() => { animate() })

    const comingFromTheBottom = [styles.blankFullScreen, { top: yPos }];

    let usedStyle;
    if (victory) {
        usedStyle = [styles.modalViewWin, { width: width, height: height }]
    } else {
        usedStyle = [styles.modalView, { width: width, height: height }]

    }


    return (
        <Animated.View style={comingFromTheBottom} >

            <Animated.View style={usedStyle}>
                <View style={styles.zoomingFrameCenterView}>

                    <Text style={styles.modalText}>
                        {victory
                            ? "You Won !"
                            : "Sorry, you lost..."}
                    </Text>

                    <Pressable
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => newGameButton()}
                    >
                        <Text style={styles.textStyle}>
                            Retry !
                        </Text>
                    </Pressable>

                </View>
            </Animated.View>

        </Animated.View>
    );
};


const styles = StyleSheet.create({
    blankFullScreen: {
        flex: 1,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#0000",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    modalView: {
        backgroundColor: "lightgrey",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "red",
        alignItems: "center",
        shadowColor: "#222",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalViewWin: {
        backgroundColor: "lightgrey",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "green",
        alignItems: "center",
        shadowColor: "#222",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    zoomingFrameCenterView: {
        flex: 1,
        backgroundColor: "#0000",
        justifyContent: "center",
        alignItems: "center",
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 5,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        color: "black",
        marginBottom: 15,
        textAlign: "center"
    },
});


export default EndView;