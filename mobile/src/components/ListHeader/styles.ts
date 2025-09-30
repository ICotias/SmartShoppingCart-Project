import { StyleSheet} from "react-native"

export const styles = StyleSheet.create({
    modal:{
        paddingHorizontal:10,
        
    },
    container:{
        paddingHorizontal:10,
        flexDirection:"row",
    },
    stateBox:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width: "100%",
    },
    leftSection:{
        flexDirection:"row",
        gap: 10,
    },
    buttons:{
        flexDirection:"row",
        gap: 10,
        },

    textList:{
        fontSize:12,
        
        
    },

    grayBorderBottom:{
        borderBottomWidth:2,
        borderBottomColor:"#d3d3d3",
        width:"96%",
        height:1,
        marginLeft:9,
        marginTop:10,        
        marginBottom:10,        
      },

})