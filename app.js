const content = document.querySelector('div.content')
console.log(content)



//console.log(L)

var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var myIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/International_Space_Station.svg/1200px-International_Space_Station.svg.png',
    iconSize: [38, 32],
    // iconAnchor: [22, 94],
    // popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
});

var pathIcon = L.icon({
    iconUrl: 'https://www.svgrepo.com/show/344736/dot.svg',
    iconSize: [20, 20],
});

let marker = L.marker([0, 0], {icon: myIcon}).addTo(map)  

const fetchSpaceStationDetails = async () => {
    const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544')
    const data = await res.json()
    const {latitude, longitude, velocity} = data
    //console.log(latitude, longitude, velocity)

    marker.setLatLng([latitude, longitude])

    //marker to track path
    L.marker([latitude, longitude], {icon: pathIcon}).addTo(map) 
    
    const template = `
                        
                        <div class="iss_data">
                            <p>Latitude: ${latitude.toFixed(4) + "&deg" }</p>
                            <p>Longitude: ${longitude.toFixed(4) + "&deg" }</p>
                            <p>Velocity: ${velocity.toFixed(0) + " Km/hr "}</p> 
                        </div>
                    `
        
        content.innerHTML = template
}

// To see live location -> call function after 1 sec
fetchSpaceStationDetails()

//A function which calls particular function after set interval, here to give live location-
setInterval(fetchSpaceStationDetails, 1000)