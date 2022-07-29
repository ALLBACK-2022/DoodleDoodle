import { Link } from 'react-router-dom';

function MainText({ text }) {
  return (
    <Link to="/about">
      <div className="font-cookierun text-primary-1 textborder">
        <h1 className="textshadow deskTop:text-[8vw] mobile:text-[15vw] mobile:text-center">{text}</h1>
      </div>
    </Link>
  );
}
export default MainText;
