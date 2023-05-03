import { add } from 'react-native-reanimated';
import {createDatabase} from '../../db/database';

const db = createDatabase();

const getListProducts = async () => {
    return  new Promise((resolve, reject) => {
        db.transaction (tx => {
            tx.executeSql('SELECT * FROM products',
                [],
                (txObj, resultSet) => {
                    let len = resultSet.rows.length;  
                    if (len > 0) {
                        let result = [];
                        for (let i = 0; i < len; i++) {
                            let items = resultSet.rows.item(i);
                            result.push({
                                id:items.id,
                                name: items.name,
                                price: items.price,
                                used_quantity: items.used_quantity,
                                container_weight: items.container_weight
                            });
                        }

                         resolve(result);
                    }
                    
                },
                (txObj, error) => {
                     reject('error');
                }
            )
        });
    });
}

const addAccount = (date, benefice, depense) => {
    if (date && benefice && depense) {
        let date_tmp = date.toLocaleDateString();
        db.transaction(tx => {
            tx.executeSql('INSERT INTO recipe (date, profit, spent) VALUES (?, ?, ?)',
                [date_tmp, benefice, depense],
                (txObj, resultSet) => {
                    db.closeAsync
                    alert('Compte inséré');
                },
                (txObj, error) => {
                    console.log(error)
                }
            );

            tx.executeSql('SELECT * FROM recipe',
                [],
                (txObj, resultSet) => {
                    console.log(resultSet)
                },
                (txObj, error) => {
                    console.log(error)
                }
            )
        })
    } else {
        if (!date) {
            alert('La date doit être renseigné');
        } else if (!benefice) {
            alert('le Champ bénéfice d\'aujourd\'hui n\'a pas été renseigné');
        } else {
            alert('le recette d\'aujourd\'hui n\'a pas été renseigné');
        }

        return 'NOK';
    }
}

exports.getListProducts =  getListProducts;
exports.addAccount = addAccount;