window.addEventListener("load",()=>{
    setTimeout(()=>{
        if(localStorage.getItem("token") != null){
            window.location.href = './Feed/feed.html';
        }
    },2000)
})