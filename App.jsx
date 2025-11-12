import "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Splash, Login, Welcome, Home, Restablece, GafeteQR } from "./screens";
import { AppProvider } from "./components/AppContext";
import { HomeProvider } from "./components/HomeContext";
import FlashMessage from "react-native-flash-message";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Create a new stack for Welcome and Home
const MainStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
	return (
		<HomeProvider>
			<HomeStack.Navigator>
				<HomeStack.Screen
					name="Welcome"
					component={Welcome}
					options={{
						headerShown: false,
					}}
				/>
				<HomeStack.Screen
					name="Home"
					component={Home}
					options={{
						headerShown: false,
					}}
				/>
				<HomeStack.Screen
					name="GafeteQR"
					component={GafeteQR}
					options={{
						headerShown: false,
					}}
				/>
			</HomeStack.Navigator>
		</HomeProvider>
	);
}

export default function App() {
	return (
		<AppProvider>
			<SafeAreaProvider>
				<NavigationContainer>
					<MainStack.Navigator initialRouteName="Splash">
						<MainStack.Screen
							name="Splash"
							component={Splash}
							options={{
								headerShown: false,
							}}
						/>
						<MainStack.Screen
							name="Login"
							component={Login}
							options={{
								headerShown: false,
							}}
						/>
						<MainStack.Screen
							name="Restablece"
							component={Restablece}
							options={{
								headerShown: false,
							}}
						/>
						<MainStack.Screen
							name="WelcomeHome"
							component={HomeStackScreen}
							options={{
								headerShown: false,
							}}
						/>
					</MainStack.Navigator>
				</NavigationContainer>

				<FlashMessage position="top" />
			</SafeAreaProvider>
		</AppProvider>
	);
}
