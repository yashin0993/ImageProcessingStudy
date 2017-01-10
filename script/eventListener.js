
$(".select-btn").on("click",function(){
    $("#ofd").click();
});

// input
$("#ofd").on("change", function(){
    var file = this.files[0];
    if(null == file) return;
    
    // set filename to input
    $("#filename").val(file.name);

    // Switch initial display with default display
    $("#initial_view").css("display", "none");
    $("#default_view").css("display", "flex");

    
    SetImageToCanvas(file);
});

function ModeClick(idx){
    FilterImage(idx);
}

$(document).on('drop', function (e)
{
    e.stopPropagation();
    e.preventDefault();
});

var rect = document.getElementById('select_rect');
var previewWindow = document.getElementById('preview_window');
rect.addEventListener("dragover", function(e){
    DragOver(e);
});
previewWindow.addEventListener("dragover", function(e){
    DragOver(e);
});

rect.addEventListener("drop", function(e){
    DropImage(e);
});

previewWindow.addEventListener("drop", function(e){
    DropImage(e);
});

function DragOver(e){
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function DropImage(e){
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files; // FileList object.
    var file = files[0];
    if(null == file) return;
    
    // set filename to input
    $("#filename").val(file.name);

    // Switch initial display with default display
    $("#initial_view").css("display", "none");
    $("#default_view").css("display", "flex");

    SetImageToCanvas(file);
}
