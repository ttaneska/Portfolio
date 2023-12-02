let showMe=document.getElementById("show");
let jokesUrl=`https://official-joke-api.appspot.com/random_joke`
let buttonShow=document.getElementById("randomJoke")



function showRandomJoke(){
showMe.innerHTML=" ";

    fetch(jokesUrl)
        .then(response=>response.json())
        .then(parsedResponse=>{
            let joke=parsedResponse.setup
            showMe.innerHTML+=`<p>${joke}</p>`
            
            setTimeout(()=>{
                let answer=parsedResponse.punchline
            showMe.innerHTML+=`<p>${answer}</p>`;
            showMe.innerHTML += `<p class="smiley">&#128513;</p>`;
            },2000
            )
        })
        .catch(error=>console.log(error))
    }
buttonShow.addEventListener("click",showRandomJoke)