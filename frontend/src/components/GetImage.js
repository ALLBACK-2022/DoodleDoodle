function GetImage({imageUrl}){
    return <img
        src={imageUrl}
        alt=""
        className="absolute w-[50%] h-[50%] top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%]"
    />
}

export default GetImage