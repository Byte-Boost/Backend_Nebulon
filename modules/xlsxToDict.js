

export default function extrairTabela(filename){

    const XLSX = require('xlsx')

    let worksheets = {}
    let planilha = XLSX.readFile(filename)
    
    let pegarColuna = (letra,pagina) => {
    
        return Object.keys(planilha['Sheets'][pagina]) // Getting all filled cells
                    .reduce(   // Executing a function for each cell
                    (coluna, celula) => {
    
                        if (celula.startsWith(letra)) {
                            coluna.push(planilha['Sheets'][pagina][celula].v);
                        }
    
                        return coluna;
                    }
                    , [] // = column (it starts as an empty array)
                    );
        
    }
    
    let quantasColunas = (pagina) => {
        let s = planilha['Sheets'][pagina]['!ref']
        let ultimo = s[s.length-2]
        let prim = s[0]
        
        return ultimo.charCodeAt() - prim.charCodeAt()
    }
    
    for(p in planilha['Sheets']){
    
        worksheets[p] = {}
        for (let i = 0; i < quantasColunas(p); i++) {
            let intLetra = String.fromCharCode(65 + i)
            let vetor = pegarColuna(intLetra,p)
            let nom = vetor[0]
            vetor[0] = null
            worksheets[p][nom] = vetor.slice(1,vetor.length)
            
        }
    
    }
    return worksheets

}

/*
let TabelaExtraida = extrairTabela("TestJS.xlsx")
console.log(TabelaExtraida)
*/