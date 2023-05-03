import { View } from "react-native";
import { useSearchParams } from 'expo-router';
import { Header, AccountAdd}  from '../../components';
import { Stack } from "expo-router";

export default function productAdd() {
  const { header_title } = useSearchParams();
  return (
    <View style={{backgroundColor: '#FFFF', flex: 1}}>
        <Stack.Screen
            options={{
                headerShown: false,
            }}
        />
        <Header header_title={header_title}/>
        <AccountAdd />
    </View>
  )
}