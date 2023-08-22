const countries = async () => {
  try {
    /* restcountries.com */
    const response = await fetch("https://restcountries.com/v3.1/all");
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(`An error occurred:`, error);
    throw error;
  }
};

async function globalData() {
  try {
    const data = await countries();

    const countriesURL = "https://restcountries.com/v3.1/all";

    // Fetch the country names and populate the datalist
    fetch(countriesURL)
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common);
        const countryListElement = document.getElementById("countryList");

        countryNames.forEach((name) => {
          const option = document.createElement("option");
          option.value = name;
          countryListElement.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));

    // Create the input element with the datalist
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.classList.add("inputElement");
    inputElement.placeholder = "Enter your country...";
    inputElement.setAttribute("list", "countryList");

    const countryListElement = document.createElement("datalist");
    countryListElement.id = "countryList";

    // Create and append the input element and datalist
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("container-fluid", "main");
    document.body.appendChild(mainContainer);

    const titleBox = document.createElement("div");
    titleBox.classList.add("titleBox", "main");
    mainContainer.appendChild(titleBox);

    const titleText = document.createElement("h1");
    titleText.classList.add("titleText", "main");
    titleText.innerHTML = `COUNTRY GUIDE`;
    titleBox.appendChild(titleText);

    const wrapperContainer = document.createElement("div");
    wrapperContainer.classList.add("wrapperContainer", "main");
    mainContainer.appendChild(wrapperContainer);

    const inputRow = document.createElement("div");
    inputRow.classList.add("inputRow", "countryInput");
    wrapperContainer.appendChild(inputRow);

    inputRow.appendChild(inputElement);
    inputRow.appendChild(countryListElement);

    const buttonElement = document.createElement("button");
    buttonElement.classList.add("mapButton");
    buttonElement.innerHTML = "Search";
    inputRow.appendChild(buttonElement);

    /* <<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>> */

    const countryNameMain = document.createElement("div");
    countryNameMain.classList.add("countryNameMain", "row");
    wrapperContainer.appendChild(countryNameMain);

    const countryNameInfo = document.createElement("div");
    countryNameInfo.classList.add("countryNameInfo", "row");
    wrapperContainer.appendChild(countryNameInfo);

    const flagRow = document.createElement("div");
    flagRow.classList.add("flagRow", "row");
    wrapperContainer.appendChild(flagRow);



    const row2 = document.createElement("div");

    wrapperContainer.appendChild(row2);

    const row1 = document.createElement("div");

    wrapperContainer.appendChild(row1);

    const buttonContainer = document.createElement("div");

    wrapperContainer.appendChild(buttonContainer);

    const countryInfoContainer0 = document.createElement("div");
    countryInfoContainer0.classList.add("countryInfo0");
    row1.appendChild(countryInfoContainer0);

    /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */
    /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */
    const countryInfoContainer = document.createElement("div");
    countryInfoContainer.classList.add("countryInfo");
    row1.appendChild(countryInfoContainer);
    /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */
    /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */

    const errorDiv = document.createElement("div");

    inputRow.appendChild(errorDiv);

    // Add keyup event listener to the input element
    inputElement.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        buttonElement.click(); // Trigger the button's click event
      }
    });

    buttonElement.addEventListener("click", async () => {
      let countryName = inputElement.value;

      if (!countryName) {
        // Display error message for empty input
        errorDiv.innerHTML = "Empty Input! Please enter Country Name!";
        errorDiv.classList.add("error-message");
        return;
      }

      let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;


      try {
        // Clear previous error message
        errorDiv.innerHTML = "";
        buttonContainer.innerHTML = "";

        buttonContainer.classList.add("buttonContainer", "main");
        row1.classList.add("row1", "row");
        row2.classList.add("row2", "row");

        const country = await fetch(finalURL);


        const countryData = await country.json();



        const button = document.createElement("button");
        button.classList.add("mapButton");


        // Add a click event listener to the button
        button.addEventListener("click", function () {
          // Replace this URL with the desired link
          const linkUrl = countryData[0].maps.googleMaps;

          // Open the link in a new tab/window
          window.open(linkUrl, "_blank");
        });
        // Append the button to the container
        buttonContainer.appendChild(button);

        /* <<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<>>>>>>>>> */
        /* <<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<>>>>>>>>> */

        async function checkLinkStatus(finalURL) {
          try {
            const response = await fetch(finalURL);

            if (response.status === 200) {
              button.innerHTML = `VIEW ON GOOGLE MAP  `;
              // console.log("Status: OK");
            } else if (response.status === 404) {
              // console.log("Status: Not Found");

              button.innerHTML = `  <span id="mapError" >ERROR!</span> `;
            } else {
              console.log("Status:", response.statusText);
            }
          } catch (error) {
            console.error("An error occurred:", error);
          }
        }


        checkLinkStatus(finalURL);


        /* <<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<>>>>>>>>> */

        // Clear previous country information
        countryInfoContainer.innerHTML = "";
        countryInfoContainer0.innerHTML = "";
        row2.innerHTML = "";
        countryNameMain.innerHTML = "";
        flagRow.innerHTML = "";
        // Clear input box after fetching and displaying country information
        inputElement.value = "";
        countryNameInfo.innerHTML = "";

        // Create and append elements for country information
        const nameTilte = document.createElement("h2");
        nameTilte.setAttribute('class', 'country-name');
        nameTilte.classList.add("nameTitle");
        nameTilte.innerHTML = `${countryData[0].name.common.toUpperCase()}`;
        countryNameMain.appendChild(nameTilte);

        const commonNameElement = document.createElement("h4");
        commonNameElement.innerHTML = `<strong> <span>Common Name:</span> </strong> ${countryData[0].name.common}.`;
        // countryInfoContainer.appendChild(commonNameElement);
        countryNameInfo.appendChild(commonNameElement);

        const officialNameElement = document.createElement("h4");
        officialNameElement.innerHTML = `<strong>
          <span>Official Name:</span>
        </strong>  ${countryData[0].name.official}.`;

        // countryInfoContainer.appendChild(officialNameElement);
        countryNameInfo.appendChild(officialNameElement);

        const countryInfoContainer1 = document.createElement("div");
        countryInfoContainer1.classList.add("countryInfo1");
        countryInfoContainer0.appendChild(countryInfoContainer1);

        const geographicTitle = document.createElement("h3");
        geographicTitle.classList.add("titles");
        geographicTitle.innerHTML = `<strong>
          Geographical Information:
        </strong> `;
        countryInfoContainer1.appendChild(geographicTitle);

        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */

        const Continent = document.createElement("p");
        Continent.innerHTML = `<strong>
          <span>Continent:</span>
        </strong>  ${countryData[0].continents}.`;
        countryInfoContainer1.appendChild(Continent);

        const Region = document.createElement("p");
        Region.innerHTML = `<strong>
          <span>Region:</span>
        </strong>  ${countryData[0].region}.`;
        countryInfoContainer1.appendChild(Region);

        const subRegion = document.createElement("p");
        subRegion.innerHTML = `<strong>
          <span>Sub Region:</span>
        </strong>  ${countryData[0].subregion}.`;
        countryInfoContainer1.appendChild(subRegion);

        const latitude = document.createElement("p");
        latitude.innerHTML = `<strong>
          <span>Latitude:</span>
        </strong>   ${countryData[0].latlng[0]}.`;
        countryInfoContainer1.appendChild(latitude);

        const longitude = document.createElement("p");
        longitude.innerHTML = `<strong>
          <span>Longitude:</span>
        </strong>  ${countryData[0].latlng[1]}.`;
        countryInfoContainer1.appendChild(longitude);

        const capital = document.createElement("p");
        capital.innerHTML = `<strong>
          <span>Capital City:</span>
        </strong>  ${countryData[0].capital.toString().split(",").join(", ")}.`;
        countryInfoContainer1.appendChild(capital);

        const landLocked = document.createElement("p");
        landLocked.innerHTML = `<strong>
          <span>LandLocked Country:</span>
        </strong>  ${countryData[0].landlocked}.`;
        countryInfoContainer1.appendChild(landLocked);

        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */
        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */

        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */
        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */

        const borders = document.createElement("p");

        countryInfoContainer1.appendChild(borders);

        const myArray = countryData[0].borders;
        // console.log(myArray);

        if (myArray === undefined) {
          // console.log("No list");
          borders.innerHTML = `<strong>
          <span>Borders:</span>
        </strong>   <strong>It's an Island.</strong> `;
        } else {
          // Check if the array is empty
          if (myArray.length === 0) {
            console.log("No values in the array");
          } else {
            // console.log("Array values:", myArray);

            borders.innerHTML = `<strong>
          <span>Borders:</span>
        </strong>  ${myArray.toString().split(",").join(", ")}.`;
          }
        }

        const timezone = document.createElement("p");
        timezone.innerHTML = `<strong>
          <span>TimeZones:</span>
        </strong>  ${countryData[0].timezones
            .toString()
            .split(",")
            .join(", ")}.`;
        countryInfoContainer1.appendChild(timezone);

        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */
        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */

        const InfoContainer1 = document.createElement("div");
        InfoContainer1.classList.add("InfoContainer1");
        countryInfoContainer.appendChild(InfoContainer1);

        const InfoContainer2 = document.createElement("div");
        InfoContainer2.classList.add("InfoContainer1");
        countryInfoContainer.appendChild(InfoContainer2);

        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */
        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */
        const demoCultTitle = document.createElement("h3");
        demoCultTitle.classList.add("titles");
        demoCultTitle.innerHTML = `<strong>
          Demographic and Cultural Information:
        </strong> `;
        InfoContainer1.appendChild(demoCultTitle);

        const population = document.createElement("p");
        population.innerHTML = `<strong>
          <span>Population:</span>
        </strong>  ${countryData[0].population}.`;
        InfoContainer1.appendChild(population);

        const independent = document.createElement("p");
        independent.innerHTML = `<strong>
          <span>Independent:</span>
        </strong>  ${countryData[0].independent}.`;
        InfoContainer1.appendChild(independent);

        const languageTitle = document.createElement("ul");
        languageTitle.classList.add("languageTitle");
        languageTitle.innerHTML = ` <span>Languages:</span> `;
        InfoContainer1.appendChild(languageTitle);

        const languages = Object.values(countryData[0].languages);
        const languagesUl = document.createElement("ul");
        languagesUl.classList.add("languagesUl");
        InfoContainer1.appendChild(languagesUl);

        for (const language of languages) {
          const languagesli = document.createElement("li");
          languagesli.textContent = language;
          languagesUl.appendChild(languagesli);
        }


        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */
        /* <<<<<<<<<<>>>>>>>>>>>>>>>>>InfoContainer2<<<<<<<<<<<<<>>>>>>>>>>> */
        const economicInfo = document.createElement("h3");
        economicInfo.classList.add("titles");
        economicInfo.innerHTML = `<strong>
          Economic Information:
        </strong> `;
        InfoContainer2.appendChild(economicInfo);

        const currency = document.createElement("p");
        currency.innerHTML = `<strong>
          <span>Currency: </span>
        </strong> ${Object.keys(countryData[0].currencies)}.`;
        InfoContainer2.appendChild(currency);

        const currencyName = document.createElement("p");
        currencyName.innerHTML = `<strong>
          <span>Currency Name</span>
        </strong> : ${countryData[0].currencies[Object.keys(countryData[0].currencies)].name
          }.`;
        InfoContainer2.appendChild(currencyName);

        const currencySymbol = document.createElement("p");
        currencySymbol.innerHTML = `<strong>
          <span>Currency Symbol:</span>
        </strong>  ${countryData[0].currencies[Object.keys(countryData[0].currencies)]
            .symbol
          }.`;
        InfoContainer2.appendChild(currencySymbol);

        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */
        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */

        const countryCodeTitle = document.createElement("h3");
        countryCodeTitle.classList.add("titles");
        countryCodeTitle.innerHTML = `<strong>
          Country Codes:
        </strong>`;
        row2.appendChild(countryCodeTitle);

        const CountryCodeAlpha2 = document.createElement("p");
        CountryCodeAlpha2.innerHTML = `  <strong><span>Country Code Alpha-2: </span> </strong>  ${countryData[0].cca2}.`;
        row2.appendChild(CountryCodeAlpha2);

        const CountryCodeNumeric = document.createElement("p");
        CountryCodeNumeric.innerHTML = `<strong>
          <span>Country Code Numeric-3:</span>
        </strong>  ${countryData[0].ccn3}.`;
        row2.appendChild(CountryCodeNumeric);

        const CountryCodeAlpha3 = document.createElement("p");
        CountryCodeAlpha3.innerHTML = `<strong>
          <span>Country Code Alpha-3:</span>
        </strong>  ${countryData[0].cca3}.`;
        row2.appendChild(CountryCodeAlpha3);

        const comInfo = document.createElement("h3");
        comInfo.classList.add("titles", "margin");
        comInfo.innerHTML = `<strong>
          Communication Information:
        </strong> `;
        row2.appendChild(comInfo);

        const interDirectDail = document.createElement("p");
        interDirectDail.innerHTML = `<strong>
          <span>International Direct Dialing:</span>
        </strong>  ${countryData[0].idd.root}${countryData[0].idd.suffixes}`;
        row2.appendChild(interDirectDail);

        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */
        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */


        const flagContainer = document.createElement("div");
        flagContainer.classList.add("flagContainer", "row");
        flagRow.appendChild(flagContainer);

        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */

        const flag = document.createElement("img");
        flag.src = `${countryData[0].flags.svg}`;
        flag.alt = `${countryData[0].flags.alt}`;
        flag.classList.add("flag");
        flagContainer.appendChild(flag);

        const flaglebal = document.createElement("h2");
        flaglebal.innerHTML = `Flag`;
        flagContainer.appendChild(flaglebal);

        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */
        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */

        const coatOfArmContainer = document.createElement("div");
        coatOfArmContainer.classList.add("coatOfArmContainer", "row");
        flagRow.appendChild(coatOfArmContainer);

        const coatOfArms = document.createElement("img");
        coatOfArms.src = `${countryData[0].coatOfArms.svg}`;
        coatOfArms.alt = `${countryData[0].coatOfArms.alt}`;
        coatOfArms.classList.add("coatOfArms");
        coatOfArmContainer.appendChild(coatOfArms);

        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */
        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */

        const coatOfArmLabel = document.createElement("h2");
        coatOfArmLabel.innerHTML = `Coat of Arm`;
        coatOfArmContainer.appendChild(coatOfArmLabel);

        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */
        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */
        /* <<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<>>>>>>>>>>> */

        // ... Continue creating and appending elements for other information
      } catch (error) {
        console.error(`An error occurred:`, error);
        errorDiv.innerHTML = ` <span id="errorCatch">Try another country!!</span> `;
        // button.innerHTML = ` <span id="mapError"> ERROR! </span> `;
      }
    });

    // ... (Create additional rows and elements)
  } catch (error) {
    console.error(`An error occurred:`, error);
  }
}

(async () => {
  globalData();
})();
