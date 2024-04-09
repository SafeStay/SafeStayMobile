import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },

    searchContainer: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
    },

    textInputStyle: {
        backgroundColor: "#cee7ed",
        width: "73%",
    },

    imageContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20%",
    },
});

export const hotelListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: "14%",
    },
    searchContainer: {
        flexDirection: "row",
        marginBottom: 20,
        marginTop: "3%",
    },
    textInputStyle: {
        backgroundColor: "#cee7ed",
        width: "73%",
        justifyContent: "center",
    },
    listStyle: {
        flex: 5,
        width: "90%",
    },
    listItemStyle: {
        padding: 15,
    },
});