
var url = "https://api.foursquare.com/v2/";
// var searchParam = "venues/search?ll=27.800,-97.396378&radius=500";
// var clientID = "&client_id=U020N4T01S1OVELBUZDS4DXZT02HGTB5RNR4WWJEDIENC0HS";
// var secretID = "&client_secret=&GTF2MZL3D25HPXQ3H4GXNXYEWVFUVBGG55FSXER1VDYEZ2K2";

var date = '20172703';
var apiLink = "https://api.foursquare.com/v2/venues/search?ll=27.800583,-97.396378&radius=500&limit=50&client_id=U020N4T01S1OVELBUZDS4DXZT02HGTB5RNR4WWJEDIENC0HS&client_secret=GTF2MZL3D25HPXQ3H4GXNXYEWVFUVBGG55FSXER1VDYEZ2K2&v=20172703";

var infowindow;



Model = {

    // the places property contains an array of marker objects
    //Model.fours generates the API call to foursquare where the response delivers the array of objects containing details about each location
    places: [],
    markers: window.markers,
    fours: $.get(apiLink, function(data) {
            // console.log("Api")
            Model.markers = data.response.venues;


            // Model.markers.forEach(function(place) {

            //     // console.log(data)
            // })

        })
        .error(function() {
            alert("API request could not be completed");
        }),


    // searchString is the value generated from the main filter selection which is referenced within the mapView object
    searchString: function() {
        return $('#combo').val().toString();
    },
            //Generates marker animation
    toggleBounce: function(e) {

        if (this.getAnimation() !== null) {
            this.setAnimation(null);
        } else {
            this.setAnimation(google.maps.Animation.BOUNCE);
        }
    },
    untoggleBounce: function() {
        if (this.getAnimation() === google.maps.Animation.BOUNCE) {
            this.setAnimation(null);
        }
    }, //Marker creation is called on window load
    createMarker: function(place) {

        if (place.categories[0]) {
            var placeLat = place.location.lat;
            var placeLng = place.location.lng;

            var category = place.categories[0].name;
            var name = place.name;
            var phone = place.contact.phone;
            var url = place.url;

            var Phone = 'Phone Number';
            if (!phone) {
                phone = '';
                Phone = '';
            }

            if(!url){
                url = '';
            }

            var contentString = '<div class="content">' + name + '</div>' + '</br>' +'<div>' + url + '</div>' + '<div class="phone">' + '<div class="number" >' + Phone + '</div>' + phone + '</div>';

            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(placeLat, placeLng),
                animation: google.maps.Animation.DROP
            });

            marker.addListener('click', Model.toggleBounce);
            // marker.addListener('mouseout', Model.untoggleBounce)
            marker.name = name;
            marker.phone = phone;
            marker.category = category;
            bounds.extend(marker.position);

            if (!marker.phone) {
                marker.phone = '';
            }

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(contentString);
                infowindow.open(map, this);
            });

            Model.places.push(marker);
        }
    }
};

$(window).on("load", function() {



        Model.markers.splice(2,1);
        Model.markers.splice(3,1);
        Model.markers.forEach(function(val){
                if (!val.url) {
              val.url = '';
                }
        });
        bounds = new google.maps.LatLngBounds();

        Model.markers.forEach(function(val){

            Model.createMarker(val);
        });

        // Model.markers.forEach(function(place,i) {

        //     Model.markers.forEach(function(place2,j){
        //         if(i != j){

        //             if (place.location.lat === place2.location.lat){

        //                 console.log(place.location.lat, place2.location.lat, i, j)
        //                 place2.location.lng +=  .00001
        //                 console.log(place.location.lat, place2.location.lat, i, j)

        //             }
        //         }
        //     })
        //      Model.createMarker(place)
        //  })


    var filterMarkers = function(category) {

        var filtered =[];
        for (i = 0; i < Model.places.length; i++) {

            marker = Model.places[i];

            console.log(marker.category);
            // If is same category or category not picked
            if (marker.category == category || category == "All") {
                marker.setVisible(true);

            }
            // Categories don't match
            else {
                marker.setVisible(false);
            }
        }
    };

    $('#combo').on('click', function() {
        // console.log(this.value)
        console.log("no way");

        filterMarkers(this.value.toString());
        map.fitBounds(bounds);

    });

    var ViewModel = function(data) {

        var self = this;

        self.categories = ko.observableArray(data.categories);
        self.places = ko.observableArray(data.places);
        self.filter = ko.observable('');

        self.filteredPlaces = ko.computed(function() {
            var filter = self.filter();
            if (filter == "All") {
                return self.places();
            } else {
                return ko.utils.arrayFilter(self.places(), function(place) {

                    if (place.categories[0]) {
                        return place.categories[0].name == filter;
                    }
                });
            }
        });

        self.clickText = ko.observable('');

       selectPlaces = function(e) {

            Model.places.forEach(function(place) {
                place.setAnimation(null);
                var name = place.name;
                var phone = place.phone;
                var url = place.url;
                var Phone = 'Phone Number';
                if (!phone) {
                    phone = '';
                    Phone = '';
                }

                 if(!url){
                    url = '';
                 }
                 var contentString = '<div class="content">' + name + '</div>' + '</br>' +'<div>' + url + '</div>' + '<div class="phone">' + '<div class="number" >' + Phone + '</div>' + phone + '</div>';
                 // var contentString = '<div class="content">' + name + '</div>' + '</br>' + '<div class="phone">' + '<div class="number" >' + Phone + '</div>' + phone + '</div>';
                if (e.name == place.name) {
                    infowindow.setContent(contentString);
                    infowindow.open(map, place);
                    place.toggleBounce = Model.toggleBounce;
                    place.toggleBounce();
                }
            });
        };
    };


    var places = function() {
        var placesList = [];
        Model.markers.forEach(function(placeItem) {
            placesList.push(placeItem);
        });
        return placesList;
    }();

    var categories = function() {

        var result = ["All"];
        Model.markers.forEach(function(item) {
            if (item.categories[0]) {
                if (result.indexOf(item.categories[0].name) < 0) {
                    result.push(item.categories[0].name);
                }
            }
        });
        return result.sort();
    }();

    var Data = {

        places: places,
        categories: categories

    };

    ko.applyBindings(new ViewModel(Data));

});

