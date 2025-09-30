import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 30,
    justifyContent: "center",
    flex: 1,
    marginBottom: 80,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "700",
    alignItems: "center",
    justifyContent: "center",
  },
  description:{    
    fontSize: 16,
    paddingHorizontal:60,
    color:"gray",
},
  formContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    width: "100%",
    gap:5
  },
  logInContainer: {
    alignItems: "center",
    
  },
  haveAnAccount: {
    color: "black",
    fontSize: 16,
    fontWeight: "300",
  },
  logIn:{
    color: "#2C76E2",
    fontSize: 16,
    fontWeight: "700",
  }
});
