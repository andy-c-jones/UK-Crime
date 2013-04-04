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
    HttpRequest.open("GET", "QueryPoliceAPI.php?location=" + document.getElementById("SearchBox").value);
    HttpRequest.onreadystatechange = SearchReturned;
    HttpRequest.send();

    AddMarkers();
}


function SearchReturned()
{
    if (HttpRequest.readyState == 4 && HttpRequest.status == 200)
    {
        document.getElementById("crimetable").removeAttribute("hidden");
        var response = HttpRequest.response;
        var responseObj = JSON.parse(response);

        FillTable(responseObj);
    }
}

function FillTable(responseObj)
{
    for (i = 0; i < 5; i++)
    {
        var crimeInHand = responseObj[i];

        document.getElementById("crime" + i.toString()).innerHTML=crimeInHand["category"];

        var loca = crimeInHand["location"];
        var street = loca["street"]
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
    var marker = new google.maps.Marker({ map: Map, position: new google.maps.LatLng(52.9, -2.9), clickable: true });
    var infowindow = new google.maps.InfoWindow({content:"Hello World!"});
    infowindow.open(Map,marker);
}

google.maps.event.addDomListener(window, 'load', initialise);