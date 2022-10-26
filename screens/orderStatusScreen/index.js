import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, TouchableHighlight, ScrollView, TextInput, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "../../store";
const OrderStatusScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [orderStatus, setOrderStatus] = useState([]);
    const [currentOrder, setCurrentOrder] = useState({});
    const [orderDate, setOrderDate] = useState("");
    const [orderTime, setOrderTime] = useState("");
    const orders = useSelector((state) => state?.ecommerce?.orderList);


    const convertFrom24To12Format = (time24) => {
        const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
        const hours = +sHours % 12 || 12;
        return `${hours}:${minutes}`;
      }

    useEffect(() => {
        setCurrentOrder(orders[0]);
        if (orders[0]?.date_placed) {
            const splitDate = orders[0]?.date_placed?.split("T");
            const date = new Date(splitDate[0]);
            const month = date.toLocaleString('default', { month: 'long' });
            const exactDate = month.split(" ");
            const convertedTime = convertFrom24To12Format(splitDate[1])
            setOrderTime(convertedTime);
            setOrderDate(exactDate[0] + ", " + exactDate[1] + " " + exactDate[2])
        }
    }, [orders])

    useEffect(() => {
        dispatch(getOrderList());
    }, [])

    useEffect(() => {
        setOrderStatus([{
            id: 1,
            name: "Ready to Pickup",
            status: "Order ID 1236546 from Store",
            time: "12:00",
            currentStatus: true
        },
        {
            id: 2,
            name: "Order Processed",
            status: "We are preparing your order",
            time: "10:50",
            currentStatus: false
        },
        {
            id: 3,
            name: "Payment Confirmed",
            status: "Payment Proceeded",
            time: "11:30",
            currentStatus: false
        },
        {
            id: 4,
            name: "Order placed",
            status: "We have received your order",
            time: "11:20",
            currentStatus: false
        }])
    }, [])

    return (
        <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
            <Text style={styles.heading}>Current order status</Text>
            <Image
                // @ts-ignore
                source={require("./assets/progress.png")}
                style={styles.progressImageStyle}
            />
            <View style={styles.inputHeadings}>
                <Text style={styles.inputText}>Order ID: {currentOrder?.number}</Text>
                <Text style={[styles.inputText, { fontWeight: "bold" }]}>{currentOrder?.total_incl_tax} {currentOrder?.currency}</Text>
            </View>
            <Text style={styles.dateText}>{orderDate ? orderDate : ""}</Text>

            <View style={[styles.orderTime]}>
                <Text style={styles.inputText}>ETA: 30 Min</Text>
                <Pressable onPress={() => navigation.navigate("orderDetailsScreen", { currentOrder, orderDate, orderTime })}>
                    <Text style={[styles.inputText, { color: "#EA4335" }]}>Details</Text>
                </Pressable>

            </View>

            {orderStatus && orderStatus.map((order, index) =>
                <View style={styles.mainContainer} key={index}>
                    <Image
                        // @ts-ignore
                        source={index == orderStatus.length - 1 ? require("./assets/dot.png") : order.currentStatus ? require("./assets/statusbar1.png") : require("./assets/statusbar2.png")}
                        style={index == orderStatus.length - 1 ? styles.dot : styles.statusBar}
                    />
                    <View style={{ paddingLeft: 5 }}>
                        <View style={styles.orderStatusContainer}>
                            <Text style={[styles.statusHeading, { color: !order.currentStatus ? "#e7e7e7" : "#2A2B2E" }]}>{order.name}</Text>
                            <Text style={[styles.statusHeading, { color: !order.currentStatus ? "#e7e7e7" : "#2A2B2E", textAlign: 'right' }]}>{orderTime}</Text>
                        </View>
                        <Text style={[styles.statusText, { color: !order.currentStatus ? "#e7e7e7" : "#2A2B2E" }]}>{order.status}</Text>
                    </View>
                </View>
            )}

            <View style={styles.emailContainer}>
                <Text style={styles.mr10}>Full Name</Text>
                <Text style={styles.text}>{currentOrder?.shipping_address?.first_name + " " + currentOrder?.shipping_address?.last_name}</Text>
            </View>
            <View>
                <Text style={styles.mr10}>Delivery address</Text>
                <Text style={styles.text}>{currentOrder?.shipping_address?.line1}</Text>
            </View>

            <Button buttonText={"Live tracking"} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
    },
    heading: { fontSize: 18, fontWeight: 'bold', color: "#2A2B2E", paddingLeft: 10, paddingVertical: 15 },
    progressImageStyle: { height: 13, width: 360, resizeMode: "contain", alignSelf: "center", marginBottom: 15, marginTop: 5 },
    inputHeadings: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 5,
        marginTop: 5
    },
    orderTime: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 5,
        marginTop: 20,
        marginBottom: 10
    },
    inputText: {
        fontSize: 18,
        color: "#2A2B2E"
    },
    dateText: {
        fontSize: 12,
        paddingHorizontal: 5,
        paddingTop: 3,
        color: "#2A2B2E"
    },

    orderStatusContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 8,
        marginTop: -2, marginBottom: 4,

    },
    statusHeading: { fontSize: 12, width: "50%" },
    statusText: { paddingHorizontal: 10, fontSize: 10 },
    mainContainer: {
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 5
    },
    statusBar: { height: 59, width: 12, resizeMode: "contain", },
    dot: { height: 12, width: 12, resizeMode: "contain", opacity: 0.25 },
    emailContainer: {
        marginTop: 20,
        marginBottom: 10
    },
    mr10: {
        marginLeft: 15,
        marginBottom: 10
    },
    text: {
        backgroundColor: "rgba(217, 217, 217, 0.2)",
        borderColor: "#C4C4C4",
        color: "#000",
        borderRadius: 10,
        fontSize: 14,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 15
    }
});

export default OrderStatusScreen;


const Button = (props) => {
    return (
        <TouchableHighlight onPress={props.onPress} underlayColor='#DDDDDD' style={btnStyles.mainContainer}>
            <View style={[btnStyles.button, {
                backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
                height: props.height ? props.height : 49,
                borderWidth: props.borderWidth ? props.borderWidth : 0,
                borderColor: props.borderColor ? props.borderColor : "#000000"
            }]}>
                <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>{props.buttonText}</Text>
            </View>
        </TouchableHighlight>
    );
};

const btnStyles = StyleSheet.create({
    mainContainer: {
        width: '90%', justifyContent: "center",
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 20
    },
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    text: {
        fontWeight: "bold",
        fontSize: 15
    }
});


const Input = (props) => {
    return (
        <View>
            <TextInput
                style={textStyles.input}
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={(num) => props.setValue(num)}
                placeholderTextColor='#000'
                editable={props.editable !== false}
            />
            {props.errorText ? <Text style={textStyles.error}>{props.errorText}</Text> : null}
        </View>
    );
};

const textStyles = StyleSheet.create({
    input: {
        backgroundColor: "rgba(217, 217, 217, 0.2)",
        height: 53,
        borderColor: "#C4C4C4",
        color: "#000",
        borderRadius: 10,
        fontSize: 14,
        borderWidth: 1,
        paddingHorizontal: 10
    },
    error: {
        fontSize: 13,
        color: "#FA060D",
        paddingTop: 8
    }
});