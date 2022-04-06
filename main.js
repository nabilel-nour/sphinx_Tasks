

let resurse = document.querySelector(".resbutton");
let help = document.querySelector(".helpbutoon");
let resursepop = document.querySelector(".resourse")
let helppop = document.querySelector(".help")
let closebutton = document.querySelectorAll(".closeicon")
let letter_P = document.querySelector(".letter_P");
let letter_A = document.querySelector(".letter_A");
let reload = document.querySelector(".reload");
let shanwsor = document.querySelector(".shanwsor");
let anwsors= document.querySelectorAll(".onclick");


// resize container funcation
document.getElementById("con").style.transform="scale("+ Math.min(document.documentElement.clientHeight/960, document.documentElement.clientWidth/1280) +")";
 document.getElementById("con").style.left=""+ (document.documentElement.clientWidth -(Math.min(document.documentElement.clientHeight/960, document.documentElement.clientWidth/1280)*1280))/2 +"px";
//add event listener if the resize happend
window.addEventListener('resize',()=>{

    // geting the width and hight for the screen of the window 
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight;

    //resize the container to fit the screen after resizing 
    
    //here we getting the minimun number to scale it down  
    // by geting the hight of screen after resize and divided by the size of container 
    //and the same for the width
    document.getElementById("con").style.transform="scale("+ Math.min(h/960,w/1280) +")";
    
    if ((w/1280)>(h/960) ){
        document.getElementById("con").style.left=""+ (w -(Math.min(h/960,w/1280)*1280))/2 +"px";
    }
});

// resourse and help buttons 
resurse.addEventListener("click",()=>{
    resursepop.classList.remove("disnone");
})
help.addEventListener("click",()=>{
    helppop.classList.remove("disnone");
})
// close button 
for(let i= 0; i < closebutton.length; i++) {
    closebutton[i].addEventListener("click",()=>{
        resursepop.classList.add("disnone");
        helppop.classList.add("disnone");
    })
}

// reload button to start from the beginning
reload.addEventListener("click",reloadeQuastions);

// set a pointer and counter for the correct answers
let pointer = "";
let count = 0;


//the functaion for reload the quaztions to start and reset the poninter 
function reloadeQuastions(){
    letter_A.classList.remove("hidden");
    letter_A.classList.remove("clicked");
    letter_P.classList.remove("hidden");
    letter_P.classList.remove("clicked");
    shanwsor.classList.remove("hidden");
    for(let i= 0; i < anwsors.length; i++) {
    anwsors[i].innerHTML="&nbsp;";
    pointer="";
}
}


//add an event listener for the letters and save its value to the pointer 
letter_A.addEventListener("click",()=>{
    if(!letter_A.classList.contains("hidden") || !letter_P.classList.contains("hidden")){
        pointer = "a";
        console.log(pointer);
        letter_A.classList.add("clicked");
        letter_P.classList.remove("clicked");
    }
    
})

letter_P.addEventListener("click",()=>{
    if(!letter_A.classList.contains("hidden") || !letter_P.classList.contains("hidden")){
        pointer = "p";
        console.log(pointer);
        letter_P.classList.add("clicked");
        letter_A.classList.remove("clicked");
    }
    
})

//tempalte for check right for the answer
const checktemp = `<div class="checknaswer">
                         <img src="img/tikMark-small.png" alt="">
                    </div> `;
//tempalte for check wrong for the answer
const wrongtemp = `<div class="checknaswer">
                         <img src="img/wrong.png" alt="">
                    </div> `;


// for each space to answer put the valur of the poniter and 
// check if the value is correct or not and if there are anther value or not
// if the answer is corrcet and 1 for the counter and when all is correct disable 
// the letters and the sjow answer button   
anwsors.forEach((ele)=>{ele.addEventListener("click",()=>{
   if(pointer){
       if(ele.innerHTML !="a" && ele.innerHTML !="p"){
         if(pointer == ele.getAttributeNode("answer").value){
            ele.innerHTML = pointer + checktemp;
            pointer=""
            letter_P.classList.remove("clicked");
            letter_A.classList.remove("clicked");
            count++;
            if(count==3){
                letter_P.classList.remove("clicked");
                letter_A.classList.remove("clicked"); 
                letter_A.classList.add("hidden");
                letter_P.classList.add("hidden");
                shanwsor.classList.add("hidden");
            }
            console.log(count)
            console.log(anwsors.length);
         }else{
            ele.innerHTML = pointer + wrongtemp;
            console.log("NOOO")
            setTimeout(()=>{ele.innerHTML="&nbsp;"},1000);
         }
         ele.classList.add("noclick")

       }  
   }

})});


//show answer button 
shanwsor.addEventListener("click",()=>{
    if(!shanwsor.classList.contains("hidden")){
        anwsors.forEach((ele)=>{
           ele.innerHTML = ele.getAttributeNode("answer").value + checktemp; 
           letter_P.classList.remove("clicked");
            letter_A.classList.remove("clicked"); 
            letter_A.classList.add("hidden");
            letter_P.classList.add("hidden");
            shanwsor.classList.add("hidden");
        })
    }

})