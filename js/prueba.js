
import { gsap } from "../node_modules/gsap/index.js";

const progressBarContainer = document.querySelector('.progress-bar__container');
const progressBar = document.querySelector('.progress-bar');
const progressBarText = document.querySelector('.progress-bar__text');


const x = 25; // Tickets Vendidos %
const progressBarStates = Array.from({ length: x + 1 }, (_, i) => i);


let time = 0;
let endState = 100; // Tickets Totales %

progressBarStates.forEach(state => {
  let randomTime = Math.floor(Math.random() * 50);
  setTimeout(() => {
    if(state == endState){
      gsap.to(progressBar, {
        x: `${state}%`,
        duration: 2,
        backgroundColor: '#4895ef',
        onComplete: () => {
          progressBarText.style.display = "initial";
          progressBarContainer.style.boxShadow = '0 0 5px #4895ef';
        }
      });
    }else{
      gsap.to(progressBar, {
        x: `${state}%`,
        duration: 2,
      });
    }
  }, randomTime + time);
  time += randomTime;
})
/* Este seria el codigo para la animacion de la barra de progreso, pero no me deja ejecutarlo.

const progressBarContainer = document.querySelector('.progress-bar__container');
        const progressBar = document.querySelector('.progress-bar');
        const progressBarText = document.querySelector('.progress-bar__text');

        let endState = 100;

        function updateProgressBar(percentage) {
            if (percentage > endState) percentage = endState;
            gsap.to(progressBar, {
                width: `${percentage}%`,
                duration: 2,
                backgroundColor: percentage === endState ? '#4895ef' : '',
                onComplete: () => {
                    if (percentage === endState) {
                        progressBarText.style.display = "initial";
                        progressBarContainer.style.boxShadow = '0 0 5px #4895ef';
                    }
                }
            });
        }

        // Example usage:
        let ticketsSoldPercentage = 50; // Change this variable to update the progress bar
        updateProgressBar(ticketsSoldPercentage); 
        
        */