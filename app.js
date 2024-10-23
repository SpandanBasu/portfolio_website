


// -----------------------Intro Section-----------------------------------


//Developer text animation

const dynamicText = document.querySelector("#intro .sec-text");
const words = ["Developer", "Designer", "Coder"];
// Variables to track the position and deletion status of the word
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChar;
    dynamicText.classList.add("stop-blinking");
    if (!isDeleting && charIndex < currentWord.length) {
        // If condition is true, type the next character
        charIndex++;
        setTimeout(typeEffect, 200);
    } else if (isDeleting && charIndex > 0) {
        // If condition is true, remove the previous character
        charIndex--;
        setTimeout(typeEffect, 100);
    } else {
        // If word is deleted then switch to the next word
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
    }
}
typeEffect();


//--------------------Download CV-----------

document.getElementById('downloadCVBtn').addEventListener('click', function() {
    console.log("CV Button Clicked");
    document.getElementById('cvdownloadLink').click();

    // Show toast
    var toast_cv = document.getElementById("toast_download_cv");
    showToast(toast_cv);
    
});





// ----------------------About Section------------------------------------------


//About navbar fade when scroll

//for skill
const header = document.querySelector('#about header');
const container = document.querySelector('#skill .container');
const item = document.querySelector('#skill #first_skill');

container.addEventListener('scroll', () => {
    // Get item position relative to the container
    const rect = header.getBoundingClientRect();
    const containerRect = item.getBoundingClientRect();

    // console.log("Header Bottom location: "+rect.bottom);
    // console.log("Skill List Top location: "+containerRect.top);

    // Check if the item is out of view
    if (rect.bottom > containerRect.top ) {
        header.classList.add('faded'); // Add the faded class
    } else {
        header.classList.remove('faded'); // Remove the faded class
    }
});

//for education

const container_edu = document.querySelector('#education .main');
const item_edu = document.querySelector('#education #first_education');

container_edu.addEventListener('scroll', () => {
    // Get item position relative to the container
    const rect1 = header.getBoundingClientRect();
    const containerRect1 = item_edu.getBoundingClientRect();

    // console.log("Header Bottom location: "+rect1.bottom);
    // console.log("Skill List Top location: "+containerRect1.top);

    // Check if the item is out of view
    if (rect1.bottom > containerRect1.top) {
        header.classList.add('faded'); // Add the faded class
    } else {
        header.classList.remove('faded'); // Remove the faded class
    }
});





// Change About tabs

let experience = document.getElementById('experience');
let skill = document.getElementById('skill');
let education = document.getElementById('education');

let aHref = document.querySelectorAll('.tab-section nav a');

let active = 'intro';
let zIndex = 2;
var tabLinks = document.querySelectorAll('.tab-section nav a');

aHref.forEach(a => {
    a.addEventListener('click', function(event){

        let tab = a.dataset.tab;
        if(tab !== null && tab !== active){

            let activeOld = document.querySelector('.tab.active');
            if(activeOld) activeOld.classList.remove('active');
            active = tab;

            let tabActive = document.getElementById(active);
            zIndex++;
            tabActive.style.zIndex = zIndex;
            tabActive.style.setProperty('--x', event.clientX + 'px');
            tabActive.style.setProperty('--y', event.clientY + 'px');
            tabActive.classList.add('active');


            for(tablink of tabLinks){
              tablink.classList.remove("active-tab");
            }
            event.currentTarget.classList.add("active-tab")
        }
    })
})



// ----------------------Project Section------------------------------------------


//Smooth scroll to next unit

const scrollContainer = document.querySelector('.tab-project');

scrollContainer.addEventListener('wheel', (e) => {
    const deltaY = e.deltaY;
    const contentHeight = scrollContainer.scrollHeight;
    const containerHeight = scrollContainer.clientHeight;
    const scrollTop = scrollContainer.scrollTop;

    if ((scrollTop === 0 && deltaY < 0) || (scrollTop + containerHeight >= contentHeight && deltaY > 0)) {
        // Prevent the scroll from being trapped inside the section
        e.preventDefault();
        window.scrollBy(0, deltaY);
    }
});


//blur effect on hover

// const proj_items = document.querySelectorAll(' #project .container .item');
// const container_proj = document.querySelector('#project .container');

// proj_items.forEach(proj_item =>{

//     proj_item.addEventListener('mouseover', function() {
//         container_proj.style.filter = 'blur(10px)';
//         proj_item.style.filter = 'blur(0px)';
//         proj_item.style.zIndex = '100';
//     });
    
//     proj_item.addEventListener('mouseout', function() {
//         container_proj.style.filter = 'blur(0px)';
//     });

// });


// Select all items with the class 'item'
const items = document.querySelectorAll('#project .container .item');

// Loop through each item and add event listeners for hover effects
items.forEach(item => {
  // When the item is hovered
  item.addEventListener('mouseover', () => {
    items.forEach(i => {
      if (i !== item) {
        // Shrink other items
        i.style.transform = 'scale(0.8)';
        i.style.filter = 'blur(2px)';
      }
    });
    // Enlarge the hovered item
    if (window.innerWidth > 550) {
        item.style.transform = 'scale(1.1)';
    }
    item.style.filter = 'blur(0px)';
    item.style.zIndex=10;
  });

  // When the mouse leaves the item
  item.addEventListener('mouseout', () => {
    // Reset all items to their original size
    items.forEach(i => {
      i.style.transform = 'scale(1)'; // Back to equal size
      i.style.filter = 'blur(0)';
      i.style.zIndex=0;
    });
  });
});






// -------------------Contact Form ----------------------


// Store msg to Google Sheets

const scriptURL = 'https://script.google.com/macros/s/AKfycbxHgbjF4Z_gldj1XnYr4gpTc0W1AR_ki0vSnz25H_ZKCHJhW64OZzQXr-pEBMDm1WvaUA/exec'
const form = document.forms['submit-to-google-sheet']



//Clear Form and Notify User
var toast_success = document.getElementById("toast_contact_success");
var toast_failure = document.getElementById("toast_contact_failure");
var toast_wait = document.getElementById("toast_wait");

form.addEventListener('submit', e=>{
    // //show toast failure
    showToast(toast_wait);
    e.preventDefault();
    fetch(scriptURL, {method: 'POST', body: new FormData(form)})
    .then(response =>{
        // //show toast success
        showToast(toast_success);
    })
    .catch(error => {
        console.error('ERROR!', error.message);
        // //show toast failure
        showToast(toast_failure);
    });
});









//---------------------------------------------------------------------------------------- Global--------------------------------------------------------------------------------------------

// ----------------------Collapsible Navbar--------------------

var sideMenu = document.getElementById("sideMenu");

function openMenu(){
    sideMenu.style.right = "-50px";
}

function closeMenu(){
    sideMenu.style.right = "-500px";
}

let headerNavLinks = document.querySelectorAll('#header a');

headerNavLinks.forEach(a => {
    a.addEventListener('click', function(event){
        closeMenu();
    })
})


// ----------Toast Function-----------------


function showToast(toast){
    //show toast
    toast.className = "toast show";
    
    // Hide toast after 3 seconds
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 3000);
    form.reset();
}


// ----------------------------Go to Top Scroll Btn-----------------------------

const scrollBtn = document.querySelector('.scroll-btn') ;


window.addEventListener('scroll', () => {
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollBtn.style.display = 'block' ;
    }
    else {
        scrollBtn.style.display = 'none' ;
    }
})
scrollBtn.addEventListener('click' , () => {
    window.scroll({
        top: 0 ,
        behavior: "smooth"
    })
})