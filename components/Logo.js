import { StyleSheet, View } from "react-native";
import SVGLogo from "../assets/LOGOTECMAMOVIL.svg";
import COLORS from "../constants/colors";
import Svg, { Circle } from "react-native-svg";

function Logo() {
  return (
    <View style={styles.container}>
      <Svg height="200" width="200">
        <Circle cx="100" cy="100" r="80" fill={COLORS.white} />
      </Svg>
      <SVGLogo height="33%" width="33%" style={styles.svg}></SVGLogo>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  svg: {
    position: "absolute",
  },
});

export default Logo;
