import { Text, View,Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import icons from '../../constants/icons';
import styles from './ProductList.style';
import {  Link, useRouter } from 'expo-router';
import {getListProducts, delete_line} from './ProductList.controller';




export default function ProductList() {
    const router                  = useRouter();
    let   [changed, setChanged]   = useState(false);
    let   [products, setProducts] = useState("");

    const compareValue = async () => {
        let product_new = JSON.stringify(await getListProducts());
        let product_old = JSON.stringify(products);

        if (product_new === product_old) {
            setChanged(false);
        } else {
            setChanged(true);
        }
    }

    compareValue()

    useEffect(() => {
        getListProducts().then((result) => {
            setProducts(result);
        })
    }, [changed]);


    return (
        <View style={{flex: 1}}>
            <View style={styles.container_table}>
                <View>
                    <View style={styles.table_row}>
                        <View style={styles.table_cell}>
                            <Text style={[styles.table_cell_text, styles.table_cell_title]}>Produit</Text>
                        </View>
                        <View style={styles.table_cell}>
                            <Text style={[styles.table_cell_text, styles.table_cell_title]}>Prix</Text>
                        </View>
                        <View style={styles.table_cell}>
                            <Text style={[styles.table_cell_text, styles.table_cell_title]}>Quantité</Text>
                        </View>
                        <View style={styles.table_cell}>
                        </View>
                    </View>
                </View>
                <View>
                    <FlatList
                        data={products}
                        style={{height: 200}}
                        renderItem={({item}) => 
                            <View style={styles.table_row}>
                                <View style={styles.table_cell}>
                                    <Text style={styles.table_cell_text}>{item.name}</Text>
                                </View>
                                <View style={styles.table_cell}>
                                    <Text style={styles.table_cell_text}>{parseFloat(item.price).toLocaleString()} Ariary</Text>
                                </View>
                                <View style={styles.table_cell}>
                                    <Text style={styles.table_cell_text}>{item.used_quantity}</Text>
                                </View>
                                <TouchableOpacity style={[styles.table_cell, styles.table_cell_action]} onPress={
                                    () => {
                                        router.push(
                                            {pathname: "/pages/productAdd", 
                                            params: {header_title: 'Ajout produit', id: item.id}
                                            }
                                            ) 
                                        }}>
                                    <Image 
                                        source={icons.edit}
                                        resizeMode='cover'
                                        style={styles.edit_ligne}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.table_cell, styles.table_cell_action]} onPress={
                                    () => {
                                        delete_line(item.id).then((result) => {
                                            if (result == 'Ok') {
                                                router.push('/pages/productList', {header_title: 'liste des produits'});
                                                setProducts("");
                                            }
                                        })
                                        }}>
                                    <Image 
                                        source={icons.delete_icon}
                                        resizeMode='cover'
                                        style={styles.delete_ligne}
                                    />
                                </TouchableOpacity>
                            </View>
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
            <View style={{padding:10}}>
                <View style={styles.button_bottom_container}>
                    <Link style={styles.button_bottom_right}  href={{ pathname: "/home"}}>
                        <Image 
                        source={icons.back}
                        resizeMode='cover'
                        style={styles.icons_button_bottom}
                        />
                        <Text style={styles.button_bottom_text}>Retour</Text>
                    </Link>


                    <Link style={styles.button_bottom_left} href={{ pathname: "/pages/productAdd", params: {header_title: 'Ajout produit'}}}>
                        <Image 
                        source={icons.add}
                        resizeMode='cover'
                        style={styles.icons_button_bottom}
                        />
                        <Text style={styles.button_bottom_text}>Ajout produit</Text>
                    </Link>
                </View>
            </View>
        </View>
    )
}
