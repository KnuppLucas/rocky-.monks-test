const fs = require('fs');

const dataRecovery = () => {

    const getData = () => {
        const data1 = fs.readFileSync('broken_database_1.json', 'utf-8');
        const dataFirstTable = JSON.parse(data1);
        //console.log(dataFirstTable);

        const data2 = fs.readFileSync('broken_database_2.json', 'utf-8');
        const dataSecondTable = JSON.parse(data2);
        //console.log(dataSecondTable);

        

        return dataFirstTable;
    }


    const resetValuesNames = () => {
        const regexLetters = /[æø]/g;
        const dataFirstTable = getData();

        for (let i = 0; i < dataFirstTable.length; i++) {
            const nome = dataFirstTable[i].nome;
            dataFirstTable[i].nome = nome.replace(regexLetters, letra => { 
                    switch(letra) {
                    case 'æ':
                    return dataFirstTable[i].nome[0] === 'æ' ? 'A' : 'a';
                    case 'ø':
                    return dataFirstTable[i].nome[0] === 'ø' ? 'O' : 'o';
                }
            });
        }

        for (let i = 0; i < dataFirstTable.length; i++) {
            dataFirstTable[i].vendas = parseInt(dataFirstTable[i].vendas);
        }
        console.log(dataFirstTable)
        return dataFirstTable;
    }

    resetValuesNames()

    const rebuildDatabase = (data) => {
        const dataJsonFormat = JSON.stringify(data)
        fs.writeFile('database_1.json', dataJsonFormat, err => {
            if (err) throw err;
            console.log('Arquivo salvo!');
        })
        return dataJsonFormat;
    }

    console.log(rebuildDatabase(resetValuesNames()));
}
dataRecovery();
