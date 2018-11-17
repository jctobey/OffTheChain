
$(document).ready(function () {

    //Window Scroll
    window.smoothScroll = function (target) {
        var scrollContainer = target;
        do { //find scroll container
            scrollContainer = scrollContainer.parentNode;
            if (!scrollContainer) return;
            scrollContainer.scrollTop += 1;
        } while (scrollContainer.scrollTop == 0);
        var targetY = -430;
        do { //find the top of target relatively to the container
            if (target == scrollContainer) break;
            targetY += target.offsetTop - 18;
        } while (target = target.offsetParent);
        scroll = function (c, a, b, i) {
            i++;
            if (i > 30) return;
            c.scrollTop = a + (b - a) / 30 * i;
            setTimeout(function () {
                scroll(c, a, b, i);
            }, 30);
        }
        // start scrolling
        scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
    }


var kittayIcon = L.icon({
    iconUrl: '../public/assets/img/kittay.png', //"public/assets/img/kittay.png",

    iconSize:     [25, 36], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [25, 36], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-10, -35] // point from which the popup should open relative to the iconAnchor
});
var doggyIcon = L.icon({
    iconUrl: "../public/assets/img/dog.png",
    

    iconSize:     [25, 36], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [25, 36], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-10, -35] // point from which the popup should open relative to the iconAnchor
});
    key = "AIzaSyD70EcFlRlgIbc1ARNvns5CszqjaUyQzVI";
    // initialize the map
    var mymap = L.map('map').setView([30.2672, -97.7431], 13);

    // load a tile layer
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamN0b2JleSIsImEiOiJjam9kNGs3MzMwczI2M3BwYjVtaXRpZ2l1In0.sxKzZ76nyy_PN8ETEnoKKA', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiamN0b2JleSIsImEiOiJjam9kNGs3MzMwczI2M3BwYjVtaXRpZ2l1In0.sxKzZ76nyy_PN8ETEnoKKA'
    }).addTo(mymap);

     $.get("/api/pets", 
        function(data) {
            console.log(data)
          for (var i = 0; i < data.length; i++) {
           let mapPoint= data[i].found_location.split(',')
           let mapPointParsed= [parseFloat(mapPoint[0]),parseFloat(mapPoint[1])]
           if(data[i].type==="Dog"){
			marker = new L.marker(mapPointParsed), {icon:doggyIcon}
				.bindPopup(data[i].animal_ID)
        .addTo(mymap);}
        else if(data[i].type==="Cat"){
        marker = new L.marker(mapPointParsed), {icon:kittayIcon}
				.bindPopup(data[i].animal_ID)
        .addTo(mymap);}
        
    }});

    function onMapClick(e) {
      
      marker.bindPopup(popupContent).openPopup();

    }

    mymap.on('click', onMapClick);
    
})

   