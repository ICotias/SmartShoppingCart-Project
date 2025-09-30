import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 60,
  },

  title: {
    fontSize: 25, 
    fontWeight: "600",
    color: "black",
  },
  topContainer: {
    alignItems: "center",
    paddingHorizontal: 24,
    flexDirection: "row",
    paddingBottom: 32,
    justifyContent: "space-around",
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  listTitle: {
    fontSize: 24, 
    fontWeight: "500",
    color: "black",
    marginBottom: 16,
  },
  grayBorderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: "#d3d3d3",
    width: "96%",
    height: 1,
    marginLeft: 9,
    marginTop: 10,
    marginBottom: 10,
  },
  itensContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 180,
  },
  itensText: {
    fontSize: 14,
    color: "#9a9a9a",
  },
});