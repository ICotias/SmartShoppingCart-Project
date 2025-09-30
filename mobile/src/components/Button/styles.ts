import { StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    blueButton: {
        backgroundColor: "#2C46B1",
        borderRadius: 10,
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        padding:15,
    },
    whiteButton:{        
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth:1,
        borderColor:"black",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:50,
        padding:15,},

    blueButtonText:{
        color:"white",
        fontSize:18,
        fontWeight:"700",
    },

    whiteButtonText:{
        color:"black",
        fontSize:18,
        fontWeight:"700",
    },
    addButton: {
        borderRadius: 50,
        padding:5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#2C46B1",
    }
});