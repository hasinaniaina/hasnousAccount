import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        borderColor: '#EAEAEA',
        borderWidth: 1,
        borderRadius: 5,
        height: '100%'
    },

    text_input: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 5,
        borderColor: '#c4c4c4',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        color: '#969696'
    },

    container_text_input: {
        margin: 10
    },

    button_bottom_right:{
        borderColor:'#2196F3',
        borderWidth:1,
        borderRadius: 20,
        backgroundColor: '#2196F3',
        elevation: 5,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom:10,
        marginBottom: 10,
        flexDirection: 'row',
    },

    button_bottom_left: {
        borderColor:'#007AFF',
        borderWidth:1,
        borderRadius: 20,
        backgroundColor: '#007AFF',
        elevation: 5,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom:10,
        marginBottom: 10,
        flexDirection: 'row',
    },

    button_bottom_container:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },  

    button_bottom_text: {
        color: 'white',
        textAlign: 'center'
    },

    icons_button_bottom: {
        width: 15,
        height: 15,
    }
});

export default styles;
