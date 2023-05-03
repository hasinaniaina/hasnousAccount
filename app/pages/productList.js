import { Header, ProductList }  from '../../components';
import { Stack } from "expo-router";
import { View} from "react-native";
import { useSearchParams } from 'expo-router';

export default function productList() {
  const { header_title } = useSearchParams();
  return (
    <View style={{backgroundColor: '#FFFF', flex:1}}>
        <Stack.Screen
            options={{
                headerShown: false,
            }}
        />
        <Header header_title={header_title}/>
        <ProductList />
    </View>
  )
}
