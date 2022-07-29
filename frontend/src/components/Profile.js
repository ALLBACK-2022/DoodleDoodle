// import profile from '../assets/icons/user.png';

function Profile({ name, profile, url }) {
  return (
    <div className="flex flex h-[100%] w-1/3 items-center justify-center">
      <a href={url} target="_blank" rel="noreferrer">
        <img className="deskTop:w-[4rem] deskTop:h-[4rem] mobile:w-[2.5rem] mobile:h-[2.5rem]" src={profile} alt="" />
      </a>
      <div
        className="font-cookierun_s ml-[0.5rem] w-[3rem] h-[3rem] text-center 
      deskTop:text-xl mobile:text-lg"
      >
        {name}
      </div>
    </div>
  );
}

export default Profile;
