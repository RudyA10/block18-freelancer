/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;
const mainHeader = document.createElement("h2");
mainHeader.innerText = "home";

// This returns freelancer object that contains the freelancers name, occupation, and rate
function freeLancerObject() {
  let name = NAMES[Math.floor(Math.random() * NAMES.length)];
  let occupation = OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  let rate = Math.floor(
    Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min) + PRICE_RANGE.min
  );

  return { name, occupation, rate };
}
// STATE VARIABLES
// State variable that creates an array based on the return of freeLancerObject
let freeLancerState = Array.from({ length: NUM_FREELANCERS }, freeLancerObject);
// State variable to store avg rate of all freelancers
let avgRate = avgFreelancerRate();

// This is a regular function that returns the average rate of all freelancers in state
function avgFreelancerRate() {
  let sumOfRates = 0;
  for (const freelancer of freeLancerState) {
    sumOfRates += freelancer.rate;
  }
  return sumOfRates / freeLancerState.length;
}

// COMPONENTS
//This componenet represents one freelancer
function singleFreelancer(freelancer) {
  let oneRow = document.createElement("tr");

  let freelancerName = document.createElement("td");
  freelancerName.innerText = `${freelancer.name}`;

  let freelancerJob = document.createElement("td");
  freelancerJob.innerText = `${freelancer.occupation}`;

  let freelancerRate = document.createElement("td");
  freelancerRate.innerText = `$${freelancer.rate}`;

  oneRow.append(freelancerName, freelancerJob, freelancerRate);
  return oneRow;
}

// This component builds the table
function tableHead() {
  const thead = document.createElement("thead");
  const row = document.createElement("tr");
  ["Name", "Occupation", "Rate"].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    th.classList.add("table-header");
    row.append(th);
  });
  thead.append(row);
  return thead;
}
// This component is the page title
function pageHeading() {
  const title = document.createElement("h2");
  title.className = "page-title";
  title.innerText = "Freelancer Forum";
  return title;
}

// This component represents an array of freelancers
function arrayofLancers() {
  const tbody = document.createElement("tbody");
  const freelancers = freeLancerState.map(singleFreelancer);
  tbody.replaceChildren(...freelancers);
  return tbody;
}

// This component represents the average rate of all freelancers
function averageRateComp() {
  let compRate = document.createElement("h3");
  compRate.innerText = `Average rate of all freelancers : $${avgFreelancerRate().toFixed(
    2
  )}`;
  return compRate;
}

function Render() {
  const root = document.querySelector("#app");
  root.classList.add("app");

  const table = document.createElement("table");
  table.append(tableHead(), arrayofLancers());
  table.classList.add("freelancers");

  root.append(pageHeading(), averageRateComp(), table);
}

Render();
