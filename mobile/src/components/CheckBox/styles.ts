import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:5,

    },
    checkBoxOn:{
        backgroundColor:"#2C76E2",
        width:30,
        height:30,
        borderRadius:10,
        justifyContent:"center",
        alignContent:"center",
        flexDirection:"row",
        paddingTop:3,
        
    },
    checkBoxOff:{
        backgroundColor:"white",
        width:30,
        height:30,
        borderRadius:10,
        justifyContent:"center",
        alignContent:"center",
        paddingLeft:3,
        borderWidth:1.5,
        borderColor:"#DADADA",
        flexDirection:"row",
        
    },

    remindMe:{
        fontSize:16,
        fontWeight: "500",
    },

})