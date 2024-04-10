import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import IcoMoonSelection from "../../assets/icons/icomoon/selection.json";
//import React, { useState } from "react";
//import COLORS from "../../constants/colors";

const Icon = createIconSetFromIcoMoon(
	IcoMoonSelection,
	"IcoMoon",
	"icomoon.ttf"
);

// const Icons = {
// 	INFO_PERS: <Icon name="INFO_PERS" size={20} color={COLORS.main} />,
// 	AREA: <Icon name="AREA" size={20} color={COLORS.main} />,
// 	REDES: <Icon name="REDES" size={20} color={COLORS.main} />,
// 	OPINIONES: <Ionicons name="chatbox-ellipses-outline" size={26} color={COLORS.main} />,
// 	DIRECTORIO: <Icon name="DIRECTORIO" size={20} color={COLORS.main} />,
// };

export default Icon;
