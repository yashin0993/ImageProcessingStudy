var orgPixelData;
function SetImageToCanvas(_file){
    //Load file in dataURL format
    var reader = new FileReader();
    reader.readAsDataURL(_file);

    // The process of finish to load image data
    reader.onload = function(){
        img = new Image();
        img.onload = function(){
            // Set image to canvas
            var canvas      = document.getElementById("image_canvas");
            var context     = canvas.getContext('2d');
            var width       = img.width;
            var height      = img.height;
            var fullSize    = GetFullSize(width, height);
            canvas.width    = fullSize.width;
            canvas.height   = fullSize.height;
            context.drawImage(img, 0, 0, fullSize.width, fullSize.height);
            var imageData   = context.getImageData(0, 0, fullSize.width, fullSize.height);
            orgPixelData    = null;
            orgPixelData    = imageData.data;
            $("#main_img").prop("src", canvas.toDataURL());

            SetThumbnail();
        }
        //Set loaded image data
        img.src = reader.result;
    }
}

function FilterImage(idx){
    var canvas      = document.getElementById("image_canvas");
    var context     = canvas.getContext('2d');
    var imageData   = context.createImageData(canvas.width, canvas.height);
    var copyData    = [].concat([{"copy":orgPixelData}])[0].copy;
    var option      = {"width": canvas.width, "height":canvas.height};
    EditMode[idx].function(copyData, imageData.data, option);
    context.putImageData(imageData,0,0);
    $("#main_img").prop("src", canvas.toDataURL());
}

function SetThumbnail(){
    var canvas       = document.getElementById("thumbnail_canvas");
    var context      = canvas.getContext('2d');
    var dstSize      = GetDstSize(img.width, img.height);
    canvas.width     = dstSize.width;
    canvas.height    = dstSize.height;
    context.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);
    var orgImageData = context.getImageData(0,0,canvas.width,canvas.height);
    var copyData     = [].concat([{"copy":orgImageData.data}])[0].copy;
    var imageData    = context.createImageData(canvas.width,canvas.height);
    var htmlStr      = "";
    var option = {"width": canvas.width, "height":canvas.height};

    for(var i=0; i<EditMode.length; ++i){
        //imageData.data = orgd;
        EditMode[i].function(copyData, imageData.data, option);
        context.putImageData(imageData,0,0);
        htmlStr += '<div class="thumbnail-wrap">' + 
                   '<img src="' + canvas.toDataURL() + '" onClick="ModeClick(' + i + ')"></img>' + 
                   '<div class="default-text">' + EditMode[i].name + '</div></div>';
    }

    var bottom = d3.select("#bottom_menu");
    bottom.html(htmlStr);
}

function GetFullSize(_width, _height){
    var clientWidth  = $("#preview_window").prop("clientWidth");
    var clientHeight = $("#preview_window").prop("clientHeight");

    var imgType    = (_width / _height < 1) ? 0 : 1;
    var clientType = (clientWidth / clientHeight < 1) ? 0 : 1;

    if(0 == clientType){ // client height is longer than width
        if(_width / _height < clientWidth / clientHeight){
            var width = _width * (clientHeight / _height);
            return {"width":width, "height":clientHeight};
        }
        else{
            var height = _height * (clientWidth / _width);
            return {"width":clientWidth, "height":height}; 
        }
    }
    else{
        if(_width / _height < clientWidth / clientHeight){
            var width = _width * (clientHeight / _height);
            return {"width":width, "height":clientHeight}; 
        }
        else{
            var height = _height * (clientWidth / _width);
            return {"width":clientWidth, "height":height}; 
        }
    }
}

function GetDstSize(_width, _height){
    var heightRate  = 100 / _height; // reference : 100px
    var dstWidth    = _width * heightRate;
    return {"width":dstWidth, "height":100};
}