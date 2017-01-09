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
    var copyData    = [].concat(orgPixelData)[0];
    EditMode[idx].function(copyData, imageData.data);
    context.putImageData(imageData,0,0);
    $("#main_img").prop("src", canvas.toDataURL());
}

function Normal(_i_d, _o_d){
    for (var i = 0; i < _i_d.length; i+=4) {
        _o_d[i]   = _i_d[i]  
        _o_d[i+1] = _i_d[i+1]
        _o_d[i+2] = _i_d[i+2]
        _o_d[i+3] = _i_d[i+3]
    }
}

function GrayScale(_i_d, _o_d){
    for (var i = 0; i < _i_d.length; i+=4) {
        var g = _i_d[i] * 0.2126 + _i_d[i+1] * 0.7152 + _i_d[i+2] * 0.0722;
        _o_d[i] = _o_d[i+1] = _o_d[i+2] = g;
        _o_d[i+3] = 255;
    }
} 

function Binalize(_i_d, _o_d){
    for (var i = 0; i < _i_d.length; i+=4) {
        var g = _i_d[i] * 0.2126 + _i_d[i+1] * 0.7152 +_i_d[i+2] * 0.0722;
        if(g < 255/2){
            _o_d[i] = _o_d[i+1] = _o_d[i+2] = 0;
        }else{
            _o_d[i] = _o_d[i+1] = _o_d[i+2] = 255;
        }
        _o_d[i+3] = 255;
    }
} 

function SetThumbnail(){
    var canvas      = document.getElementById("thumbnail_canvas");
    var context     = canvas.getContext('2d');
    var orgWidth    = img.width;
    var orgHeight   = img.height;

    var dstSize = GetDstSize(orgWidth, orgHeight);
    canvas.width    = dstSize.width;
    canvas.height   = dstSize.height;
    context.drawImage(img,0,0,orgWidth,orgHeight,0,0,dstSize.width,dstSize.height);
    var imageData   = context.getImageData(0,0,dstSize.width,dstSize.height);
    var orgd        = [].concat(imageData.data)[0];
    var htmlStr     = ""

    for(var i=0; i<EditMode.length; ++i){
        imageData.data = orgd;
        EditMode[i].function(orgd, imageData.data);
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