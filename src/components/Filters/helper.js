const orderQueryCreator = (order) => {
    let words = search.split(" ");
    let querys = [];
    console.log(words)
    for(let i=0; i<words.length; i++){
        let query = ""
        query += `title=${words[i]}&username=${words[i]}&tag=${words[i]}`
        querys.push(query)
    }
    return querys;
}

export default orderQueryCreator;