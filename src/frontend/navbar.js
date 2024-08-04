import { Events } from "./events.js";

export class Navbar {
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        // Create a <nav> element to hold the navigation bar
        const elem = document.createElement("nav");
        elem.id = "navbar";
        elem.innerHTML = `
            <button id="home">Home</button>
            <button id="request">Request a Ride</button>
            <button id="profile">My Profile</button>
        `;

        // Get all the buttons within the <nav> element
        // const links = elem.querySelectorAll("a");
        const buttons = elem.querySelectorAll("button");

        // Add event listeners to each button
        buttons.forEach(button => {
            button.addEventListener("click", async e => {
                // Prevent the default button behavior 
                e.preventDefault();

                // Get the view name from the id attribute
                const view = e.target.id

                // Update the window/s hash to reflect the current view
                // window.location.hash = view;

                // Call the navigateTo function with the view name 
                await this.#events.publish("navigateTo", view);
            });
        });

        // Return the populated navigation bar element
        return elem;
    }
}