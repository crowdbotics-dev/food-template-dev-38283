import React, { useEffect, useState } from "react";
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    Image,
} from "react-native";

const NotificationScreen = () => {

    const [orderNotifications, setOrderNotifications] = useState([]);

    useEffect(() => {
        setOrderNotifications([
            {
                title: "Order completed!",
                message: "You have completed your food order",
                time: "5 min ago",
                selected: true
            },
            {
                title: "Order delivered!",
                message: "Your order was delivered to your address",
                time: "50 min ago",
                selected: true
            },
            {
                title: "Payment updated",
                message: "New card added to you profile",
                time: "5 min ago",
                selected: false
            },
            {
                title: "You have items in your chart!",
                message: "Finish your order",
                time: "5 min ago",
                selected: false
            },
            {
                title: "Profile picture updated",
                message: "Your need picture updated",
                time: "5 min ago",
                selected: false
            },
            {
                title: "Google account",
                message: "You have connected your Google account",
                time: "5 min ago",
                selected: false
            }, {
                title: "New location added",
                message: "Work location added",
                time: "5 min ago",
                selected: false
            }
        ])
    }, [])

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <TabView tabTitles={["Preference", "Extended"]} selected={1} />
                <View style={styles.accountHeadings}>
                    <Text style={styles.inputText1}>Select all</Text>
                    <Text style={styles.inputText1}>Mark all</Text>
                </View>
            </View>
            {orderNotifications && orderNotifications.map((notification, index) =>
                <View style={styles.orderContainer} key={index}>
                    <View style={[styles.orderStatusContainer, { marginBottom: 10 }]}>
                        <Text style={notification.selected ? styles.title : styles.unselectedTitle}>{notification.title}</Text>
                        <Text style={[notification.selected ? styles.title : styles.unselectedTitle, { fontSize: 12 }]}>{notification.time}</Text>
                    </View>
                    <View style={styles.orderStatusContainer}>
                        <Text style={{ opacity: notification.selected ? 1 : 0.5 }}>{notification.message}</Text>
                        <Image
                         // @ts-ignore
                         source={notification.selected ? require("./assets/check.png") : "jwt"} 
                         style={styles.check} />
                    </View>
                </View>
            )}



        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: { backgroundColor: "#f9f9f9", paddingTop: 20, marginBottom: 15 },
    accountHeadings: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginTop: 10
    },
    inputText1: {
        fontSize: 18,
        color: "#1E2022",
        fontWeight: "bold"
    },
    orderContainer: { paddingTop: 15, paddingBottom: 18, borderBottomColor: "rgba(35, 31, 32, 0.05)", borderBottomWidth: 1, marginHorizontal: 20 },
    orderStatusContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
    title: { color: "#231F20", fontSize: 16 },
    unselectedTitle: { color: "#231F20", fontSize: 16, opacity: 0.5 },
    check: { height: 16, width: 16, resizeMode: "contain" , marginRight: 15}
})

export default NotificationScreen;



const TabView = ({ tabTitles, selected }) => {
    return (
        <View style={tabViewStyles.paletteContainer}>
            {tabTitles.map((title, index) => (
                <View
                    style={
                        index === selected
                            ? tabViewStyles.selected
                            : tabViewStyles.unSelected
                    }
                    key={index}
                >
                    <Text style={{ color: index === selected ? "#000" : "#7C7C7C" }}>{title}</Text>
                </View>
            ))}
        </View>
    );
};

const tabViewStyles = StyleSheet.create({
    paletteContainer: {
        width: "70%",
        height: 48,
        backgroundColor: "#F1F1F1",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        padding: 6,
        marginHorizontal: 20
    },
    selected: {
        borderRadius: 10,
        flex: 1,
        backgroundColor: "#fff",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "gray",
        elevation: 10
    },
    unSelected: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F1F1F1",
        borderRadius: 10
    }
});