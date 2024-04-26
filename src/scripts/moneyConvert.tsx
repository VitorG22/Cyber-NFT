async function ConvertFetch(){
    var bid:number;
    
    return await fetch('https://economia.awesomeapi.com.br/last/ETH-USD')
        .then(resp => resp.json())
        .then(res => bid= res.ETHUSD.bid)
        .finally(()=>{return bid})
        .catch(err => console.error(err))
}

export var convertValue:any =  ConvertFetch()