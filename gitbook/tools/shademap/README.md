---
description: >-
  ShadeMap is a global simulation of mountain, building & tree shadows for a
  given date & time. Base data is free, but users have the option buy 30cm
  accurate data per sq km for areas of special focus.
---

# ShadeMap

## URL

[shademap.app](https://shademap.app/)

## Description

<div data-full-width="true">

<figure><img src=".gitbook/assets/ShortShadeMapcropped.gif" alt=""><figcaption><p>SHADE MAP SIMULATES THE SHADOW PATTERNS FROM SUNRISE TO SUNSET AS THE USER MOVES THE TIME SLIDER <br>TO CHANGE THE TIME IN RUSHON, TAJIKISTAN ON 18TH MAY</p></figcaption></figure>

</div>

ShadeMap can calculate shadow locations in real time and display them on a map. ShadeMap can also aggregate shadows over time to calculate how many hours of sun or shadow a specific location gets over the course of a day or over the course of an entire year. Sunlight hours and time of year are  used to calculate energy values of sunlight per unit area (square metre). In addition to mapping shadow patterns for a static location, ShadeMap's [Trail Shade](./#trail-shade) feature handles changing location uploaded as a user trail.&#x20;

{% hint style="success" %}
ShadeMap is also available as a Chrome browser extension which displays a sun and shadow layer for online maps including: openstreetmap.org, alltrails.com, gaiagps.com, caltopo.com. This is being extended to Strava, Mountain Project, OnX Maps with more to follow...
{% endhint %}

<details>

<summary>Open Source research applications of ShadeMap include geolocation and environmental monitoring and analysis... (Click for examples)</summary>

Geolocation can be supported directly where imagery contains shadows which can be matched to the model. Shade Map is also indirectly valuable in terms of predicting terrain properties. However, it must be offset with information on cloud cover, significant pollution, airborne volcanic ash, etc. for time periods chosen:

* the likely condition of terrain at a given time and place with respect to ground moisture v sun exposure, e.g. this area was in high energy sun for 8 hours before this image was taken, so it would be very dry.
* the likely snow covering over terrain at a given time and place with respect to snow melting v sun exposure, e.g. this area could have had a light snow covering since it was entirely shaded before this image was taken.
* the likely plant life which could survive at a given place and season with respect to shade and plant species.
* the likely condition of man-made materials at a given place and time with respect to the long term interaction of light on different building materials, e.g. bleaching effect.

Shade Map's cumulative analyses of daily sunlight hours, annual sunlight hours and annual energy values allow for the types of longer term analysis used in environmental monitoring and analysis, e.g. solar panel power potential in a given region. Data downloads are offered for users' generated results, and the developers offer assistance with large data set export.![](.gitbook/assets/image-1.png)

**SUN EXPOSURE VIEW DOWNLOAD MESSAGE** \
**EXPLAINING THE OUTPUT AND OFFERING ASSISTANCE**

</details>

### Using ShadeMap for Open Source Research: Use Cases, User Input Data, Output Data & Data Input Options...(Click each of the four tabs to access details)

{% tabs %}
{% tab title="USE CASES" %}
<figure><img src=".gitbook/assets/ShadeMapUseCasesTable.JPG" alt=""><figcaption><p>INPUT AND OUTPUT DATA FOR SHADE MAP USE CASES</p></figcaption></figure>
{% endtab %}

{% tab title="USER INPUT" %}
* Source imagery
* Location co-ordinates or place name
* Imagery Date
* Imagery Time
{% endtab %}

{% tab title="SHADOW MAP OUTPUT" %}
* Shadow map for given location, with user facility to change date and time
* Availability of optimal quality data for the given location, with the option to purchase
* Graph of annual sunlight & annual energy for the given location across the days and months of the year & time of day
* Colour map of the given area showing daylight hours in the sun
{% endtab %}

{% tab title="DATA INPUT OPTIONS" %}
<figure><img src=".gitbook/assets/DataInputTableShadeMap3.JPG" alt=""><figcaption><p><strong>DATA INPUT OPTIONS FOR SHADE MAP USERS</strong></p></figcaption></figure>
{% endtab %}
{% endtabs %}

{% hint style="danger" %}
**Limitations of Trial and Error Solutions for Date, Time and Location:** Bear in mind that sometimes there may be more than one solution value for a given set of parameters.
{% endhint %}

### ShadeMap Data

The shadows displayed by default are estimates gathered through indirect means like crowd sourcing and low resolution data. The default data gives a general idea of shadow distribution and sun direction, but **errors in the data can vary by several meters.**

Premium data is composed of precise measurements collected via LiDAR and photogammetry surveys. This means building layouts, roof, tree and building heights will be **exact to within 30 centimeters**. This is the most accurate shadow modeling data available.

If this data is available in a given region, an Add Trees button will appear when you zoom into street level. Tree data is purchased by square kilometer and can be accessed for one month

* Free building data comes from volunteers at [OpenStreetMap](https://www.openstreetmap.org)&#x20;
* ShadeMap buys additional building data and building heights from [Mapbox](https://shademap.app/help/mapbox.com) when the cost is manageable
* ShadeMap relies on the less detailed [Protomaps Basemaps](https://protomaps.com/) during periods of high traffic.
* Users requiring accurate building height and roof shape data can purchase Tree Data, which is gathered through LiDAR and photogrammetry surveys.

{% embed url="https://www.youtube.com/watch?v=CN7lQhNOv4I" %}
**DEMONSTRATING THE DIFFERENCE IN DATA QUALITY BETWEEN FREE BASE AND PAID FOR PREMIUM DATA. THIS IS BEST OBSERVED WITH A SATELLITE VIEW  SO SHADOWS OF INDIVIDUAL VISIBLE TREES & BUILDINGS SHOW UP.**
{% endembed %}

{% hint style="success" %}
Purchased data costs can be controlled because users are offered data only for the area in which they are interested, charged per square kilometre (USD $2.49 as at May 2024). Thus high resolution data need only be purchased for the user's area of interest.
{% endhint %}

* Users can add building data to the map via a drawing tool, which allows them to draw a building and set its height. Shade Map will then add the shadows it casts onto the map.

{% embed url="https://youtu.be/Q6tc4k6l-_k" %}
**HOW TO ADD A USER DEFINED BUILDING TO SHADEMAP AND SET ITS HEIGHT**
{% endembed %}

{% hint style="success" %}
Setting height to zero will delete the building again.
{% endhint %}

### The ShadeMap Interface

There are three views in Shade Map:&#x20;

1. [Shadow View](./#view-one-shadow-view)
2. [Hours in the Sun View](./#view-two-hours-in-the-sun-view)
3. [Annual Sun View](./#view-three-annual-sunlight-view).

&#x20;Each can be shown with one of two backgrounds: either map (called Outdoors) or Satellite.

ZOOMING THE MAP SCALE:

{% hint style="warning" %}
DON'T use the Mouse Scroll Wheel to Zoom the map scale BECAUSE the focus location is lost.&#x20;
{% endhint %}

{% hint style="success" %}
DO use the "+" and "-" tool in the bottom left of the map window to Zoom whilst maintaining a consistent focus location.
{% endhint %}

#### The Data Toolbar

<div>

<figure><img src=".gitbook/assets/shademapbottomleft menu.JPG" alt=""><figcaption><p>THE DATA TOOLBAR<br>SCREEN BOTTOM LEFT</p></figcaption></figure>

 

<figure><img src=".gitbook/assets/ShademapSettings (1).JPG" alt="" width="375"><figcaption><p><strong>THE SETTINGS MENU: CALLED FROM THE DATA TOOLBAR</strong></p></figcaption></figure>

</div>

Data display and exchange is managed through the bottom left interface toolbar, which allows

* Opening files of type: \*.tif, \*tiff, \* .gpx, \*.kml, \*.json, \*.geojson.
* Export of files as \*.tiff = Geotiff format.
* Generation of a link for sharing the view
* Interface settings around the sun direction for now, sunrise and sunset
  * Contour line units
  * Level of shadows re tree canopy (where applicable)
  * Colour of shade&#x20;

{% hint style="info" %}
The coloured lines centre screen which depict the direction of the sun and its elevation through the length of its shadow concur with the system and colour scheme used in [SunCalc](https://app.gitbook.com/o/WQpOq5ZFue4N6m65QCJq/s/ScmcEIAcsvKXg7S4xa8P/) app.
{% endhint %}

#### The View and Drawing Toolbars

View Orientation is managed through the bottom right interface toolbar, which allows

* Tilt adjustment via the 3D button
* View Selection via the Layers button
* Zoom via the "+" and "-" buttons
* Compass bearing reset due North via the arrow button.

By default, shadows are displayed on top of the tree canopy. To view shadows underneath the tree canopy instead, change the radio button setting from 'Top of canopy' to 'below canopy'.

<div>

<figure><img src=".gitbook/assets/shademapbottomrightmenu.JPG" alt="" width="170"><figcaption><p><strong>THE VIEW TOOLBAR ADJUSTS TILT AND ZOOM AND ALLOWS SELECTION OF THREE VIEW LAYERS AND TWO BASEMAPS</strong> </p></figcaption></figure>

 

<figure><img src=".gitbook/assets/shademaptopright menu.JPG" alt=""><figcaption><p><strong>THE DRAWING TOOLBAR APPEARS SCREEN TOP RIGHT</strong> <br><strong>IN SHADOW VIEW AND HOURS IN THE SUN VIEW</strong></p></figcaption></figure>

</div>

The Drawing Toolbar buttons allow the addition of objects to the map as polygons with a specified height, object editing, deletion and saving.

### VIEW ONE: Shadow View

Shadow View draws shadows in the colour selected by the user in Settings, for the date and time set by the user. The time slider changes the view over time between sunrise and sunset, the directions for which are shown in centre screen as gold and bright orange lines respectively. Current sun direction is shown as a yellow line which moves with the Time Slider.

<figure><img src=".gitbook/assets/shademap shadowview.JPG" alt=""><figcaption><p><strong>SHADOW VIEW FOCUSES AROUND THE CENTRAL LOCATION AND ALLOWS THE USER TO SELECT DATE AND TIME</strong></p></figcaption></figure>

### VIEW TWO: Hours In The Sun View

The user sets a location, date and time period and ShadeMap calculates the number of hours in the sun for each pixel point on the map, displaying it as a 'mouse over' numerical value and also as a colour corresponding the to value range shown in the scale at the bottom of the screen.

Example Open Source applcations include&#x20;

* Analysis of the environmental causes of terrain change in a glacial region
* Geolocation of imagery showing distinctive shadow patterns in a region of deep canyons

<figure><img src=".gitbook/assets/sunhoursview.jpg" alt="" width="563"><figcaption><p><strong>HOURS IN THE SUN VIEW SHOWING COLOUR SCALE ABOVE DATE AND TIME RANGE AT THE BOTTOM OF THE SCREEN</strong></p></figcaption></figure>

<div data-full-width="true">

<figure><img src=".gitbook/assets/ShadeMapHoursinSunView.gif" alt=""><figcaption><p>SETTING THE DATE AND TIME PERIOD FOR HOURS IN THE SUN VIEW IN A REGION OF DEEP CANYONS</p></figcaption></figure>

</div>

### VIEW THREE: Annual Sunlight View

ShadeMap calculates the annual hours of sunlight for the chosen location and displays them in a graph of days grouped by month (horizontal x axis) versus hour of the day (vertical y axis). The sun's energy for a given date and time is presented as a numerical value in kWh/m^2^ under the cursor, whilst the colour of the pixels represents the intensity of the sun's energy along a range from black (zero) through blue and green to red (highest).

Example Open Source applications include analysing solar panel power generation parameters in environmental research.

<div data-full-width="true">

<figure><img src=".gitbook/assets/ShadeMapannualview.gif" alt=""><figcaption><p>MOVING THE CURSOR ACROSS THE TIME OF DAY V MONTH PLOT FOR THE LOCATION SHOWN ON THE LEFT: EXACT DATE AND TIME ARE SHOWN FOR THE POINT UNDER THE CROSSWIRES PLUS THE ENERGY ABSORBED, WITH CUMULATIVE TOTALS AT THE TOP OF THE SCREEN</p></figcaption></figure>

</div>

### Trail Shade Feature - Accessible from the Search Bar Menu

<figure><img src=".gitbook/assets/ShadeMapTrailShade.JPG" alt=""><figcaption><p><strong>SHADEMAP'S TRAIL SHADE FEATURE MAPS SHADE ALONG A TRAIL OVER TIME</strong></p></figcaption></figure>

A specialist application of ShadeMap technology focusing on the shade profile of a given user-defined path (trail) on a given day of the year. The trail must be uploaded in GPX or KML format. Above  a map of the user's trail and date a graph of the distance along the trail versus time of day is drawn to show the changing shadow patterns.&#x20;

Example Open Source Research applications include confirmation of geolocation of video source imagery taken by a moving camera.

### GPX Replay Feature - Accessible from the Search Bar Menu

GPX Replay plays progress along a user defined trail on a map whilst the changing shadow pattern is constantly redrawn throughout the trip.

<figure><img src=".gitbook/assets/ShadeMapGPXPlay.gif" alt=""><figcaption><p>SHADE MAP'S GPX REPLAY FEATURE SHOWING THE SHADE PATTERN FOR A ROUND TRIP TRAIL</p></figcaption></figure>

### The ShadeMap API (Paid For)

ShadeMap offers a paid for API with the following features, where developer users can simulate, visualise and analyse sunlight and shadow in any current browser using their own data on terrain, buildings and vegetation and share it on the web.

<figure><img src=".gitbook/assets/ShadeMapAPI.JPG" alt=""><figcaption><p><strong>FEATURES OF THE SHADEMAP API (APPLICATION PROGRAMMING INTERFACE)</strong></p></figcaption></figure>

## Cost

* [x] Free
* [ ] Partially Free
* [ ] Paid

ShadeMap provides data and the service for free, but if higher quality data is required, ShadeMap helps users purchase it from a third party. A free browser extension is offered, as well as a paid for API.

## Level of difficulty

<table><thead><tr><th data-type="rating" data-max="5"></th></tr></thead><tbody><tr><td>3</td></tr></tbody></table>

ShadeMap basic features are not difficult to use, but a good understanding of the interplay of date, time, sun position and shadow direction and length is required to use its outputs effectively.&#x20;

## Requirements

* ShadeMap is free to use without a login account.&#x20;
* Where very high quality data is required, ShadeMap assists the user in purchasing it from a third party.&#x20;
* Users wanting to use the ShadeMap API will need to request an API key.&#x20;

## Limitations

**Performance:**&#x20;

ShadeMap relies heavily on the graphics processing unit (GPU) of the device it is running on.&#x20;

Where performance is an issue:-

1. &#x20;Test whether your browser supports WebGL from this [Test Page here](https://webglreport.com/?v=2) since ShadeMap will only work with browsers which do support WebGL
2. Reduce the size of the browser window to increase the performance.

**Data Quality**

Most ShadeMap free data does not contain accurate building heights and/or roof shapes. Users needing accurate data on these features can purchase Tree Data which provides exact measurements gathered through LiDAR and photogammetry surveys.

{% hint style="info" %}
There have been historical email issues around the delivery of purchased Tree Data where the data emails have been sent to Spam or blocked. A workaround is being implemented and the provider can be contacted [here](https://us6.list-manage.com/contact-form?u=e5e17c9e245874654e775b644\&form\_id=271345c0ff1a17865f8194ec099c597f) with any problems.
{% endhint %}

**Interface**

Some users might find the interface counterintuitive, in that&#x20;

* the user moves the time ruler against a fixed pointer, rather than moves the pointer to indicate the time.
* the user moves the background map under a fixed central point of focus to select location.

## Ethical Considerations

#### Overview: Ethical Low Risk, High Opportunity

ShadeMap can be used in chronolocation and confirming geolocation of imagery from remote areas which claims to depict mistreatment of indigenous minorities. As such, it can be used support to work which seeks to protect human rights, indigenous peoples, minorities and the environment through accurate geolocation. In very rare cases, geolocation and chronolocation reveal the identify of people providing source information, which could put them/their contacts at risk of reprisal. Source information providers may or may not be aware of this risk, so there is a responsibility on the Open Source researcher, who may have more information for accurate risk assessment, to evaluate that risk on their behalf. Many information providers willingly undertake the risk of reprisal for the benefit of drawing public/global attention to situations and events they hope will be changed or acted upon as a result of exposure

## Guide

ShadeMap's Online Help: [https://shademap.app/help/](https://shademap.app/help/)

Guide for the Chrome Browser Extension:&#x20;

{% embed url="https://www.youtube.com/watch?v=rReGMhMxUc8" %}
**YOU TUBE VIDEO BY THE DEVELOPER ON THE SHADE MAP BROWSER EXTENSION FOR CHROME**
{% endembed %}

Current Applications, Developments and Updates on X/Twitter: [https://x.com/shademap](https://x.com/shademap)

## Tool provider

ShadeMap 9615 NE 195th Cir Bothell, WA 98011 US

## Advertising Trackers

* [ ] This tool has not been checked for advertising trackers yet.
* [ ] This tool uses tracking cookies. Use with caution.
* [x] This tool does not appear to use tracking cookies.

| Page maintainer |
| --------------- |
| Sophie Tedling  |
|                 |
