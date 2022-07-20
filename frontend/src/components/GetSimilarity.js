const baseURL = 'http://localhost:5000/results/similarity';
function GetSimilarity({setChartData, setRandomWordData, setImageUrl}){
    var array = []
    function getResult(){
        fetch(baseURL, {
            method: "POST",
            headers: {
                'Content-Type' : "application/json",
            },
            body: JSON.stringify({
                "draw-id" : 1
            }),
        }).then(res => res.json())
        .then(res => res.topfive.foreach(
            element => array.push({name : element.dictionary.name, value : element.similarity})
        ).then(setImageUrl(element.dictionary.img_url))).then(setChartData(array))
        .then(res => array = {
            name : res.randword.dictionary.name, value : res.randword.similarity
        })
        setRandomWordData(array)
        return res
    }
    return getResult()
}

export default GetSimilarity
