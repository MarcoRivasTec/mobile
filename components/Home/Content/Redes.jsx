import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ImageBackground,
	Linking,
} from "react-native";
import { redes } from "./styles";
import ContentHeader from "./ContentHeader";
import Icon from "../icons";
import COLORS from "../../../constants/colors";

function Redes() {
	function MediaStrip({ icon, link1, link2, link3 }) {
		// Navigate to the desired screen or link
		// For example, navigating to a web link
		const handlePress1 = () => {
			Linking.openURL(link1);
		};
		const handlePress2 = () => {
			Linking.openURL(link2);
		};
		const handlePress3 = () => {
			Linking.openURL(link3);
		};
		return (
			<View style={redes.stripContainer}>
				<ImageBackground
					source={require("../../../assets/MEDIA_STRIP.png")}
					style={redes.stripImg}
				>
					<View style={redes.iconContainer}>
						<Icon name={icon} size={25} color={COLORS.white} />
					</View>
					<View style={redes.linksContainer}>
						<TouchableOpacity
							onPress={handlePress1}
							style={redes.linkContainer}
						>
							<Text style={redes.text}>West</Text>
						</TouchableOpacity>
						<Text style={redes.text}>|</Text>
						<TouchableOpacity
							onPress={handlePress2}
							style={[
								redes.linkContainer,
								{ paddingLeft: "2%", paddingRight: "3%" },
							]}
						>
							<Text style={redes.text}>Central</Text>
						</TouchableOpacity>
						<Text style={redes.text}>|</Text>
						<TouchableOpacity
							onPress={handlePress3}
							style={redes.linkContainer}
						>
							<Text style={redes.text}>East</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</View>
		);
	}

	return (
		<View style={redes.container}>
			<ContentHeader title="Redes" />
			<View style={redes.contentContainer}>
				<View style={redes.titleContainer}>
					<Text style={redes.titleText}>
						Síguenos en nuestras Redes Sociales
					</Text>
				</View>
				<View style={redes.socialContainer}>
					<MediaStrip
						icon="FACEBOOK"
						// West
						link1="https://www.facebook.com/Tecmatijuana"
						// Central
						link2="https://www.facebook.com/Tecmajrz"
						// East
						link3="https://www.facebook.com/TecmaMty"
					/>
					<MediaStrip
						icon="INSTAGRAM"
						// West
						link1="https://www.instagram.com/tecmatijuana/"
						// Central
						link2="https://www.instagram.com/tecmajrz/
						"
						// East
						link3="https://www.instagram.com/tecmamty/"
					/>

					<MediaStrip
						icon="WHATSAPP" // West
						link1="https://www.facebook.com/Tecmatijuana"
						// Central
						link2="https://www.facebook.com/Tecmajrz"
						// East
						link3="https://www.facebook.com/TecmaMty"
					/>

					<MediaStrip
						icon="LINKEDIN"
						// West
						link1="https://www.linkedin.com/company/tecmatijuana/"
						// Central
						link2="https://www.linkedin.com/company/tecma-jrz/"
						// East
						link3="https://www.linkedin.com/company/tecma-mty/"
					/>
					<MediaStrip
						icon="TIKTOK" // West
						link1="https://www.tiktok.com/@tecmatijuana"
						// Central
						link2="https://www.tiktok.com/@tecmajrz"
						// East
						link3="https://www.tiktok.com/@tecmamty"
					/>
				</View>
			</View>
		</View>
	);
}

export default Redes;
