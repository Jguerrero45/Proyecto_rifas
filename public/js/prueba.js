//import { gsap } from "gsap/index.js";

const progressBarContainer = document.querySelector('.progress-bar__container');
const progressBar = document.querySelector('.progress-bar');
const progressBarText = document.querySelector('.progress-bar__text');


const totalTickets = 10000; // Total number of tickets
let ticketsVendidos = 0; // Number of tickets sold





let time = 0;
let endState = 100; // Tickets Totales %

function bar() {
  const x = (ticketsVendidos / totalTickets) * 100; // Tickets Vendidos %
  const progressBarStates = Array.from({ length: x + 1 }, (_, i) => i);
  progressBarStates.forEach(state => {
    let randomTime = Math.floor(Math.random() * 50);
    setTimeout(() => {
      if (state == endState) {
        gsap.to(progressBar, {
          x: `${state}%`,
          duration: 2,
          backgroundColor: '#4895ef',
          onComplete: () => {
            progressBarText.style.display = "initial";
            progressBarContainer.style.boxShadow = '0 0 5px #4895ef';
          }
        });
      } else {
        gsap.to(progressBar, {
          x: `${state}%`,
          duration: 2,
        });
      }
    }, randomTime + time);
    time += randomTime;
  })
}
function fetchBoletosNoDisponible() {
  console.log('Fetching boletos...');
  fetch('/boletos')
      .then(response => response.json())
      .then(data => {
        console.log('data:', data.length);
          ticketsVendidos = parseInt(data.length);
          console.log('Tickets Vendidos:', ticketsVendidos);
          bar();
          
      })
      .catch(error => console.error('Error fetching boletos:', error));
}

document.addEventListener('DOMContentLoaded', (event) => {
  fetchBoletosNoDisponible();
  console.log('DOMContentLoaded');
  
});