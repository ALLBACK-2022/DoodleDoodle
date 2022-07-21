const baseURL = 'http://localhost:5000/results/similarity?user-num=';
function GetSimilarity({setChartData, setRandomWordData, setImageUrl}){
    const array = []
    function getResult(){
        fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                "draw-id" : 1
            }),
        }).then(res => res.json())
        .then(res => res.topfive.foreach(
            function fe(element){
                array.push({name : element.dictionary.name, value : element.similarity})
        .then(setImageUrl(element.dictionary.img_url))})).then(setChartData(array)).then(res =>
        setRandomWordData({
            name : res.randword.dictionary.name, value : res.randword.similarity
        }))
    }
    getResult()
}

export default GetSimilarity
