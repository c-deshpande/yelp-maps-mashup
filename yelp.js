/* Declaring reference variables */
let map;
let result = "";
let markers = []
var marker;
var bounds;
var radius;

/* Init function */
function initialize() {
   initMap();
}

/* Init Google Maps view */
function initMap() {
   /* Initializing the map to given coordinates i.e. (32.75, -97.13) with zoom level 16 */
   map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 32.75, lng: -97.13 },
      zoom: 16,
   });

   /* Get current center coordinates to use for search */
   google.maps.event.addListener(map, 'bounds_changed', function () {

      bounds = map.getBounds();
      center = bounds.getCenter();

      /* Get the radius from center to the current viewport */
      radius = getBoundsRadius(bounds);
   });
}

/* Actual API call */
function sendRequest() {

   /* Deleting already set markers from the map */
   deleteMarkers();

   /* Resetting the views before populating with new data */
   result = "";
   document.getElementById("output").innerHTML = "";

   /* AJAX request */
   var xhr = new XMLHttpRequest();
   let query = encodeURI(document.getElementById("search").value);
   /* Providing current center's coordinates as latitude and longitude and limiting the search to 10 results */
   xhr.open("GET", "proxy.php?term=" + query + "&latitude=" + center.toJSON().lat + "&longitude=" + center.toJSON().lng + "&radius=" + radius + "&limit=" + 10);
   xhr.setRequestHeader("Accept", "application/json");
   xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
         var json = JSON.parse(this.responseText);
         /* Converting results from JSON to actual HTML elements */
         for (i = 0; i < json.businesses.length; i++) {

            var currentItem = json.businesses[i];

            result += '<br><div id="searchResultItem" style="text-align: center;">';
            result += '<img src="' + currentItem.image_url + '" style="height: 200px; width: 200px;"/>';
            result += '<br><a href="' + currentItem.url + '" target="_blank">' + (i + 1) + ") " + currentItem.name + '</a>';
            result += '<br><span> Rating: ' + currentItem.rating + '/5</span>';
            result += '</div><hr>';

            /* Adding markers to map by getting coordinates from JSON response */
            var marker = new google.maps.Marker({
               position: new google.maps.LatLng(currentItem.coordinates.latitude, currentItem.coordinates.longitude),
               map,
               title: currentItem.name,
               label: (i + 1).toString(),
            });

            /* Pushing the markers into the array */
            markers.push(marker);
         }

         document.getElementById("output").innerHTML = result;
      }
   };
   xhr.send(null);
}

/* Function to delete the markers which are present on the map and re-initialize the array */
function deleteMarkers() {
   for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
   }
   markers = [];
};

/* Function to get the radius from the center of the viewport */
/* https://stackoverflow.com/a/3527136/5990108 */
function getBoundsRadius(bounds) {

   /* Radius of the earth in km */
   var r = 6378.8;

   /* Converting degrees to radians (divide by 57.2958) */
   var ne_lat = bounds.getNorthEast().lat() / 57.2958;
   var ne_lng = bounds.getNorthEast().lng() / 57.2958;
   var c_lat = bounds.getCenter().lat() / 57.2958;
   var c_lng = bounds.getCenter().lng() / 57.2958;

   /* Circle radius from center to Northeast corner of bounds */
   var r_km = r * Math.acos(
      Math.sin(c_lat) * Math.sin(ne_lat) +
      Math.cos(c_lat) * Math.cos(ne_lat) * Math.cos(ne_lng - c_lng)
   );

   /* Returning radius in meters */
   return Math.floor(r_km * 1000);
}