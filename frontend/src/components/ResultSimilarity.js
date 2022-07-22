import { useLocation } from 'react-router';

const baseURL = 'http://localhost:5000/results/similarity';
function ResultSimilarity({setChart, setRandomWordData, setImageUrl}){
    const location = useLocation();
    // const array = []
    function getResult(){
        fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                "game-id" : location.gameId,
                "task-id" : [],
            }),
        }).then(res => res.json())
        .then(res => Object.keys(res.topfive).foreach(
            function func(element){
                setChart({'name' : element.dictionary.name, 'value' : element.similarity})
        .then(setImageUrl({'url' : element.dictionary.img_url}))})).then(res =>
        setRandomWordData({
            name : res.randword.dictionary.name, value : res.randword.similarity
        }))
    }
    getResult()
}

export default ResultSimilarity
