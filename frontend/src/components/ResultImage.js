function ResultImage({ imageUrl }) {
  return (
    <img
      src={imageUrl}
      alt=""
      className="absolute h-[40%] top-1/2 left-1/2
        -translate-y-[50%] -translate-x-[50%]"
    />
  );
}

export default ResultImage;
