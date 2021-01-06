# yelp-maps-mashup
An app displaying places and their information from Yelp API on the Map.

Project done as a part of CSE-5335 Web Data Management Course at UTA.

Demo of the project can be found <a href="https://yelp-maps.herokuapp.com/">here</a>.

The Problem Statement is as follows:

<p align="justify">The goal of this project is to create a web mashup that combines two web services: Google Maps andthe Yelp API for Developers, using JavaScript and AJAX. After you center your Google Map to ageographical area and enter some terms, such as "Indian Restaurant", your application will find the bestmatches (eg, the best Indian restaurants) inside you map area, it will mark their location on the map, andwill display some information about these restaurants on the web page.</p>

You need to edit the HTML file yelp.htmland the JavaScript file yelp.js.

Your HTML web page musthave 3 sections:
- a search text area to put search terms with a button "Find"
- a Google map of size 600*500 pixels, initially centered at (32.75, -97.13) with zoom level 16
- a text display area

<p align="justify">When you write some search terms in the search text area, say "Indian buffet", it will find the 10 bestrestaurants in the map area that match the search terms. They may be less than 10 (including zero)sometimes. The map will display the location of these restaurants as map overlay markers with labelsfrom 1 to 10. The text display area will display various information about these restaurants. It will be anordered list from 1 to 10 that correspond to the best 10 matches. Each list item in the display area willinclude the following information about the restaurant: the image "image_url", the "name" as a clickable"url" to the Yelp page of this restaurant, and the rating (a number between 1-5). When you search fornew terms, it will clear the display area and all the map overlay markers, and will create new ones based on the new search.</p>

<img src="https://github.com/c-deshpande/yelp-maps-mashup/blob/main/img/demo.PNG" alt="demo"/>
