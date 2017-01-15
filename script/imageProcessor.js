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
    var _width  = _option.width;
    var _height = _option.height;

    var r = Math.min(_width, _height) / 2;

    function ConvertWHtoXYZ(wh){ 
        return { 
            x: wh.w - Math.floor(_width / 2), 
            y: wh.h - Math.floor(_height / 2), 
            z: r 
        };
    }
    function ConvertXYZtoWH(xyz){ 
        return { 
            w: xyz.x + Math.floor(_width / 2), 
            h: xyz.y + Math.floor(_height / 2)
        };
    }
    function ConvertWHtoIndex(wh){
        return (wh.h * _width + wh.w) * 4;
    }
    function ConvertIndextoWH(i){ 
        return {
            w: (i / 4) % _width,
            h: Math.floor((i / 4) / _width)
        };
    }
    function f(xyz){
        var length = Math.sqrt(xyz.x*xyz.x + xyz.y*xyz.y + xyz.z*xyz.z);
        return {
            x: xyz.x * (r/length),
            y: xyz.y * (r/length),
            z: xyz.z * (r/length)
        };
    }

    for (var i = 0; i < _i_d.length; i+=4) {
        _o_d[i]   = 0; 
        _o_d[i+1] = 0;
        _o_d[i+2] = 0; 
        _o_d[i+3] = 255;
    }
    for (var i = 0; i < _i_d.length; i+=4) {
        // default initialize with black pixel
        var o_i = ConvertWHtoIndex(ConvertXYZtoWH(f(ConvertWHtoXYZ(ConvertIndextoWH(i)))));
        
        _o_d[o_i]     = _i_d[i];
        _o_d[o_i + 1] = _i_d[i + 1];
        _o_d[o_i + 2] = _i_d[i + 2];
    }
}