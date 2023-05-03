import { View, Image, Text } from "react-native";
import styles from "./Header.style";
import { images } from '../../../constants';

const Header = (title) => {
    let title_header = (title.header_title) ? title.header_title : ' Liste des comptes journalier';

    return (
        <View >
            <Image 
                source={images.header_image} 
                resizeMode= 'cover'
                style={styles.image_banner}
            />
            <View style={styles.header_title_container}>
                <Text style={styles.header_title}>
                   {title_header}
                </Text>
            </View>
        </View>
    )
}

export default Header;