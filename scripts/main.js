import { getAttractions, useAttractions } from "./attractions/AttractionProvider.js";
import { attractionList, bizarreList } from "./attractions/AttractionList.js";

import { getEateries, useEateries } from "./eateries/EateryProvider.js";
import { eateryList } from "./eateries/EateryList.js";
import { displayEatery, showEateryDetails } from "./eateries/EateryPreview.js";

import { getParks, useParks } from "./parks/ParkProvider.js";
import { parkList } from "./parks/ParkList.js";
import { displayPark, showParkDetails } from "./parks/ParkPreview.js"

import { itineraryList } from "./itinerary/ItineraryList.js";
import { createItinerary } from "./data/DataManager.js";

import { displaySave } from "./nav/Footer.js";

// Set Application For Event Bubbling
const applicationElement = document.querySelector("body");

// Event Listener To Test Capture of All Previewed Locations
const saveItinerary = () => {
    applicationElement.addEventListener("click", event => {
        if (event.target.id === "saveItinerary") {
            // A list of input variables to be created and assigned.
            const attractionPreviewName = document.getElementById("attractionName").innerHTML;
            const attractionPreviewLocation = document.getElementById("attractionLocation").innerHTML;
            const eateryPreviewName = document.getElementById("eateryName").innerHTML;
            const eateryPreviewLocation = document.getElementById("eateryLocation").innerHTML;
            const parkPreviewName = document.getElementById("parkName").innerHTML;
            const parkPreviewLocation = document.getElementById("parkLocation").innerHTML;
            // Make an object with variables.
            const itineraryObject = {
                attractionPreviewName: attractionPreviewName,
                attractionPreviewLocation: attractionPreviewLocation,
                eateryPreviewName: eateryPreviewName,
                eateryPreviewLocation: eateryPreviewLocation,
                parkPreviewName: parkPreviewName,
                parkPreviewLocation: parkPreviewLocation
            };
            createItinerary(itineraryObject);
        }

    })
}

//? Park Selector
const parkElement = document.querySelector("#parkSelect");
parkElement.addEventListener("change", (event) => {
    let parkSelection = useParks();
    for (let aPark of parkSelection) {
        if (aPark.fullName === event.target.value) {
            displayPark(aPark)
            saveCheck();
        }
    }
})

//? Attraction Selector
const attractionElement = document.querySelector("#attractionSelect");
attractionElement.addEventListener("change", (event) => {
    let attractionSelection = useAttractions();
    for (let anAttraction of attractionSelection) {
        if (anAttraction.name === event.target.value) {
            bizarreList(anAttraction);
            saveCheck();
        }
    }
})

//? Eatery Selector
// Sets an element equal to the eaterySelect ID on the DOM.
const eateryElement = document.querySelector("#eaterySelect");
// An event listen that listens for a dropdown selection, then...
eateryElement.addEventListener("change", (event) => {
    // Assigns the array from the use function to a variable.
    let eaterySelection = useEateries();
    // Loops through the array variable in order to...
    for (let anEatery of eaterySelection) {
        // Find an object in the array with the businessName property equal to what the dropdown menu contains, then...
        if (anEatery.businessName === event.target.value) {
            // Feeds entire object through the display eatery function.
            displayEatery(anEatery);
            saveCheck();
        }
    }
})


// when 'details' button is clicked, execute showDetails function
const parkDetailElement = document.querySelector(".parkCard");
parkDetailElement.addEventListener("click", (event) => {
    if (event.target.id === "parkDetails") {
        let parkListArray = useParks();
        for (let aPark of parkListArray) {
            if (aPark.parkCode === event.target.value) {
                showParkDetails(aPark)
            }
        }
    }
})


// Display Save Button When Three Selections Are Made
const saveCheck = () => {
    const parkContainer = document.querySelector(".parkCard");
    const attractionContainer = document.querySelector(".attractionCard");
    const eateryContainer = document.querySelector(".eateryCard");
    if (!(parkContainer.innerHTML === "" || attractionContainer.innerHTML === "" || eateryContainer.innerHTML === "")) {
        displaySave();
    }
}

// Display details when eatery button is clicked
const eateryDetailElement = document.querySelector (".eateryCard");
eateryDetailElement.addEventListener("click", (event) => {
    if (event.target.id === "eateryDetails") {
        let eateryListArray = useEateries();
        for (let anEatery of eateryListArray) {
         
            if (anEatery.id === parseInt(event.target.value)) {

                showEateryDetails(anEatery)
            }
        }
    }
})

//? Page Population
const startItinerary = () => {

    getAttractions()
        .then(attractionArray => {
            attractionList(attractionArray);
        })

    getEateries()
        .then(eateryArray => {
            eateryList(eateryArray);
        })

    getParks()
        .then(parksArray => {
            parkList(parksArray.data);
        })

    itineraryList();

    saveItinerary();
}

startItinerary();