import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  image_banner: {
    height:200,
    width: '100%'
  },

  header_title_container: {
   position:'absolute',
   top: 0,
   right: 0,
   bottom: 0,
   left: 0,
   alignContent:'center',
   justifyContent:'center'
  },

  header_title: {
    textAlign:'center',
    fontSize: 20,
    fontWeight:"bold"
  }
});

export default styles;
