import { createStackNavigator } from "@react-navigation/stack";
import Inicio from "../pages/Home/Inicio";
import Detalles from "../pages/Detalles/Detalles";

const Stack = createStackNavigator();

const AppRouter = () => {
    return (
        <Stack.Navigator initialRouteName="Inicio">
            <Stack.Screen
                name="Inicio"
                component={Inicio}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Detalles"
                component={Detalles}
                options={{ 
                    headerShown: false,
                    presentation: 'modal',
                }}
            />
        </Stack.Navigator>
    )
}


export default AppRouter;