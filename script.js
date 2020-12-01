window.addEventListener("load", ()=> {
    let longt;
    let lati;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimeZone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          
             longt = position.coords.longitude;
             lati = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/" ;
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/37.8267,-122.4233` ; 

            fetch(api)
                .then(response => {
                    return response.json();
                   })
                   .then(data => {
                       console.log(data);
                       const {temperature, summary, icon} = data.currently;

                    //set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    document.querySelector('.temperature-description').textContent = summary;
                    locationTimeZone.textContent = data.timezone;

                    //Formaula for Celsius
                    let celsius = (temperature-32) * (5 / 9); 

                    //set Icon
                    setIcons(icon, document.querySelector(".icon"));

                    //change temperature to Celsius/Fareneit
                    temperatureSection.addEventListener("click", () => {
                        console.log("Start of addEventListener");
                        if (temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }
                        else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                        console.log("End of addEventListener");
                    });

                    console.log("Out of addEventListener");



                   }); 



        });
    }

    function setIcons(icon, iconID) {
        //const skycons = new skycons ({color: "white" });
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }


});