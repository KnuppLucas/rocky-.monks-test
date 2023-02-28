const fs = require('fs');

const getData = () => {

    fs.readFile('broken_database_1.json', 'utf-8', (err, data) => {
        if(err){
            console.log(err);
            return;
        }
    
        const dataFirstTable = JSON.parse(data);
        console.log(dataFirstTable);

        const regexSubstituicao = /[æø]/g;
        
        const dataCorrected = dataFirstTable.map( element => {
                const elementFixed = element['nome'].replace(regexSubstituicao, function(letra){
                    switch (letra) {
                        case 'æ':
                          return 'a';
                        case 'ø':
                          return 'o';
                    }
                });
                return elementFixed;
            }
        )
        console.log(dataCorrected);

        
    })


    fs.readFile('broken_database_2.json', 'utf-8', (err, data) => {
        if(err){
            console.log(err);
            return;
        }
    
        const dataSecondTable = JSON.parse(data);
        console.log(dataSecondTable);
        return dataSecondTable;
    })

    
}

getData();





/* const getData = async () => {
    fetch('broken_database_1.json')
        .then(response => response.json())
        .then(data => {
            dados = data;
            console.log(data);
        })
        .catch(er => console.log(er));
    }

getData(); */

