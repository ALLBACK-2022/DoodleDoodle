import { useLocation } from 'react-router';

const baseURL = 'http://localhost:5000/results/similarity?user-num=';
function ResultSimilarity({setChartData, setRandomWordData, setImageUrl}){
    const location = useLocation();
    const array = []
    function getResult(){
        fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                "draw-id" : location.drawId,
                "player-num" : location.playerNum,
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

export default ResultSimilarity
