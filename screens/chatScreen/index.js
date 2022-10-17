// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, TouchableHighlight, ScrollView, TextInput } from "react-native";
const ChatScreen = () => {

    const [message, setMessage] = useState("");
    const [user1, setUser1] = useState({});
    const [user2, setUser2] = useState({});
    const [conversation, setConversation] = useState([]);
    useEffect(() => {
        setUser1({
            name: "User1",
            image: require("./assets/profile1.png"),
            isOnline: true
        });
        setUser2({
            name: "Username",
            image: require("./assets/profile2.png"),
            isOnline: true
        });
    }, []);
    useEffect(() => {
        setConversation([
            {
                id: 1,
                sender: user1,
                text: "lorem ipsum dolor sit amet consectetur adipisicing elit sed do",
                sentTime: "12:00 PM"
            },
            {
                id: 2,
                sender: user2,
                text: "lorem ipsum dolor sit amet",
                sentTime: "01:15 PM"
            },
            {
                id: 2,
                sender: user1,
                text: "lorem ipsum dolor sit amet",
                sentTime: "01:20 PM"
            },
        ]);
    }, [user1, user2]);

    return (
        <View style={[styles.container]}>
            <Image
                // @ts-ignore
                source={require("./assets/mapImg.png")}
                style={styles.blurImageStyle}
            />
            <Image
                // @ts-ignore
                source={require("./assets/mapButtons.png")}
                style={styles.mapButtons}
            />

            <View style={styles.cardContainer}>
                <View style={styles.pricingContainer}>
                    <View style={styles.pricing}>
                        <Text style={styles.summaryText}>Live status</Text>
                        <Text style={styles.eta}>ETA: 10 Min</Text>
                    </View>
                    <Image
                        // @ts-ignore
                        source={require("./assets/progress.png")}
                        style={styles.progressImageStyle}
                    />
                </View>

                <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                    {conversation.map((message, index) => (
                        <ConversationElement message={message} key={index} />
                    ))}
                </ScrollView>
                <View style={styles.footer}>
                    <View>
                        <Image
                            // @ts-ignore
                            source={require("./assets/cameraIcon.png")}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter"
                            onChangeText={(text) => setMessage(text)}
                            value={message}
                            autoCorrect={false}
                            autoCapitalize="none"
                            autoFocus={false}
                        />
                        <Image
                            // @ts-ignore
                            source={require("./assets/emojiIcon.png")}
                            style={styles.smileyIcon}
                        />
                        <Image
                            // @ts-ignore
                            source={require("./assets/voiceIcon.png")}
                            style={styles.voiceIcon}
                        />
                    </View>
                    <View>
                        <Image
                            // @ts-ignore
                            source={require("./assets/sendIcon.png")}
                            style={styles.sendIcon}
                        />
                    </View>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(218, 218, 218, 0.01)',
        width: '100%',
    },
    mapButtons: { height: 240, width: 290, resizeMode: "contain", position: 'absolute', alignSelf: "center", top: 0, },
    cardContainer: {
        height: 410,
        backgroundColor: "rgba(252, 252, 252, 0.95)",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingHorizontal: 25,
        position: 'absolute', left: 0, right: 0, bottom: 0,
        shadowColor: "#f2efef",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.1,
        shadowRadius: 7.84,
        elevation: 10,
        paddingTop: 10

    },
    pricing: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5
    },

    summaryText: {
        fontSize: 16,
        color: "#313633",
    },
    pricingContainer: {},

    blurImageStyle: {
        resizeMode: "cover",
        width: '100%',
        height: '100%',
    },

    eta: { fontSize: 13, color: "#2A2B2E" },
    progressImageStyle: { height: 13, width: 350, resizeMode: "contain", alignSelf: "center", marginBottom: 15, marginTop: 5 },

    body: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        paddingLeft: 15,
        borderRadius: 10,
        backgroundColor: "#F1F1F1"
    },
    smileyIcon: {
        position: "absolute",
        right: 40,
        top: 10,
        opacity: 0.5
    },
    voiceIcon: {
        top: 14,
        right: 15,
        position: "absolute",
        opacity: 0.5
    },
    sendIcon: {
        height: 20, width: 24,
        opacity: 0.3,
    }

});

export default ChatScreen;


const ConversationElement = ({ message }) => {
    const boxAlignment = {
        flexDirection: message.sender.name === "User1" ? "row" : "row-reverse"
    };
    const messageTextContainer = {
        marginLeft: message.sender.name === "User1" ? 20 : 0,
        marginRight: message.sender.name === "User1" ? 0 : 20,
        backgroundColor: message.sender.name === "User1" ? "#FCF1D6" : "#F9D8D9"
    };
    return (
        <View style={[ConversationElementStyles.messageContainer, boxAlignment]}>
            <View >
                <Image
                    source={message.sender.image}

                />
                {(message.sender.isOnline && (
                    <Image
                        // @ts-ignore
                        source={require("./assets/onlineIcon.png")}
                        style={ConversationElementStyles.activityIcon}
                    />
                )) ||
                    null}
            </View>
            <View
                style={[
                    ConversationElementStyles.messageTextContainer,
                    messageTextContainer
                ]}
            >
                <Text style={ConversationElementStyles.messageText}>
                    {message.text}
                </Text>
                <Text style={ConversationElementStyles.messageTime}>
                    {message.sentTime}
                </Text>
            </View>
        </View>
    );
};

const ConversationElementStyles = StyleSheet.create({
    messageContainer: {
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
        justifyContent: "flex-start",
        marginVertical: 20
    },
    messageTextContainer: {
        minHeight: 70,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "flex-start",
        width: "70%"
    },
    messageText: {
        lineHeight: 20,
        fontSize: 14,
        color: "#000",
        fontWeight: "bold",
        textAlign: "left"
    },
    activityIcon: {
        position: "absolute",
        right: 0,
        top: 40
    },
    messageTime: {
        position: "absolute",
        right: 5,
        bottom: -20,
        color: "grey",
        fontSize: 12
    }
});