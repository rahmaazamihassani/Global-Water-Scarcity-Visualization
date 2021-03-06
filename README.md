# InfoVis Lab Project
Submission template for the InfoVis lab project at the Johannes Kepler University Linz.

**Explanation:**
This `README.md` needs to be pushed to Github for each of the 3 delivery dates.
For every submission change/extend the corresponding sections by replacing the [TODO] markers.
*In order to meet the deadlines make sure you push everything to your Github repository.*
For more details see [*Moodle page*](https://moodle.jku.at/jku/course/view.php?id=9291).

**Tip:** Make yourself familiar with [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

# Submission due on 22.04.2020

## General Information

**Project Name:** Water-Scarcity

**Group Members**

| Student ID    | First Name        | Last Name      |
| --------------|-------------------|----------------|
| k01156557     | Edvin             | Herac          |
| k11938130     | Cosmina-Cristina  | Rațiu          |
| k11944372     | Rahma             | Azami-Hassani  |

## Dataset

* What is the dataset about?
    - Worldwide water scarcity over the last decades (1905 to 2005). The distribution of water consumption per country and average population. Also, water consumption of households, electricity production, irrigation, farming and manufacturing.

* Where did you get this dataset from (i.e., source of the dataset)?
    - A scientific report about the worldwide water scarcity https://doi.org/10.1038/srep38495. dataset is available in the supplementary materials section. 

* How was the dataset generated?
    - The dataset was generated by collecting information from other datasets in different papers and studies (e.g. socio. studies over irrigation and production) and merging them into one dataset. Food Production Units are used instead of countries and for every unit, the data from the ISIMIP project for water availability and irrigation are merged. From Water Futures and Solutions project (WFaS), the data for domestic and industrial water consumption is extracted. Irrigation water use is then modified based on actions to improve water use efficiency or productivity. The scientific report discribes everything in details.

* What is dataset size in terms of nodes, items, rows, columns, ...?
    - Data rows consist if 573 locations in the world. (573 x ROWS)
For every place(FPU) the set contains data on
(population, blue water availability, total cons., domestic cons., electric cons., irrigation cons., livestock cons., manufacturing cons., shortage and stress) (9 x SHEETS)
for the years (1905,1915,1925,1935,1945,1955,1965,1975,1985,1995 and 2005) (11 x COLUMNS + FPU column)
Also one sheet contains the name of the country the FPU is in.

* How is the dataset structured?
    - This study uses food production units (FPUs), a combination of river basin, and administrative boundaries for the analysis. A GeoTIFF contains the exact spatial data of the FPU in the world. Every FPU is described in a different sheet for the corresponding collected data. Every column contains one decade (e.i: 11 columns representing decades between 1905 and 2005).

    - Fileformat: GeoTIFF (file containt the FPU location),
Resolution: 30 arc-min,
Projection: WGS84,
Extent: Lat: S90° to N90°; Lon: W180° to E180°

## User Tasks & Goals

* What are the user tasks?
    - How much of the world (percentage) is projected to have water scarcity in the future?
    - What is the percentage of different countries that are projected to have water scarcity in the future?
    - What locations tend to suffer more from water scarcity?
    - How did the water scarcity change during the decades for those locations?
    - What will be the main reason for the water scarcity worldwide and regionwide in the future? 
    - Do regions located near the sea tend to have a lower water scarcity?
    - Which country tends to have the most clear water?

* What would users like to see/get from the dataset?
    - How the worldwide water scarcity develops over the years.
    - What the main reasons are for the water scarcity, depending on year and/or on region.
    - The distribution of clear water in different countries over the decades.

# Submission due on 13.05.2020

## Proposed Dashboard Solution

* Which type of visualizations did you use & explain why you chose these visualizations?
    - Layered bar charts: We used a layered bar chart at the top of the dashboard with a bar for total availability of clear water and a bar total consumption in the given yearspan. This allows us a clear global overview of the scarcity over time and allows us to select which year we want to analyze further. We go through the category of yearspans.
    - Stacked bar chart:
We used stacked bar charts, to display the data of the selected regions. e.g. the domestic consumption of water across the selected regions.
    - Selectable World Map (by FPU Regions): Because our data is not scattered like normal per country data, we had to use FPU regions. Every selected region responds to a collection of FPUs and uses the averaged data to display in the stacked bar chart.

* Add sketches or images if possible. 

This is only a sketch, the displayed data and colors are not correct and only improvised.

![Sketch of the dashboard](https://github.com/rahmaazamihassani/Global-Water-Scarcity-Visualization/blob/35014a845f2a206b860fc651533b1739c79618b0/draft.png)


# Submission due on 17.06.2020

## Implementation Details

* How did you implement the dashboard?
        Our dashboard is composed of 3 parts: 
    - Selectable bar chart: comparing water shortage of 10 years measured every decade (1905 - 2005). It gives an overview over the water scarcity developement. It also allows to select a specific year in order to dislay the exact value of water shortage after a decade.
    - Selectable map: Here we can select an region and the corresponding water scarcity data will be displayed in the stacked bar chart on the bottom of the map. Also a stacked-bar-chart while hovering over a region will display the whole consumption in that region over the decades, each color represents a consumption filed (e.g domestic, electricity...).
    - Stacked bar chart: contains the data about consumption distribution of water in the selected year and the selected regions. 
* Which external libraries and/or resources did you use?
    - We used Mapbox to have a movable background map and placed our geojson "polygons with color" on that map.
* Additional information about the implementation
    - The dataset is in JSON format in map.geojson file. The file is splitted in regions. Every region contains all polygons and all properties for our calculations. e.g. Total consumption for all years for every region.

## Limitations

* What are the limitations of your solution?
    - In our solution it is not possible to compare the consumptions over the years. We can only visualize the consumption for a selected year and for the selected regions. Only while hovering over a region it is possible the see a consumption distribution for that region over the decades.
* Is there anything that a user could not achieve from the given user tasks? Why? What is missing and how must the prototype be improved?
    - How much of the world (percentage) is projected to have water scarcity in the future? It is not displayed in precentage, its displayed in shortage per capita per year.
    - Do regions located near the sea tend to have a lower water scarcity? We do not have such a fine granular approach for the shortage.
    - Which country tends to have the most clear water? Our approach is not split in countries, rather in regions.

## Findings and Insights
* How does the solution enable users to answer the tasks?
    - By selecting the decade and a region a user can view the water consumption distribution of each region over one decade.
    - The displayed information includes:
        - Water availability
        - Total consumption
        - Domestic consumption 
        - Electric consumption
        - Irrigation consumption
        - Livestock consumption
        - Manufacturing consumption
        - Shortage
* What are the findings and insights from the dataset?
    - Our worldwide shortage is rising since the 80s. Irrigatioon and manufacture water consumption is rising steadily.

## Conclusion

* What is your conclusion?
We have still enough water available. The only problem will be to get it cheap under the people. Worldwide irrigation will become a large problem in the future.
