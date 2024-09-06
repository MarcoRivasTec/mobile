import "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Splash, Login, Welcome, Home, Restablece } from "./screens";
import { AppProvider } from "./components/AppContext";
import { HomeProvider } from "./components/HomeContext";

// const Stack = createNativeStackNavigator();

// export default function App() {
// 	return (
// 		<AppProvider>
// 			<NavigationContainer>
// 				<Stack.Navigator initialRouteName="Splash">
// 					<Stack.Screen
// 						name="Splash"
// 						component={Splash}
// 						options={{
// 							headerShown: false,
// 						}}
// 					/>
// 					<Stack.Screen
// 						name="Login"
// 						component={Login}
// 						options={{
// 							headerShown: false,
// 						}}
// 					/>
// 					<Stack.Screen
// 						name="Restablece"
// 						component={Restablece}
// 						options={{
// 							headerShown: false,
// 						}}
// 					/>
// 					<Stack.Screen
// 						name="Welcome"
// 						component={Welcome}
// 						options={{
// 							headerShown: false,
// 						}}
// 					/>
// 					<Stack.Screen
// 						name="Home"
// 						component={Home}
// 						options={{
// 							headerShown: false,
// 						}}
// 					/>
// 				</Stack.Navigator>
// 			</NavigationContainer>
// 		</AppProvider>
// 	);
// }

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
			</HomeStack.Navigator>
		</HomeProvider>
	);
}

export default function App() {
	return (
		<AppProvider>
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
		</AppProvider>
	);
}
