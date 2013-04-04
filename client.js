var MapOptions = null;
var Map = null;
var HttpRequest = null;

function initialise() {
    MapOptions = {
        center: new google.maps.LatLng(53, -3),
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

     Map = new google.maps.Map(document.getElementById("map-canvas"), MapOptions);

    GetXMLHttpObject();
}

 function GetXMLHttpObject()
{
    if (window.XMLHttpRequest)
    {
        HttpRequest = new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        // IE 6 compatibility
        HttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function Search() {

   ResetPage();

    HttpRequest.open("GET", "QueryPoliceAPI.php?location=" + document.getElementById("SearchBox").value);
    HttpRequest.onreadystatechange = SearchReturned;
    HttpRequest.send();

    AddMarkers();
}

function ResetPage()
{
    if(!document.getElementById("crimetable").hasAttribute("hidden")) 
    document.getElementById("crimetable").createAttribute("hidden");

    for (i = 0; i < 5; i++)
    {
        if(!document.getElementById("row" + i.toString()).hasAttribute("hidden")) 
        document.getElementById("row" + i.toString()).createAttribute("hidden");
    }
}

function SearchReturned()
{
    if (HttpRequest.readyState == 4 && HttpRequest.status == 200)
    {
        var response = HttpRequest.response;
        var responseObj = JSON.parse(response);

        FillTable(responseObj);
        AddMarkers(responseObj);
    }
}

function FillTable(responseObj)
{
    for (i = 0; i < responseObj.length; i++)
    {
        var crimeInHand = responseObj[i];
        if(crimeInHand != null)
        {
            document.getElementById("crimetable").removeAttribute("hidden");
            document.getElementById("row" + i.toString()).removeAttribute("hidden");
        }
        document.getElementById("crime" + i.toString()).innerHTML=crimeInHand["category"];

        var location = crimeInHand["location"];
        var street = location["street"]
        document.getElementById("loc" + i.toString()).innerHTML=street["name"];

        document.getElementById("month" + i.toString()).innerHTML=crimeInHand["month"];
            
        var outcome = crimeInHand["outcome_status"];
        if (outcome != null)
        {
            var outcomeCat = outcome["category"];
            if (outcomeCat != null)
            {
                document.getElementById("out" + i.toString()).innerHTML = outcomeCat;
            }
            else
            {
                document.getElementById("out" + i.toString()).innerHTML = "No Recorded Outcome";
            }
        }
        else
        {
            document.getElementById("out" + i.toString()).innerHTML = "No Recorded Outcome";
        }
    }
}

function AddMarkers(responseObj)
{
    var marker = null;
    for (i = 0; i < responseObj.length; i++)
    {
        var crimeInHand = responseObj[i];

        if(crimeInHand != null)
        {
            var location = crimeInHand["location"];
            if (location != null)
            {
                var latitude = location["latitude"];
                if (latitude != null)
                {
                    var longitude = location["longitude"];
                    if (longitude != null)
                    {
                        var number = i + 1;
                        var numberAsString = number.toString();
                        var marker = new google.maps.Marker(
                            { 
                                map: Map, 
                                position: new google.maps.LatLng(latitude, longitude), 
                                clickable: true, 
                                icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + numberAsString + "|FFFFFF|000000" 
                            });
                    }
                }
            }
        }
    }

    if (latitude != null && longitude != null)
    {
        Map.panTo(new google.maps.LatLng(latitude, longitude));
        Map.setZoom(12);
    }
}

google.maps.event.addDomListener(window, 'load', initialise);