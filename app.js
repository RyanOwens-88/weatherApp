window.addEventListener('load', ()=> {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.temp-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temp');
    const tempSpan = document.querySelector('.temp span');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/9261b505adebafb9131ecadb80b66a58/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    //Set DOM Elements form the API
                    tempDegree.textContent = temperature;
                    tempDescription.textContent = summary;
                    locationTimeZone.textContent = data.timezone;
                    // FORUMULA FOR CELSIUS
                    let celsius = (temperature - 32) * (5 / 9);
                    // Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    //Change temperature to Celsius/Farenheit
                    tempDegree.addEventListener('click', () => {
                        if(tempSpan.textContent === 'F'){
                            tempSpan.textContent = 'C';
                            tempDegree.textContent = Math.floor(celsius);
                        }else{
                            tempSpan.textContent = 'F';
                            tempDegree.textContent = temperature

                        }
                    });

                });
        });
    }
    
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});