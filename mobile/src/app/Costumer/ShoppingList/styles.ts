import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 60,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    flexDirection: "row",
    
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",    
    justifyContent:"space-around",
    flex:1, 
    gap:70,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2C46B1",
    textAlign: "center",

  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 24,
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
    fontSize: 16,
    color: "#9a9a9a",
    textAlign: "center",
  },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    width: "80%",
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    justifyContent: "space-between",
  },
});
