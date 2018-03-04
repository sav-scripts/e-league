/**
 * Created by sav on 2018/3/3.
 */
(function(){
    
    window.FlashLineManager = 
    {
        init: function()
        {
            var $boxContainer = $("#box-container"),
                dic = {};

            dic["/Box1"] = new FlashLine($boxContainer.find("#box-1-effects"), {r:0, g: 0, b: 0}, {r:254, g:245, b:4, a:1}, 150);
            dic["/Box2"] = new FlashLine($boxContainer.find("#box-2-effects"), {r:255, g: 255, b: 255}, {r:255, g:135, b:60, a:1}, -171);
            dic["/Box3"] = new FlashLine($boxContainer.find("#box-3-effects"), {r:255, g: 255, b: 255}, {r:142, g:202, b:64, a:1}, 0);
            dic["/Box4"] = new FlashLine($boxContainer.find("#box-4-effects"), {r:255, g: 255, b: 255}, {r:0, g:1, b:1, a:1}, 0);
            dic["/Box5"] = new FlashLine($boxContainer.find("#box-5-effects"), {r:255, g: 255, b: 255}, {r:254, g:180, b:2, a:1}, 0);

            return dic;
        }
    };

    window.FlashLine = FlashLine;

    function FlashLine($container, color, flashColor, ySkew, yOffset, yBleed)
    {
        var self = this;
        self._$container = $container;
        self._$graphicContainer = $container.find(".graphic-container");

        self._width = parseInt($container.attr("width"));
        self._height = parseInt($container.attr("height"));

        if(yOffset !== undefined) self._yOffset = yOffset;
        if(yBleed !== undefined) self._height += yBleed;

        self._backgroundTl = setupBackground($container, color, flashColor);

        //self.startPlay();
    }

    FlashLine.prototype =
    {
        _width: 0,
        _height: 0,
        _yOffset: 0,
        _$container: undefined,
        _$graphicContainer: undefined,

        _isPlaying: false,

        _backgroundTl: undefined,

        startPlay: function()
        {
            var self = this;
            if(self._isPlaying) return;
            self._isPlaying = true;

            self._backgroundTl.restart();
        },

        stopPlay: function()
        {
            var self = this;
            if(!self._isPlaying) return;
            self._isPlaying = false;

        }
    };

    function setupBackground($container, color1, color2)
    {
        var $bg = $container.find(".bg");

        var tweenObj = {progress:0};

        var tl = new TimelineMax({yoyo:true});

        tl.to(tweenObj,1.6, {progress: 1, ease:Power3.easeOut, onUpdate: function()
        {
            var p = tweenObj.progress,
                r = parseInt((color2.r - color1.r)*p + color1.r),
                g = parseInt((color2.g - color1.g)*p + color1.g),
                b = parseInt((color2.b - color1.b)*p + color1.b);

            var string = "rgba("+r+", "+g+", "+b+", 1)";
            $bg.attr("fill", string);

        }});

        tl.pause();

        return tl;
    }

    /* common */
    function intRandom(start, offset, range, minValue, maxValue)
    {
        var v = parseInt(start + offset + (Math.random() * range));

        if(minValue !== undefined)
        {
            v = Math.max(v, minValue);
        }

        if(maxValue !== undefined)
        {
            v = Math.min(v, maxValue);
        }

        return v;
    }

}());