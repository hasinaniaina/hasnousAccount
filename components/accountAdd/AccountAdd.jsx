import {   
    Text, View, SafeAreaView,
    TextInput, Image, 
    TouchableOpacity, FlatList, Button} from 'react-native';
import {getListProducts, addAccount} from './AccountAdd.controller';
import React, { useEffect, useState, useRef } from 'react';
import styles from './AccountAdd.style';
import icons from '../../constants/icons';
import {  Link, useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function AccountAdd() {
  const [product, setProduct]           = useState([]);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate]                 = useState(new Date(Date.now()));
  const [price, setPrice]               = useState([{price: ''}]);
  const [recette, setRecette]           = useState({depense: '', benefice: '', earning: ''});
  const router                          = useRouter();


    useEffect(() => {
      const getProduct = async () => {
          setProduct(await getListProducts());
      }
      getProduct();
    }, [  ]);


    const showPicker = () => {
        setIsPickerShow(true);
    };

    const onChange = (event, value) => {
        setDate(value);
        if (Platform.OS === 'android') {
          setIsPickerShow(false);
        }
    };

    const calculPrice = (remain_quantity, container_weight, product_price, used_quantity, index) => {
        let new_calculated_price = parseFloat(product_price) * (parseFloat(used_quantity) - (parseFloat(remain_quantity) - parseFloat(container_weight)));
        let test                 = [];
        let total_depense        = 0

        for (let i = 0; i < product.length; i++) {
            if (i == index) {
              total_depense += parseFloat(new_calculated_price);
              test[index] = {
                price: new_calculated_price
              }   
            } else {
              let test_2 = (price[i]) ? price[i].price : 0
              total_depense += parseFloat(test_2);
              test[i] = {
                price: test_2
              }
            }    
        }
        console.log(test)
        setPrice(test);

        let earning_tmp = (recette.earning) ? parseFloat(recette.earning) : 0;
        calculBenefice(earning_tmp, total_depense);
    }

   
    const calculBenefice = (earning, total_depense) => {
      let earning_tmp = (earning) ? parseFloat(earning) : 0;
      let depense_tmp = (total_depense) ? parseFloat(total_depense) : 0;
      let benefice_tmp = earning_tmp - depense_tmp ;
    
      setRecette({
        depense: String(depense_tmp),
        benefice: String(benefice_tmp),
        earning: String(earning_tmp),
      });
    }

  if (product.length == 0) {
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text style={{fontWeight: "bold", marginBottom: 10}}>Vous n'avez pas de produit</Text>
        <Link style={styles.button_bottom_right} href={{ pathname: "/pages/productList", params: {header_title: 'liste des produits'}}}>
            <Image 
              source={icons.list}
              resizeMode='cover'
              style={styles.icons_button_bottom}
            />
            <Text style={styles.button_bottom_text}>Veuillez vous rediriger vers la liste des produits</Text>
          </Link>
      </View>
    )
  }
  
  return (
      <SafeAreaView style={{flex: 1, marginBottom: 12}}>
        <View style={styles.container}>
          <FlatList
              data={product}
              ListHeaderComponent={
                <View>
                  <View style={styles.pickedDateContainer}>
                    <Text style={styles.pickedDate}>{date.toLocaleDateString()}</Text>
                  </View>


                  {!isPickerShow && (
                    <View style={styles.btnContainer}>
                      <Button title="Changer la date" color="purple" onPress={showPicker} />
                    </View>
                  )}

                  {isPickerShow && (
                    <DateTimePicker
                      value={date}
                      mode={'date'}
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      is24Hour={true}
                      onChange={onChange}
                      style={styles.datePicker}
                    />
                  )}
                </View>
              }
              renderItem={({item, index}) =>
                  <SafeAreaView>                    
                      <SafeAreaView style={styles.container_text_input}>
                          <View style={styles.text_label_container}>
                              <Text>Produit</Text>
                              <TextInput
                                  style={styles.text_input_disabled}
                                  defaultValue={(item.name ? item.name : "")}
                                  editable={false}
                              />
                          </View>
                          <View style={styles.text_label_container}>
                              <Text>Quantité utilisée par jour</Text>
                              <TextInput
                                  style={styles.text_input_disabled}
                                  defaultValue={(item.used_quantity) ? String(item.used_quantity ): 0}
                                  editable={false}
                              />
                          </View>
                          <View style={styles.text_label_container}>
                              <Text>Quantité restante après vente</Text>
                              <TextInput
                                  placeholder='Saisir la quantité restante'
                                  onChangeText={(remain) => {
                                      calculPrice(remain, item.container_weight ,item.price, item.used_quantity, index)
                                  }}   
                                  keyboardType='numeric'
                                  style={styles.text_input}
                              />
                          </View>
                          <View style={styles.text_label_container}>
                              <Text>Prix</Text>
                              <TextInput
                                  style={styles.text_input_disabled}
                                  defaultValue={(price[index]) ? String(price[index].price) : 0}
                                  editable={false}
                              />
                          </View>
                      </SafeAreaView>
                      <SafeAreaView style={{width: '100%', borderWidth: 1, borderColor: '#EAEAEA'}}></SafeAreaView>
                  </SafeAreaView>
              }
          keyExtractor={item => item.id} 
          ListFooterComponent={
            <View style={{padding: 10, backgroundColor:'#f7f5f5', borderRadius: 5}}>
              <View style={styles.text_label_total_earn_today_container}>
                  <Text style={{fontWeight: 'bold'}}>Recette d'aujourd'hui:</Text>
                  <TextInput
                      style={styles.text_input_disabled_footer}
                      editable={false}
                      defaultValue={(recette) ? String(recette.depense) : 0}
                  />
                  <Text style={{fontWeight: 'bold'}}>Total de l'argent gagné aujourd'hui:</Text>
                  <TextInput
                      style={styles.text_input_total_earn_today}
                      onChangeText={(earning) => {
                        calculBenefice(earning, recette.depense)
                      }}
                      defaultValue={(recette) ? String(recette.earning) : 0}
                      keyboardType='numeric'
                  />
                  <Text style={{fontWeight: 'bold'}}>Bénéfice d'aujourd'hui:</Text>
                  <TextInput
                      style={styles.text_input_disabled_footer}
                      defaultValue={(recette) ? String(recette.benefice) : 0}
                  />
              </View>

              <View style={styles.button_bottom_container}>
                <Link style={styles.button_bottom_right}  href={{ pathname: "/home"}}>
                    <Image 
                    source={icons.back}
                    resizeMode='cover'
                    style={styles.icons_button_bottom}
                    />  
                    <Text style={styles.button_bottom_text}>Retour</Text>
                </Link>


                <TouchableOpacity style={styles.button_bottom_left} onPress={() => { 
                      let result =  addAccount(date, recette.benefice, recette.depense);
                        if (result !== 'NOK') {
                          setRecette({
                            depense: "",
                            benefice: "",
                            earning: "",
                          });
                          router.push({ pathname: "/home", params: {change: true }});
                        }
                    }
                  }
                    >
                    <Image 
                    source={icons.save_quit}
                    resizeMode='cover'
                    style={styles.icons_button_bottom}
                    />
                    <Text style={styles.button_bottom_text}>Enregistrer</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          />
        </View>
    </SafeAreaView>
  )
}


