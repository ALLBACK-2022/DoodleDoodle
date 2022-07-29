function AboutNeeds({ text }) {
  return (
    <div
      className="font-cookierun_s rounded-3xl border-4 border-dashed border-primary whitespace-pre-wrap
          h-[100%] mobile:w-[10.5rem] deskTop:w-[16rem] flex text-center  justify-content-center 
          items-center mobile:text-xl deskTop:text-xl"
    >
      {text}
    </div>
  );
}

export default AboutNeeds;
