import { StyleSheet} from "react-native"

export const styles = StyleSheet.create({

    container:{
        backgroundColor: "white",
        borderRadius: 10, 
        width:"100%",
        padding:15,
        borderWidth:1,
        borderColor:"#DADADA",
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between"
      },
      containerFocused: {
        borderColor: "#007AFF", 
      },
      text:{
        fontSize:14,
        fontWeight:"300",
        color:"black",
        flex: 1,

      }
});