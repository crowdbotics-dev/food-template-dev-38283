import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    Pressable,
    Image,
    FlatList,
    ScrollView
} from "react-native";

const TodayPromos = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [productList, setProductList] = useState([]);
    const [addedProducts, setAddedProducts] = useState([]);
    useEffect(() => {
        setProductList([
            {
                id: 1,
                name: "Product name",
                price: 12.59,
                discountedPrice: 10,
                deliveryType: "Free delivery",
                rating: 4.8,
                image: require("../../assets/productImage.png")
            },
            {
                id: 2,
                name: "Product name",
                price: 12.59,
                discountedPrice: 18,
                deliveryType: "Free delivery",
                rating: 4.8,
                image: require("../../assets/productImage.png")
            },
            {
                id: 3,
                name: "Product name",
                price: 12.59,
                discountedPrice: 18,
                deliveryType: "Free delivery",
                rating: 4.8,
                image: require("../../assets/productImage.png")
            }
        ]);
    }, []);
    const handleAddProduct = product => {
        if (addedProducts.includes(product)) {
            setAddedProducts(addedProducts.filter(item => item.id !== product.id));
        } else {
            setAddedProducts([...addedProducts, product]);
        }
    };
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={{ paddingHorizontal: 10 }}>
                <View style={styles.forgetContainer}>
                    <Text style={styles.promoText}>Today's promo</Text>
                    <Image source={require("../../assets/filter.png")} style={styles.filter} />
                </View>
                <TabView
                    tabTitles={["Burger", "Pasta", "Salad", "Meat"]}
                    selected={selectedTab}
                    onPress={setSelectedTab}
                    style={styles.tabView}
                />
                <DetailsCard></DetailsCard>
                <FlatList
                    data={productList}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.productContainer}>
                            <View>
                                <Image source={item.image} style={styles.productImage} />
                                <Text style={styles.stock}>5 Left</Text>
                            </View>
                            <View style={styles.productDetails}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.pricingText}>
                                    ${item.discountedPrice.toFixed(2)}{" "}
                                </Text>
                                <View style={styles.flexRow}>
                                    <View style={styles.greenCircle}>
                                        <Text style={[styles.white, styles.bold]}>%</Text>
                                    </View>
                                    <Text style={styles.fnt12}>Free delivery</Text>
                                </View>
                            </View>
                            <View style={styles.buttons}>
                                <Pressable style={styles.heartIconContainer}>
                                    <Image
                                        source={require("../../assets/heartIcon.png")}
                                        style={styles.heartIcon}
                                    />
                                </Pressable>
                                <Pressable
                                    style={[
                                        styles.button
                                    ]}
                                    onPress={() => handleAddProduct(item)}>
                                    <Image
                                        source={
                                            addedProducts.includes(item)
                                                ? require("../../assets/doubleTickIcon.png")
                                                : require("../../assets/addIcon.png")
                                        }
                                        style={styles.btnIcon}
                                    />
                                    <Text style={styles.btnText}>
                                        {addedProducts.includes(item) ? "Added" : "Add"}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />
            </View>
            <Footer
                images={[
                    require("../../assets/home.png"),
                    require("../../assets/box.png"),
                    require("../../assets/search.png"),
                    require("../../assets/user.png")
                ]}
            />
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabView: {
        width: "85%",
    },
    productContainer: {
        marginVertical: 5,
        flexDirection: "row",
        paddingVertical: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        backgroundColor: "#FFF",
        borderRadius: 10,
        shadowColor: "rgba(0,0,0,0.5)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    productImage: {
        height: 106,
        width: 72,
        borderRadius: 10
    },
    productDetails: {
        flex: 1,
        marginLeft: 10
    },
    productName: {
        fontSize: 16,
        color: "#000",
        fontWeight: "bold",
        marginVertical: 5
    },
    pricingText: {
        fontSize: 20,
        color: "#000",
        marginBottom: 5,
        fontWeight: "bold"
    },
    lineThrough: {
        textDecorationLine: "line-through",
        color: "#CACACA"
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5
    },
    greenCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#12D790",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5
    },
    white: {
        color: "#fff"
    },
    fnt12: {
        fontSize: 12
    },
    bold: {
        fontWeight: "bold"
    },
    starIcon: {
        height: 20,
        width: 20,
        resizeMode: "contain",
        marginRight: 10
    },
    heartIconContainer: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "#fff",
        shadowColor: "#000",
        elevation: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5
    },
    buttons: {
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    heartIcon: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        height: 40,
        backgroundColor: "#12D790",
        borderRadius: 6
    },
    btnText: {
        color: "#fff"
    },
    btnIcon: {
        height: 12,
        width: 12,
        marginRight: 5,
        resizeMode: "contain"
    },
    redBtn: {
        backgroundColor: "#E84C4F"
    },
    forgetContainer: {
        marginTop: 20,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    promoText: {
        fontSize: 24, fontWeight: "500"
    },
    seeAll: { fontSize: 14, color: "#E84C4F" },
    filter: { height: 16, width: 16, resizeMode: "contain" },
    stock: { backgroundColor: "#12D790", padding: 5, color: '#fff', fontSize: 12, borderRadius: 4, textAlign: "center", width: 50, alignSelf: "center", marginTop: -15 },
});

export default TodayPromos;

const TabView = ({
    tabTitles,
    selected,
    onPress,
    tabColor,
    backgroundColor,
    style,
    icons
}) => {
    const tabColorStyle = {
        backgroundColor: tabColor || "#F1F1F1"
    };
    const backgroundColorStyle = {
        backgroundColor: backgroundColor || "#FFF"
    };
    const propStyle = style || {};
    return (
        <View
            style={[tabViewStyles.paletteContainer, backgroundColorStyle, propStyle]}>
            {tabTitles.map((title, index) => (
                <Pressable
                    onPress={() => (onPress ? onPress(index) : null)}
                    style={
                        index === selected
                            ? [tabViewStyles.selected, tabColorStyle, tabViewStyles.tabItem]
                            : [
                                tabViewStyles.unSelected,
                                backgroundColorStyle,
                                tabViewStyles.tabItem
                            ]
                    }
                    key={index}>
                    {icons
                        ? (
                            <Image
                                source={icons[index]}
                                style={[
                                    tabViewStyles.icon,
                                    index === selected
                                        ? tabViewStyles.selectedIcon
                                        : tabViewStyles.unSelectedIcon
                                ]}
                            />
                        )
                        : null}
                    <Text>{title}</Text>
                </Pressable>
            ))}
        </View>
    );
};

const tabViewStyles = StyleSheet.create({
    paletteContainer: {
        height: 48,
        backgroundColor: "#E4E4E4",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        padding: 6,
        marginVertical: 10
    },
    tabItem: {
        borderRadius: 10,
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    selected: {
        shadowColor: "gray",
        elevation: 10
    },
    unSelected: {
        backgroundColor: "#f1f1f1"
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
        marginRight: 5
    },
    selectedIcon: {
        tintColor: "#000"
    },
    unSelectedIcon: {
        tintColor: "#7C7C7C"
    }
});


const DetailsCard = () => {
    return (
        <View style={detailsCardStyles.detailsCard}>
            <View style={detailsCardStyles.pricing}>
                <Text style={detailsCardStyles.summaryText}>Food name</Text>
                <View style={detailsCardStyles.ratings}>
                    <Image source={require("../../assets/starIcon.png")}
                        style={detailsCardStyles.icon} />
                    <Text style={detailsCardStyles.pricingText}>
                        5.0
                    </Text>
                </View>

            </View>
            <View style={detailsCardStyles.pricing}>
                <Text style={detailsCardStyles.pricingText}>Street name</Text>
                <Text style={detailsCardStyles.pricingText}>
                    $77
                </Text>
            </View>
        </View>
    );
};

const detailsCardStyles = StyleSheet.create({
    detailsCard: {
        marginVertical: 10,
        height: 70,
        borderRadius: 10,
        shadowColor: "rgba(0, 0, 0, 0.5)",
        elevation: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        marginHorizontal: 10,
        paddingVertical: 10
    },
    pricing: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    pricingText: {
        fontSize: 14,
        color: "#7E7E7E"
    },
    summaryText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#3E3E3E",
        marginBottom: 5
    },
    ratings: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    icon: { height: 17, width: 17, resizeMode: "contain", marginRight: 5 }
});


const Footer = props => {

    return (
        <View style={[footerStyles.footer]}>
            {props.images.map((image, index) => (
                <View style={footerStyles.footerItem} key={index}>
                    <Image
                        style={footerStyles.footerImage}
                        source={image}
                    />
                </View>
            ))}
        </View>
    );
};

const footerStyles = StyleSheet.create({
    footer: {
        marginTop: 10,
        height: 60,
        backgroundColor: "#FFF",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 40
    },
    footerItem: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
    footerItemText: {
        fontSize: 13,
        color: "#fff",
        marginTop: 5
    },
    footerImage: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    }
});