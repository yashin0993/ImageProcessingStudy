// default
function Normal(_i_d, _o_d, _option){
    for (var i = 0; i < _i_d.length; i+=4) {
        _o_d[i]   = _i_d[i]  
        _o_d[i+1] = _i_d[i+1]
        _o_d[i+2] = _i_d[i+2]
        _o_d[i+3] = _i_d[i+3]
    }
}

// grayscale
function GrayScale(_i_d, _o_d, _option){
    for (var i = 0; i < _i_d.length; i+=4) {
        var g = _i_d[i] * 0.2126 + _i_d[i+1] * 0.7152 + _i_d[i+2] * 0.0722;
        _o_d[i] = _o_d[i+1] = _o_d[i+2] = g;
        _o_d[i+3] = 255;
    }
} 

// binalize
function Binalize(_i_d, _o_d, _option){
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

//fish eye
function FishEye(_i_d, _o_d, _option){
    var _width     = _option.width;
    var _height    = _option.height;
    var defaultFOV = 50;
    var fishFOV    = 45;
    var r          = _height / 2 * Math.tan(defaultFOV * (Math.PI/180));
    var D          = 2 / r;
    // var targetArea = (_width < _height) ? _width / 2 : _height / 2;
    // var cW = _width / 2;
    // var cH = _height / 2;
    
    for (var i = 0; i < _i_d.length; i+=4) {
        // default initialize with black pixel
        _o_d[i] = _o_d[i+1] = _o_d[i+2] = 0; 
        _o_d[i+3] = 255;
        var i_w = (i / 4) % _width;
        var i_h = ((i / 4) - i_w) / _width;
        var r_w   = i_w / (2 * Math.tan(defaultFOV * (Math.PI/180)));
        var r_h   = i_h / (2 * Math.tan(defaultFOV * (Math.PI/180)));
        var o_w = Math.floor(r_w*(i_w-_width/2)/Math.sqrt(D*D+(i_w-_width/2)*(i_w-_width/2)+(i_h-_height/2)*(i_h-_height/2)) + _width/2);
        var o_h = Math.floor(r_h*(i_h-_height/2)/Math.sqrt(D*D+(i_w-_width/2)*(i_w-_width/2)+(i_h-_height/2)*(i_h-_height/2)) + _height/2);
        var o_i = (o_h * _width + o_w) * 4; 

        if (o_w >= 0 && o_w < _width && o_h >= 0 && o_h < _height) {
            _o_d[o_i] = _i_d[i];
            _o_d[o_i + 1] = _i_d[i + 1];
            _o_d[o_i + 2] = _i_d[i + 2];
        } else {
            _o_d[o_i] = _o_d[o_i + 1] = _o_d[o_i + 2] = 0;
        }
        // //do process to target pixel. 
        // if((cW - targetArea <= w) && (w < cW + targetArea) &&
        //    (cH - targetArea <= h) && (h < cH + targetArea)){
               

        // }

    }
}