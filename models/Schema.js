module.exports = {
    
    migrate(model) {
        let createTable = '';
        for (let k in model.Schema) {
            createTable += ` ${k}`;
            for(let i = 0; i < model.Schema[k].length; i++) {
                createTable += ` ${model.Schema[k][i]}`;
            }
            createTable += `,`
        }
        createTable = createTable.slice(0, -1);
        createTable += ';'
        console.log(createTable);
    }
}