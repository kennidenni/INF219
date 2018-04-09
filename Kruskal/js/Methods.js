///<reference path="graphUI.ts"/>
///<reference path="Controller.ts"/>
///<reference path="View.ts"/>
///<reference path="KruskalAlgorithm".ts"/>
///<reference path="exampleGraphs".ts"/>
var randomWeight = 0;
var nodes = 0;
var MAX_NODES = 10;
var edges = 0;
/*
function setOnClickListener () {
    $('#my_button').on('click', function(){
        console.log('Button clicked. Disabling...');
        $('#my_button').attr("disabled", true);
    });

    console.log("assip");
}

setOnClickListener();
*/
function highlightThisEdge(index) {
    $("#edge" + index).css({ "stroke": "rgb(16, 130, 219)", "stroke-width": "6" });
}
function dehighlightThisEdge(index) {
    $("#edge" + index).css({ "stroke": "rgb(0, 0, 0)", "stroke-width": "2" });
}
function removeEdge(index) {
    $("#edge" + index).remove();
    $("#edgeWeight" + index).remove();
}
function transparentEdge(index) {
    $("#edge" + index).css({ "opacity": 0.15 });
    $("#edgeWeight" + index).css({ "opacity": 0.15 });
}
function detransparentEdge(index) {
    $("#edge" + index).css({ "opacity": 1 });
    $("#edgeWeight" + index).css({ "opacity": 1 });
}
function addThisNode(x, y) {
    if (nodes < MAX_NODES) {
        addNode(nodes, x, y);
        nodes++;
    }
}
function selectNodes(n1, n2, select) {
    if (select == true) {
        $("#node" + n1).addClass("selected");
        $("#node" + n2).addClass("selected");
    }
    else {
        $("#node" + n1).removeClass("selected");
        $("#node" + n2).removeClass("selected");
    }
}
function connectNodes(node1, node2) {
    randomWeight = Math.floor(Math.random() * 10) + 1;
    addWeightedEdge(edges++, node1, node2, randomWeight);
}
function disableButton() {
    $("#start").attr({ disabled: "true" });
    $("#start").css({ "opacity": 0.15 });
}
function enableButton() {
    $("#start").removeAttr('disabled');
    $("#start").css({ "opacity": 1 });
}
function numberOfNodes(value) {
    console.log("Value: " + value);
    viewer.resetAll();
    drawGraph(value);
}
function drawGraph(n) {
    console.log("number" + n);
    $("#edgeTable").empty();
    viewer.resetAll(); //Not working, button must reset
    switch (+n) {
        case 3:
            graph3();
            break;
        case 4:
            graph4();
            break;
        case 5:
            graph5();
            break;
        case 6:
            graph6();
            break;
        case 7:
            graph7();
            break;
        case 8:
            graph8();
            break;
        case 9:
            graph9();
            break;
        case 10:
            graph10();
            break;
        default:
            graph3();
            break;
    }
}
function writeEdge(i, node1, node2, weight) {
    if (i != undefined && node1 != undefined && node2 != undefined && weight != undefined) {
        $("#edgeTable").append("<li id='edgeElem" + i + "'>" +
            "<div class='content' id='edgeContent" + i + "'>" +
            "Node [" + node1 + "]  " +
            "Node [" + node2 + "]  " +
            "      Weight: " + weight + "</div></li>");
    }
}
function writeTotalWeight(weight) {
    $("#totalWeight").empty();
    $("#totalWeight").append("<p> Total weight: " + weight + " </p>");
}
function clearTotalWeight() {
    $("#totalWeight").empty();
    $("#totalWeight").append("<p> Total weight: 0 </p>");
}
function excludeEdgeText(i) {
    $("#edgeContent" + i).css({ "opacity": 0.2 });
    $("#edgeContent" + i).css({ "color": "black" });
}
function higlightEdgeText(i) {
    $("#edgeContent" + i).css({ "color": "blue" });
}
function swapTwoElements(i, j) {
    var a = document.getElementById("edgeContent" + i);
    var b = document.getElementById("edgeContent" + j);
    a.parentNode.insertBefore(b, a);
}
