import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "flex-start",
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
        marginTop: 50,
    },
});

export const searchPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    imageContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 50,
    },
    buttonContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: "90%"
    },
    button: {
        width: "90%",
        height: "25%",
        backgroundColor: '#cee7ed',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10
    },
    buttonTitle: {
        fontSize: 40
    },
    buttonDescription: {
        fontSize: 15,
        textAlign: 'center',
        margin: 5
    }
})

export const hotelAndCrimeListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    imageContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 50,
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
    loadingContainer: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center",
    },
});

export const CrimeDetailsStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    header: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },
    backButton: {
        left: 10,
        zIndex: 1,
        position: 'absolute'
    },
    imageContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 0,
    },
    contentContainer: {
        flex: 1,
        width: "100%",
        padding: 10,
        paddingLeft: 20
    },
    listStyle: {
        width: "95%",
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    crime: {
        borderTopWidth: 1,
        borderTopColor: "black",
        padding: 10
    },
    crimeText: {
        fontSize: 16,
    },
})