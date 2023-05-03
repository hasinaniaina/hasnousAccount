import { Header, Home }  from '../components';
import { Stack } from "expo-router";
import { View} from "react-native";

const Main = () => {
    return (
        <View style={{backgroundColor: '#FFFF', flex: 1}}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <Header/>
            <Home/>
        </View>
    )
}

export default Main;