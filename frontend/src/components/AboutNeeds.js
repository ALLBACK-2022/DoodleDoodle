function AboutNeeds({ text }) {
  return (
    <div
      className="font-cookierun_m rounded-3xl border-4 border-dashed border-primary 
          h-[100%] mobile:w-[10rem] deskTop:w-[15rem] flex text-center justify-content-center 
          items-center mobile:text-xs deskTop:text-sm"
    >
      {text}
    </div>
  );
}

export default AboutNeeds;
