function initMap(a){var b={lat:27.800583,lng:-97.396378};map=new google.maps.Map(document.getElementById("map"),{center:b,zoom:14}),infowindow=new google.maps.InfoWindow,service=new google.maps.places.PlacesService(map);$("option").toArray()}var url="https://api.foursquare.com/v2/",searchParam="venues/search?ll=27.800,-97.396378&radius=500",clientID="&client_id=U020N4T01S1OVELBUZDS4DXZT02HGTB5RNR4WWJEDIENC0HS",secretID="&client_secret=&GTF2MZL3D25HPXQ3H4GXNXYEWVFUVBGG55FSXER1VDYEZ2K2",year=(new Date).getFullYear(),month=(new Date).getMonth(),day=(new Date).getDay(),date="20172703",apiLink="https://api.foursquare.com/v2/venues/search?ll=27.800583,-97.396378&radius=500&limit=50&client_id=U020N4T01S1OVELBUZDS4DXZT02HGTB5RNR4WWJEDIENC0HS&client_secret=GTF2MZL3D25HPXQ3H4GXNXYEWVFUVBGG55FSXER1VDYEZ2K2&v=20172703",infowindow;markers=[],places=[],Model={places:[],markers:window.markers,fours:$.get(apiLink,function(a){Model.markers=a.response.venues,Model.markers.forEach(function(a){Model.createMarker(a)})}).error(function(){alert("API request could not be completed")}),searchString:function(){return $("#combo").val().toString()},toggleBounce:function(a){null!==this.getAnimation()?this.setAnimation(null):this.setAnimation(google.maps.Animation.BOUNCE)},untoggleBounce:function(){this.getAnimation()===google.maps.Animation.BOUNCE&&this.setAnimation(null)},createMarker:function(a){if(console.log(a),a.categories[0]){var b=a.location.lat,c=a.location.lng,d=a.categories[0].name,e=a.name,f=a.contact.phone,g="Phone Number";f||(f="",g="");var h='<div class="content">'+e+'</div></br><div class="phone"><div class="number" >'+g+"</div>"+f+"</div>",i=new google.maps.Marker({map:map,position:{lat:b,lng:c},animation:google.maps.Animation.DROP});i.addListener("mouseover",Model.toggleBounce),i.addListener("mouseout",Model.untoggleBounce),i.name=e,i.phone=f,i.category=d,i.phone||(i.phone=""),google.maps.event.addListener(i,"click",function(){infowindow.setContent(h),infowindow.open(map,this)}),Model.places.push(i)}}},$(window).on("load",function(){filterMarkers=function(a){for(i=0;i<Model.places.length;i++)marker=Model.places[i],console.log(marker.category),marker.category==a||"All"==a?marker.setVisible(!0):marker.setVisible(!1)},$("#combo").change(function(){filterMarkers(this.value.toString())});var a=function(a){var b=this;b.categories=ko.observableArray(a.categories),b.places=ko.observableArray(a.places),b.filter=ko.observable(""),b.filteredPlaces=ko.computed(function(){var a=b.filter();return"All"==a?b.places():ko.utils.arrayFilter(b.places(),function(b){if(b.categories[0])return b.categories[0].name==a})}),b.clickText=ko.observable(""),incrementClickCounter=function(a){console.log(a.name),Model.places.forEach(function(b){b.setAnimation(null);var c=b.name,d=b.phone,e="Phone Number";d||(d="",e="");var f='<div class="content">'+c+'</div></br><div class="phone"><div class="number" >'+e+"</div>"+d+"</div>";a.name==b.name&&(console.log(b.toggleBounce),infowindow.setContent(f),infowindow.open(map,b),b.toggleBounce=Model.toggleBounce,b.toggleBounce())})}},b=function(){var a=[];return Model.markers.forEach(function(b){a.push(b)}),a}(),c=function(){var a=["All"];return Model.markers.forEach(function(b){b.categories[0]&&a.indexOf(b.categories[0].name)<0&&a.push(b.categories[0].name)}),a.sort()}();Data={places:b,categories:c},ko.applyBindings(new a(Data))});