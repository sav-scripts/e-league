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

            dic["/Box1"] = new FlashLine($boxContainer.find("#box-1-effects"), {r:234, g: 225, b: 4}, {r:254, g:245, b:4, a:1}, 150);
            dic["/Box2"] = new FlashLine($boxContainer.find("#box-2-effects"), {r:236, g: 99, b: 37}, {r:255, g:135, b:60, a:1}, -171);
            dic["/Box3"] = new FlashLine($boxContainer.find("#box-3-effects"), {r:122, g: 182, b: 44}, {r:142, g:202, b:64, a:1}, 0);
            
            return dic;
        }
    };

    var _lineHeight = 10,
        _lineGapY = 5;

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

        self._$shapes = [];

        createShapes(self, flashColor, ySkew, yOffset);
        self._backgroundTl = setupBackground($container, color, flashColor);
        //setupWhiteFlash($container, self);

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

        _$shapes: undefined,
        _backgroundTl: undefined,
        _whiteTl: undefined,

        startPlay: function()
        {
            var self = this;
            if(self._isPlaying) return;
            self._isPlaying = true;

            if(self._whiteTl)
            {
                self._whiteTl.restart();
            }

            for(i=0;i<self._$shapes.length;i++)
            {
                var $shape = self._$shapes[i];
                $shape._tl.resume();
                $shape.css("display", "block");
            }
            self._backgroundTl.restart();
        },

        stopPlay: function()
        {
            var self = this;
            if(!self._isPlaying) return;
            self._isPlaying = false;


            for(i=0;i<self._$shapes.length;i++)
            {
                var $shape = self._$shapes[i];
                $shape._tl.pause();
                $shape.css("display", "none");
            }
            self._backgroundTl.pause();

        }
    };

    function createShapes(flashLine, color, ySkew)
    {
        var startY = -30,
            maxY = flashLine._height;

        //console.log(color);

        while(startY < maxY)
        {
            var $shape = createShape(startY - ySkew, flashLine._width, _lineHeight, color, ySkew);

            flashLine._$graphicContainer.append($shape);
            //flashLine._$container.append($shape);

            flashLine._$shapes.push($shape);

            startY += _lineGapY;
        }
    }

    function createShape(initY, width, height, color, ySkew)
    {
        var $shape = $(document.createElementNS('http://www.w3.org/2000/svg', 'polygon')),
            dy = 0,
            x0 = 0,
            y0 = initY + dy,
            x1 = width,
            y1 = y0 + ySkew + dy,
            x2 = width,
            y2 = y0 + height + ySkew,
            x3 = 0,
            y3 = y0 + height;

        $shape.attr("points", x0 + ","+y0+" "+x1+","+y1+" "+x2+","+y2+" "+x3+","+y3);
        $shape.attr("fill", "rgba("+color.r+", "+color.g+", "+color.b+", "+color.a+")");
        //$shape.attr("fill", "rgba(255, 0, 0, .5)");

        var tweenObj = {height: height};
        var tl = new TimelineMax({repeat:-1, yoyo: true}),
            duration = .2 + Math.random() * .1;

        tl.to(tweenObj, duration, {height: 0, onUpdate: function()
        {
            dy = height - tweenObj.height * .5;


            x0 = 0;
            y0 = initY + dy;
            x1 = width;
            y1 = y0 + ySkew + dy;
            x2 = width;
            y2 = y0 + tweenObj.height + ySkew;
            x3 = 0;
            y3 = y0 + tweenObj.height;

            //$shape.attr("points", startX + ","+startY+" "+endX+","+startY+" "+endX+","+endY+" "+startX+","+endY);
            $shape.attr("points", x0 + ","+y0+" "+x1+","+y1+" "+x2+","+y2+" "+x3+","+y3);
        }});


        tl.progress(Math.random());

        tl.pause();

        $shape._tl = tl;

        $shape.css("display", "none");

        return $shape;
    }

    function setupBackground($container, color)
    {
        var $bg = $container.find(".bg");

        var tl = new TimelineMax({repeat:-1});

        tl.add(function()
        {
            var r = color.r,
                g = color.g,
                b = color.b,
                range = 10,
                offset = -range * .5;


            r = intRandom(r, offset, range, 0, 255);
            g = intRandom(g, offset, range, 0, 255);
            b = intRandom(b, offset, range, 0, 255);


            var string = "rgba("+r+", "+g+", "+b+", 1)";
            TweenMax.set($bg, {fill:string});

        },.1);

        tl.pause();

        return tl;
    }

    function setupBackground2($container, color1, color2)
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

    function setupWhiteFlash($container, flashLine)
    {
        var $dom = $container.parent().find(".white-content");

        if($dom.length > 0)
        {
            var tl = new TimelineMax;
            tl.set($dom, {autoAlpha: 0});
            tl.to($dom,.1, {autoAlpha: 1, ease:Power3.easeOut});
            tl.to($dom,.3, {autoAlpha:0, ease:Power3.easeIn});

            tl.pause();

            flashLine._whiteTl = tl;
        }
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