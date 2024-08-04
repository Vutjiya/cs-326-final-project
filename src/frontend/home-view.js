import { Events } from "./events.js";

export class HomeView {
    constructor() {}

    async render() {
        // Create the root element
        const homeViewElem = document.createElement("div");
        homeViewElem.id = "home-view";
        homeViewElem.classList.add("view");

        const blockHeader = document.createElement("div");
        blockHeader.classList.add("colored-block");

        const headerText = document.createElement("h1");
        headerText.innerText = "Welcome!";

        blockHeader.appendChild(headerText);

        homeViewElem.appendChild(blockHeader);


        const homeImg = document.createElement("img");
        homeImg.src = "./images/phone-nav.png";
        homeViewElem.appendChild(homeImg);

        const introText = document.createElement("p");
        introText.innerText = `Welcome to the UMass Ridesharing App! Press "Request a Ride" to request a ride from a driver, or edit your profile and enlist to be a driver by clicking "My profile".`;
        homeViewElem.appendChild(introText);
        
        const requestHeader = document.createElement("h2");
        requestHeader.innerText = "Requesting a Ride";
        homeViewElem.appendChild(requestHeader);

        const requestText = document.createElement("p");
        requestText.innerText = `To request a ride, simply click the "Request a Ride" button on the navigate bar. You will then be prompted to select a destination and time of departure. When you finish filling out your request, press the "Submit Request" button, and you're done!`;
        homeViewElem.appendChild(requestText);

        const profileHeader = document.createElement("h2");
        profileHeader.innerText = "Your Profile";
        homeViewElem.appendChild(profileHeader);

        const profileText = document.createElement("p");
        profileText.innerText = `Your profile includes your general information that will be displayed to people requesting a ride if you are enlist to be a driver. Your information will also be displayed to drivers when they choose to accept your request. `;
        homeViewElem.appendChild(profileText);

        return homeViewElem;
    }
}