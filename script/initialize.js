
var EditMode = [
    {"name": "Normal", "function": Normal},
    {"name": "GrayScale", "function": GrayScale},
    {"name": "Binalize", "function": Binalize},
    {"name": "Fish eye", "function": FishEye}
];

$(function(){
    // initialize layout
    $("#initial_view").css("display", "table");
    $("#default_view").css("display", "none");
});