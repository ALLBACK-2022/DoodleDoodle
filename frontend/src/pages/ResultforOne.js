import { useLocation } from 'react-router-dom';

function ResultforOne() {
  const location = useLocation();
  console.log(location.state.word);
  return (
    <div>
      <h1>제시어: {location.state.word}</h1>
    </div>
  );
}

export default ResultforOne;
