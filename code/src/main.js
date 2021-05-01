
var paletteConsumptions = d3.scaleOrdinal(d3.schemeSet1);
var colorConsumptions = [0,1,2,3,4].map((nr)=>paletteConsumptions(nr));
console.log(colorConsumptions);

var div = d3.select("body").append("div")
.attr("class", "tooltip")
.style("opacity", 0);

var svg = d3.select("svg"),
    width = svg.attr("width")-200,
    height = svg.attr("height")-200

svg.append("text")
    .attr("transform", "translate(0,0)")
    .attr("x", 50)
    .attr("y", 50)
    .attr("font-size", "24px")
    .text("Water shortage in decades - (select a year)")
    .attr("font-family"," Arial, Helvetica, sans-serif");

var xScale = d3.scaleBand().range([0, width]).padding(0.1),
    yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.json("./data/map.geojson").then(function (data) {

    xScale.domain(years.map(function (d) { return d; }));

    yScale.domain([0, d3.max([calculateSHORT(0, data)
        , calculateSHORT(1, data)
        , calculateSHORT(2, data)
        , calculateSHORT(3, data)
        , calculateSHORT(4, data)
        , calculateSHORT(5, data)
        , calculateSHORT(6, data)
        , calculateSHORT(7, data)
        , calculateSHORT(8, data)
        , calculateSHORT(9, data)
        , calculateSHORT(10, data)])]);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("y", height - 250)
        .attr("x", width - 100)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .attr("font-size", "14px")
        .text("Year");

    g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function (d) {
            return d;
        })
            .ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-3.8em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .attr("font-size", "14px")
        .text("Water Shortage (km³/Capita)");



    var barsAVAIL = g.selectAll(".bar")
        .data(data.features[0].properties.AVAILABLE)
        .enter().append("rect")
        .attr("class", "bar");

    barsAVAIL.attr("x", function (d, i) { return xScale(years[i]); })
        .attr("y", function (d, i) { return yScale(calculateSHORT(i, data)); })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d, i) { return height - yScale(calculateSHORT(i, data)); })
        .attr("fill", "red")
        .attr("opacity", "0.6")
        .attr("stroke", "black")
        .attr("stroke-width", "0")
        .on("mouseover", function (d, i) {
            if (selectedYearIndex !== i) {
                d3.select(this)
                    .attr("stroke-width", "2");
            }
            //POPUP
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(calculateSHORT(i, data) + " km³/Capita <br/>")
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 40) + "px")                            
                .style("width",  "130px")
                .style("height", "30px");
        }).on("mousemove", function (d, i) {
            //POPUP
            div
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 40) + "px");
        })
        .on("mouseout", function (d, i) {
            if (selectedYearIndex !== i) {
                d3.select(this)
                    .attr("stroke-width", "0");
            }

            div.transition()
                .duration(500)
                .style("opacity", 0);

        }).on("click", function (d, i) {
            g.selectAll(".bar").attr("opacity", "0.6").attr("stroke-width", "0");
            d3.select(this).attr("opacity", "1").attr("stroke-width", "3");

            selectedYearIndex = i;
            if(selectedRegions.length > 0 && selectedYearIndex !== null)
                updateStackedBarChart(selectedRegions, selectedYearIndex, layers, colors);
        });


    d3.select('#datasvg').append('svg')
        .attr('width', 1200)
        .attr('height', 400);
    d3.select('#datasvg').select('svg').append('g')
        .attr('id', 'stackedBarChart')
        .attr('transform', `translate(200, 80)`);
});




function updateHoverRegionChart(regionId) {
    // REGION CHART
    var svg2 = d3.select("#regionchart"),
        margin2 = 200,
        width2 = svg2.attr("width") - margin2 / 6,
        height2 = svg2.attr("height") - margin2 / 2

    var xScale2 = d3.scaleBand().range([0, width2]).padding(0.4),
        yScale2 = d3.scaleLinear().range([height2, 0]);

    var g2 = svg2.append("g")
        .attr("transform", "translate(" + 35 + "," + 50 + ")");

    d3.json("./data/map.geojson").then(function (data) {

        xScale2.domain(years.map(function (d) { return d; }));

        yScale2.domain([0, 100]);

        g2.append("g")
            .append("text")
            .attr("y", 19)
            .attr("dy", "-3.6em")
            .attr("dx", "-1.6em")
            .attr("stroke", "black")
            .attr("font-size", "14px")
            .text(data.features[regionId].properties.DN + " Consumption");

            g2.append("rect").attr("x",-20).attr("y",226).attr("width",6).attr("height",6).style("fill", paletteConsumptions(0));
            g2.append("rect").attr("x",-20).attr("y",238).attr("width",6).attr("height",6).style("fill", paletteConsumptions(1));
            g2.append("rect").attr("x",50).attr("y",226).attr("width",6).attr("height",6).style("fill", paletteConsumptions(2));
            g2.append("rect").attr("x",50).attr("y",238).attr("width",6).attr("height",6).style("fill", paletteConsumptions(3));
            g2.append("rect").attr("x",120).attr("y",226).attr("width",6).attr("height",6).style("fill", paletteConsumptions(4));


            g2.append("text").attr("x", -10).attr("y", 234).text("Domestic").style("font-size", "12px").attr("alignment-baseline","middle")
            g2.append("text").attr("x", -10).attr("y", 246).text("Electric").style("font-size", "12px").attr("alignment-baseline","middle")
            g2.append("text").attr("x", 60).attr("y", 234).text("Irrigation").style("font-size", "12px").attr("alignment-baseline","middle")
            g2.append("text").attr("x", 60).attr("y", 246).text("Livestock").style("font-size", "12px").attr("alignment-baseline","middle")
            g2.append("text").attr("x", 130).attr("y", 234).text("Manufacture").style("font-size", "12px").attr("alignment-baseline","middle")

        g2.append("g")
            .attr("transform", "translate(0," + height2 + ")")
            .call(d3.axisBottom(xScale2))
            .append("text")
            .attr("y", height2 - 160)
            .attr("x", width2 - 10)
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Year");

        g2.append("g")
            .call(d3.axisLeft(yScale2).tickFormat(function (d) {
                return d;
            })
                .ticks(10))
            .append("text")
            .attr("y", 19)
            .attr("dy", "-3em")
            .attr("dx", "-2.5em")
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("%");

        var barsAVAIL2 = g2.selectAll(".bar2")
            .data(data.features[0].properties.DOM)
            .enter().append("rect")
            .attr("class", "bar");

        barsAVAIL2.attr("x", function (d, i) { return xScale2(years[i]); })
            .attr("y", function (d, i) { return yScale2(calculateDOMPercent(i, regionId, data)); })
            .attr("width", xScale2.bandwidth())
            .attr("height", function (d, i) { return height2 - yScale2(calculateDOMPercent(i, regionId, data)); })
            .attr("fill", paletteConsumptions(0))
            .attr("opacity", "0.7")
            .attr("stroke", "black")
            .attr("stroke-width", "0");

        barsAVAIL2.exit().remove();

        var barsAVAIL2 = g2.selectAll(".bar3")
            .data(data.features[0].properties.ELEC)
            .enter().append("rect")
            .attr("class", "bar");

        barsAVAIL2.attr("x", function (d, i) { return xScale2(years[i]); })
            .attr("y", function (d, i) { return yScale2(calculateELECPercent(i, regionId, data) + calculateDOMPercent(i, regionId, data)); })
            .attr("width", xScale2.bandwidth())
            .attr("height", function (d, i) { return height2 - yScale2(calculateELECPercent(i, regionId, data)); })
            .attr("fill", paletteConsumptions(1))
            .attr("opacity", "0.7")
            .attr("stroke", "black")
            .attr("stroke-width", "0");


        barsAVAIL2.exit().remove();

        var barsAVAIL2 = g2.selectAll(".bar4")
            .data(data.features[0].properties.ELEC)
            .enter().append("rect")
            .attr("class", "bar");

        barsAVAIL2.attr("x", function (d, i) { return xScale2(years[i]); })
            .attr("y", function (d, i) { return yScale2(calculateIRRIPercent(i, regionId, data) + calculateELECPercent(i, regionId, data) + calculateDOMPercent(i, regionId, data)); })
            .attr("width", xScale2.bandwidth())
            .attr("height", function (d, i) { return height2 - yScale2(calculateIRRIPercent(i, regionId, data)); })
            .attr("fill", paletteConsumptions(2))
            .attr("opacity", "0.7")
            .attr("stroke", "black")
            .attr("stroke-width", "0");
        barsAVAIL2.exit().remove();
        var barsAVAIL2 = g2.selectAll(".bar5")
            .data(data.features[0].properties.ELEC)
            .enter().append("rect")
            .attr("class", "bar");

        barsAVAIL2.attr("x", function (d, i) { return xScale2(years[i]); })
            .attr("y", function (d, i) { return yScale2(calculateLIVEPercent(i, regionId, data) + calculateIRRIPercent(i, regionId, data) + calculateELECPercent(i, regionId, data) + calculateDOMPercent(i, regionId, data)); })
            .attr("width", xScale2.bandwidth())
            .attr("height", function (d, i) { return height2 - yScale2(calculateLIVEPercent(i, regionId, data)); })
            .attr("fill", paletteConsumptions(3))
            .attr("opacity", "0.7")
            .attr("stroke", "black")
            .attr("stroke-width", "0");
        barsAVAIL2.exit().remove();
        var barsAVAIL2 = g2.selectAll(".bar6")
            .data(data.features[0].properties.ELEC)
            .enter().append("rect")
            .attr("class", "bar");

        barsAVAIL2.attr("x", function (d, i) { return xScale2(years[i]); })
            .attr("y", function (d, i) { return yScale2(calculateMANPercent(i, regionId, data) + calculateLIVEPercent(i, regionId, data) + calculateIRRIPercent(i, regionId, data) + calculateELECPercent(i, regionId, data) + calculateDOMPercent(i, regionId, data)); })
            .attr("width", xScale2.bandwidth())
            .attr("height", function (d, i) { return height2 - yScale2(calculateMANPercent(i, regionId, data)); })
            .attr("fill", paletteConsumptions(4))
            .attr("opacity", "0.7")
            .attr("stroke", "black")
            .attr("stroke-width", "0");
        barsAVAIL2.exit().remove();
    });
}

function updateStackedBarChart(regions, yearIndex, layers, colors) {
    const bar_height = 20;
    const padding = 10;
    var totals = [];
    const ommitedKeyNumber = 2;
    const g = d3.select('#datasvg').select('g');

 

    var keys = d3.keys(regions[0].properties).slice(ommitedKeyNumber);

    const margin = { top: 40, bottom: 10, left: 150, right: 20 };
    const width = 800 - margin.left - margin.right;
    const total_width = 1200 - margin.left - margin.right;
    const height = (bar_height + padding) * (keys.length+1) - margin.top - margin.bottom;

    var measurements = ['people', 'm^3/year', 'km^3/year', 'km^3/year', 'km^3/year', 'km^3/year', 'km^3/year', 'km^3/year', 'm^3/capita']
    const yscale = d3.scaleBand().rangeRound([padding, height]).paddingInner(padding);
    if (g.select('#yaxis').empty()) {
        const yaxis = d3.axisLeft().scale(yscale);
        const g_yaxis = g.append('g').attr('id', 'yaxis');
        yscale.domain(['Population', 'Availability', 'Total consumption', 'Domestic consumption', 'Electric consumption', 'Irrigation consumption', 'Livestock consumption', 'Manufacturing consumption', 'Shortage']);
        g_yaxis.call(yaxis);
    }

    const totalscale = d3.scaleBand().rangeRound([padding, height]).paddingInner(padding);

    const xscale = d3.scaleLinear().range([padding, width - padding]).domain([0, 100]);
    const xaxis = d3.axisTop().scale(xscale);
    if (g.select('#xaxis').empty()) {
        const g_xaxis = g.append('g').attr('id', 'xaxis');
        g_xaxis.call(xaxis);
    }

    if (g.select('#xlabel').empty()) {
        const xlabel = g.append('g').attr('id', 'xabel') .attr("transform", "translate(-50," + -10 + ")")
        .append("text")
        .attr("y", 0)
        .attr("x", 0)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .attr("font-size", "14px")
        .text("Features");
    }

    
    if (g.select('#ylabel').empty()) {
        const ylabel = g.append('g').attr('id', 'yabel') .attr("transform", "translate(325,-30)")
        .append("text")
        .attr("y", 0)
        .attr("x", 0)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .attr("font-size", "14px")
        .text("%");
    }

    if (g.select('#totallabel').empty()) {
        const totallabel = g.append('g').attr('id', 'yabel') .attr("transform", "translate(750,-10)")
        .append("text")
        .attr("y", 0)
        .attr("x", 0)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .attr("font-size", "14px")
        .text("Total");
    }

    for (const key in keys) {
        data = [];
        regions.forEach((region) => {
            var allData = region.properties[keys[key]].replace('[', '').replace(']', '').split(',');
            data.push([region.properties.id, allData[yearIndex]]);
        });
        var sumData = d3.sum(data, (x) => +x[1]);
        const bar_width = d3.scaleLinear().range([0, width - margin.right]).domain([0, sumData]);
        if(key === 1){
            sumData = sumData  / 1000000000;
        }
        console.log(key);
        totals.push(sumData + ' ' + measurements[key]);

        createStackedBarChart(g, data, key, measurements[key], layers, colors, bar_height, bar_width, padding,keys);
    }

    totalscale.domain(totals);
    const totalaxis = d3.axisRight().scale(totalscale);
    if (!g.select('g#totalaxis').empty()) {
        g.select('g#totalaxis').remove();
        console.log(totals.length)
    }

    const g_totalaxis = g.append('g').attr('id', 'totalaxis');
    g_totalaxis.attr("transform", `translate(${width},0)`).call(totalaxis);
}

function createStackedBarChart(g, data, number, measurement = 'km^3/year', layers, colors, bar_height, bar_width, padding,keys) {
    var scaleX = 10;

    d3.select('#stackedBarChart').selectAll('#rect' + number)
        .data(data)
        .join((enter) => {
            const rect_enter = enter.append('rect').attr('id', 'rect' + number);
            rect_enter.append('title');
            return rect_enter;
        },
            (update) => {
                
                d3.selectAll('#rect' + number)
                    .attr('fill', (d, i) => colors[d[0]])
                    .attr('x', (d, i) => { const position = scaleX; scaleX = scaleX + bar_width(d[1]); return position; })
                    .attr('height', bar_height)
                    .attr('width', (d, i) => bar_width(d[1]))
                    .attr('y', number * (bar_height + padding))
                    .on("mouseover", function (d, i) {
                        //POPUP
                        div.transition()
                            .duration(200)
                            .style("opacity", .9);
              
                        div.html(layers[d[0]] + ": " + d[1] + ' ' + measurement+"<br/>")
                            .style("left", (d3.event.pageX + 5) + "px")
                            .style("top", (d3.event.pageY - 60) + "px")
                            .style("width",  "200px")
                            .style("height", "30px");
                    }).on("mousemove", function (d, i) {
                        //POPUP
                        div
                            .style("left", (d3.event.pageX + 5) + "px")
                            .style("top", (d3.event.pageY - 40) + "px");
                    })
                    .on("mouseout", function (d, i) {
                        div.transition()
                            .duration(500)
                            .style("opacity", 0);
                    });

               // g.selectAll('#rect'+number).selectAll('title')
                   // .text((d, i) => keys[number]+" "+layers[d[0]] + ": " + d[1] + ' ' + measurement);
            },
            (exit) => exit.remove()
        );
}

function calculateSHORT(yearIndex, data) {
    return (data.features[0].properties.SHORT[yearIndex] +
        data.features[1].properties.SHORT[yearIndex] +
        data.features[2].properties.SHORT[yearIndex] +
        data.features[3].properties.SHORT[yearIndex] +
        data.features[4].properties.SHORT[yearIndex] +
        data.features[5].properties.SHORT[yearIndex] +
        data.features[6].properties.SHORT[yearIndex] +
        data.features[7].properties.SHORT[yearIndex])/1000000000;
}

function calculateDOMPercent(yearIndex, regionIndex, data) {

    return ((data.features[regionIndex].properties.DOM[yearIndex]) / calculateSum(yearIndex, regionIndex, data)) * 100;
}
function calculateELECPercent(yearIndex, regionIndex, data) {

    return ((data.features[regionIndex].properties.ELEC[yearIndex]) / calculateSum(yearIndex, regionIndex, data)) * 100;
}

function calculateIRRIPercent(yearIndex, regionIndex, data) {

    return ((data.features[regionIndex].properties.IRRI[yearIndex]) / calculateSum(yearIndex, regionIndex, data)) * 100;
}

function calculateLIVEPercent(yearIndex, regionIndex, data) {

    return ((data.features[regionIndex].properties.LIVE[yearIndex]) / calculateSum(yearIndex, regionIndex, data)) * 100;
}

function calculateMANPercent(yearIndex, regionIndex, data) {

    return ((data.features[regionIndex].properties.MAN[yearIndex]) / calculateSum(yearIndex, regionIndex, data)) * 100;
}

function calculateSum(yearIndex, regionIndex, data) {

    return (data.features[regionIndex].properties.DOM[yearIndex])
        + (data.features[regionIndex].properties.ELEC[yearIndex])
        + (data.features[regionIndex].properties.IRRI[yearIndex])
        + (data.features[regionIndex].properties.LIVE[yearIndex])
        + (data.features[regionIndex].properties.MAN[yearIndex]);
}