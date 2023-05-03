import {createDatabase} from '../../db/database';
const db = createDatabase();

const getListRecipe = async () => {
    return new Promise((resolve, reject) => {
        db.transaction (tx => {
            tx.executeSql('SELECT * FROM recipe ORDER BY date',
                [],
                (txObj, resultSet) => {
                    db.closeAsync
                    let len = resultSet.rows.length;  
                    if (len > 0) {
                        let result = [];
                        for (let i = 0; i < len; i++) {
                            let items = resultSet.rows.item(i);
                            result.push({
                                id:items.id,
                                date: items.date,
                                profit: items.profit,
                                spent: items.spent
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

const getBenefice = async () => {
    return new Promise((resolve, reject) => {
        db.transaction (tx => {
            tx.executeSql('SELECT * FROM benefi_already_exist',
                [],
                (txObj, resultSet) => {
                    db.closeAsync
                    let len = resultSet.rows.length;  
                    if (len > 0) {
                        let result = [];
                        for (let i = 0; i < len; i++) {
                            let items = resultSet.rows.item(i);
                            result.push({
                                id:items.id,
                                amount: items.amount,
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


const updateBenefice = (amount, benefice_count) => {
    if (benefice_count > 0) {
        return new Promise((resolve, reject) => {
            db.closeAsync
            db.transaction (tx => {
                tx.executeSql('UPDATE benefi_already_exist SET amount=? WHERE id=?',
                    [amount, 1],
                    (txObj, resultSet) => {
                        alert('Bénefice mise à jour');
                        resolve('Ok');                  
                    },
                    (txObj, error) => {
                        console.log(error)
                    }
                )
            });
        })
    } else {
        return new Promise((resolve, reject) => {
            db.transaction (tx => {
                tx.executeSql('INSERT INTO benefi_already_exist (amount) VALUES (?)',
                    [amount],
                    (txObj, resultSet) => {
                        alert('Bénefice mise à jour');
                    },
                    (txObj, error) => {
                        console.log(error)
                    }
                )
            });
        });
    }
}

const delete_line = (id) => {
    return  new Promise((resolve, reject) => {
        db.transaction (tx => {
            tx.executeSql('DELETE FROM recipe WHERE id=?',
                [id],
                (txObj, resultSet) => {
                    db.closeAsync
                    resolve('Ok');
                },
                (txObj, error) => {
                    reject(error);
                }
            )
        });
    });
}

exports.getListRecipe  = getListRecipe;
exports.getBenefice    = getBenefice;
exports.updateBenefice = updateBenefice;
exports.delete_line    = delete_line;