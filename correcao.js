const fs = require('fs');

const dataRecovery = () => {

    const getData = () => {
        const data1 = fs.readFileSync('broken_database_1.json', 'utf-8');
        const dataFirstTable = JSON.parse(data1);

        const data2 = fs.readFileSync('broken_database_2.json', 'utf-8');
        const dataSecondTable = JSON.parse(data2);
        return [dataFirstTable, dataSecondTable];
    }


    const resetValuesNames = () => {
        const regexLetters = /[æø]/g;
        const [dataFirstTable, dataSecondTable] = getData();

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

        for (let i = 0; i < dataSecondTable.length; i++) {
            const marca = dataSecondTable[i].marca;
            dataSecondTable[i].marca = marca.replace(regexLetters, letra => { 
                    switch(letra) {
                    case 'æ':
                    return dataSecondTable[i].marca[0] === 'æ' ? 'A' : 'a';
                    case 'ø':
                    return dataSecondTable[i].marca[0] === 'ø' ? 'O' : 'o';
                }
            });
        }

        for (let i = 0; i < dataFirstTable.length; i++) {
            dataFirstTable[i].vendas = parseInt(dataFirstTable[i].vendas);
        }
        return [dataFirstTable, dataSecondTable];
    }

    resetValuesNames();

    const rebuildDatabase = () => {
        const [dataFirstTable, dataSecondTable] = resetValuesNames();

        const dataJsonFormat1 = JSON.stringify(dataFirstTable)
        fs.writeFile('database_1.json', dataJsonFormat1, err => {
            if (err) throw err;
            console.log('Arquivo salvo database_1!');
        })

        const dataJsonFormat2 = JSON.stringify(dataSecondTable)
        fs.writeFile('database_2.json', dataJsonFormat2, err => {
            if (err) throw err;
            console.log('Arquivo salvo database_2!');
        })
    }

    rebuildDatabase();
}
dataRecovery();
