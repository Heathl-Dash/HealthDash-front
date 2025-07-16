import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#4288ca",
    minHeight: 100,
    maxHeight: "80%",
    overflow: "hidden",
  },
  titleContainer: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  closeIcon: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  formContainer: {
    width: "100%",
    gap: 10,
    alignItems: "center",
  },
  bottlesContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    flexWrap: "wrap",
  },
  bottlesContent: {
    width: "48%",
    borderRadius: 12,
  },
  buttonRow: {
    flexDirection: 'row-reverse',
    width: "100%",
    justifyContent: 'space-between',
    marginTop: 20,
  },
});