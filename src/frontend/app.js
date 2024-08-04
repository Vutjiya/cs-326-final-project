import { Events } from "./events.js";
import { Navbar } from "./navbar.js";
import { HomeView } from "./home-view.js";
import { RequestView } from "./request-view.js";
import { ProfileView } from "./profile-view.js";

export class App {
    #mainViewElem = null;
    #homeViewElem = null; 
    #requestViewElem = null;
    #profileViewElem = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render(root) {
        const rootElem = document.getElementById(root);
        rootElem.innerHTML = "";

        const titleBlock = document.createElement("div");
        titleBlock.classList.add("colored-block");
        const title = document.createElement("h1");
        title.innerText = "UMass Student Rideshares";
        titleBlock.appendChild(title);

        const navbarElem = document.createElement("div");
        navbarElem.id = "navbar";

        const navbar = new Navbar();
        navbarElem.appendChild(await navbar.render());

        this.#mainViewElem = document.createElement("div");
        this.#mainViewElem.id = "main";

        rootElem.appendChild(titleBlock);
        rootElem.appendChild(navbarElem);
        rootElem.appendChild(this.#mainViewElem);

        const homeView = new HomeView();
        this.#homeViewElem = await homeView.render();

        const requestView = new RequestView();
        this.#requestViewElem = await requestView.render();

        const profileView = new ProfileView();
        this.#profileViewElem = await profileView.render();

        this.#navigateTo("home");
        this.#events.subscribe("navigateTo", view => this.#navigateTo(view));
    }

    #navigateTo(view) {
        this.#mainViewElem.innerHTML = "";
        const viewElements = {
            home: this.#homeViewElem,
            request: this.#requestViewElem,
            profile: this.#profileViewElem
        };
        
        const selectedView = viewElements[view] || this.#homeViewElem;
        this.#mainViewElem.appendChild(selectedView);
        // window.location.hash = viewElements[view] ? view : "home";
    }
}