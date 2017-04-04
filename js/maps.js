 function initMap(search) {


            var corpus = {
                lat: 27.800583,
                lng: -97.396378
            };


            map = new google.maps.Map(document.getElementById('map'), {
                center: corpus,
                zoom: 14
                // category: categories
            });

            infowindow = new google.maps.InfoWindow();
            service = new google.maps.places.PlacesService(map);
            var options = $('option').toArray();
        }