import { StyleSheet  } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#D0D2D8",
      justifyContent: "flex-end",
      
    },
    logo:{
      width:134,
      height:34,
      
    },
    topContainer:{
      alignItems: "center",
      paddingHorizontal: 24,

      },
    bottomContainer:{
      backgroundColor: "#ffffff",
      height: "65%",
      width: "100%",
      borderTopLeftRadius: 24,
      borderTopRightRadius:24,
      paddingTop:32,
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
    itensContainer:{
      justifyContent:"center",
      alignItems:"center",
      marginTop:180,
  },
  itensText:{
      fontSize:14,
      color:"#9a9a9a",
  },


  });