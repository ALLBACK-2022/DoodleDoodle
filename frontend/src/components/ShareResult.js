import html2canvas from 'html2canvas';

function ShareResult(){
    async function shareImage(file) {
        if(file != null) {
            navigator.share(file);
        }
        console.log('No File');
      }
      function capture() {   
        html2canvas(document.body)     
        .then(            
            function (canvas) {              
                drawImg(canvas.toDataURL('image/png'));
                saveAs(canvas.toDataURL(), 'file-name.png');            
            }).catch(function (err) {                
                console.log(err);            
            });
        }
    shareImage(capture());
    return <button
            className={`font-cookierun lg:text-2xl sm:text-lg px-[1.5rem] py-[0.3rem] rounded-full whitespace-nowrap
                ${isforOne ? 'bg-primary-3 text-primary-1' : 'bg-black text-primary'}`}
            >
            자랑하기
        </button>
}

export default ShareResult;