function initMap() {
    let centerLatLng = new google.maps.LatLng(50.27, 30.30);
    let mapOptions = {
        center: centerLatLng,
        zoom: 8
    };
    let map = new google.maps.Map(document.querySelector('#map'), mapOptions);
}
google.maps.event.addDomListener(window, "load", initMap);