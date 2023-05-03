import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container_table: {
        marginTop: 10,
        marginBottom: 10,
        
        borderColor: '#EAEAEA',
        borderWidth: 1,
        borderRadius: 5, 
        flex: 1
    },

    table_row: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1
    },

    table_cell: {
        width: 75,
        padding: 10,
        position: 'relative',
    },

    table_cell_action: {
        justifyContent:"center",
        alignItems: 'center',
        width: 16,
    },  

    table_cell_title: {
        color: 'grey',
    },

    table_cell_text: {
        textAlign: 'center'
    },

    edit_ligne: {
        height: 20,
        width: 20,
    },

    calendar: {
        height: 15,
        width: 15,
        position:'absolute',
        top: 10
    },

    total_benef: {
        fontWeight: 'bold',
    },

    button_bottom_right:{
        borderColor:'#2196F3',
        borderWidth:1,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom:10,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: '#2196F3',
        elevation: 5,
        flexDirection: 'row',
    },

    button_bottom_left: {
        borderColor:'#007AFF',
        borderWidth:1,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom:10,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: '#007AFF',
        elevation: 5,
        flexDirection: 'row',
    },

    button_bottom_container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },  

    button_bottom_text: {
        color: 'white',
        textAlign: 'center'
    },

    icons_button_bottom: {
        width: 15,
        height: 15,
        marginLeft: 10
    }
});

export default styles;
