import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

export const login = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: 15,
    overflow: "hidden",
  },
  dataContainer: {
    flex: 1,
    marginHorizontal: "10%",
    justifyContent: "flex-end",
  },
  field: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    marginBottom: 15,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBox: {
    flex: 1,
    borderBottomLeftRadius: 24,
    borderTopLeftRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    width: "100",
    height: "100%",
    backgroundColor: COLORS.naranja,
  },
  svg: {
    marginLeft: "10%",
  },
  picker: {
    marginLeft: "-2.5%",
    flex: 7,
    width: "100%",
  },
  pickerItem: {
    fontWeight: "bold",
  },
  userInput: {
    paddingLeft: 8,
    flex: 7,
    width: "100%",
  },
  passEye: {
    position: "absolute",
    right: 12,
    flex: 1,
  },
  chkBoxContainer: {
    flexDirection: "row",
    marginVertical: 2,
    marginBottom: 8,
    paddingLeft: 6,
  },
  restablecerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: "4%",
  },
  restablecerTextIzq: {
    fontSize: 14,
    color: COLORS.black,
  },
  restablecerTextDer: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "bold",
    marginLeft: 6,
  },
});
