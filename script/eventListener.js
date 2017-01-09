
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