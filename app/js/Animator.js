/**
 * Created by sav on 2018/2/28.
 */
(function(){

    var _isInit = false,
        $doms = {},
        _boxFlashLines =
        {

        };

    var self = window.Animator =
    {
        init: function()
        {
            $doms.sceneContainer = $("#scene-container");
            $doms.boxContainer = $("#box-container");

            setupIntro();
            setupBtnToQuestionaire();

            _boxFlashLines = FlashLineManager.init();

            _isInit = true;
        },

        playIntro: null,
        playBtnToQuestionaire: null,

        switchBoxAnime: function(anchor, playIt)
        {
            var flashLine = _boxFlashLines[anchor];

            if(flashLine)
            {
                playIt? flashLine.startPlay(): flashLine.stopPlay();
            }
        },

        onResize: function()
        {
            if(!_isInit) return;

            var vp = Main.viewport;

            if(vp.changed)
            {
                for(var i=1;i<=5;i++)
                {
                    var $box = $doms.boxContainer.find("#box-"+i+"-effects"),
                        $g = $box.find(".graphic-container"),
                        string = vp.index === 0? "url(#box-"+i+"-mask-mobile)": "url(#box-"+i+"-mask)";

                    $g.attr("clip-path", string);

                }
            }
        }
    };


    /* KV */
    function setupBtnToQuestionaire()
    {
        var $btn = $doms.sceneContainer.find("#btn-to-questionaire");

        var tl = new TimelineMax;
        tl.set($btn, {y: 30, autoAlpha: 0});
        tl.to($btn,.5, {y: 0, autoAlpha: 1, ease:Power1.easeOut});
        tl.pause();

        self.playBtnToQuestionaire = function()
        {
            tl.restart();
        };
    }

    function setupIntro()
    {
        //RadialBackground.init();

        var $container = $doms.sceneContainer.find("#intro"),
            $heroBlue = $container.find(".hero-blue"),
            $heroPink = $container.find(".hero-pink"),
            $heroGreen = $container.find(".hero-green"),
            $topic = $container.find(".topic"),
            $speedLine = $container.find(".speed-line"),
            $floatContainer = $container.find(".float-container"),
            $background = $container.find(".background");

        var $heroBlueClone = $heroBlue.clone();
        $heroBlue.parent().append($heroBlueClone);

        var heros = [$heroBlue[0], $heroBlueClone[0], $heroPink[0], $heroGreen[0]];

        var heroTopOffset = -50;

        var introTl = new TimelineMax();

        introTl.set($speedLine, {autoAlpha: 0});
        introTl.set($topic, {autoAlpha: 0, marginTop: 50});
        introTl.set($heroBlue, {autoAlpha: 0, marginLeft: 100});
        introTl.set($heroBlueClone, {autoAlpha: 0, marginLeft: -100});
        introTl.set($heroPink, {autoAlpha: 0, marginLeft: 600});
        introTl.set($heroGreen, {autoAlpha: 0, marginLeft: -600});
        introTl.set(heros, {marginTop: heroTopOffset});
        introTl.set($floatContainer, {autoAlpha:1});
        //introTl.set($background, {autoAlpha:0});

        introTl.to($heroPink,.6,{autoAlpha:1, marginLeft: 0, ease:Back.easeOut.config(3)}, 0);
        introTl.to($heroGreen,.6,{autoAlpha:1, marginLeft: 0, ease:Back.easeOut.config(3)},.2);

        var blueStart = .5,
            blueDuration = 1.1;

        introTl.to($heroBlue, blueDuration, {marginLeft: 0, ease:Elastic.easeOut.config(2, 0.7)}, blueStart);
        introTl.to($heroBlueClone, blueDuration, {marginLeft: 0, ease:Elastic.easeOut.config(2, 0.7)}, blueStart);
        introTl.to($heroBlue, blueDuration, {autoAlpha:1}, blueStart);
        introTl.to($heroBlueClone, blueDuration, {autoAlpha:1}, blueStart);
        introTl.set($heroBlueClone, {autoAlpha: 0});

        introTl.to($topic,1, {autoAlpha:1, marginTop: 0, ease:Back.easeInOut.config(5)}, "-=.6");
        introTl.to(heros,1,  {marginTop: 0, ease:Back.easeInOut.config(5)}, "-=1");

        //introTl.to($background,.5, {autoAlpha:1, ease:Power1.easeIn}, "-=.5");

        introTl.to($speedLine,.3, {autoAlpha: 1}, "-=.5");

        introTl.add(function()
        {
            //RadialBackground.fadeIn();
            //RadialBackground.startFlash();

            self.playBtnToQuestionaire();


            var tl5 = new TimelineMax;
            tl5.to($heroPink,.3, { marginTop: -5, ease:Power1.easeOut});

            var tl = new TimelineMax({repeat:-1});
            tl.to($heroPink, 1, { marginTop: 25, ease:Power1.easeInOut});
            tl.to($heroPink, 1, { marginTop: -5, ease:Power1.easeInOut});

            tl5.add(tl);

            var tl2 = new TimelineMax({repeat:-1});
            tl2.to($heroGreen, 1, { marginTop: 30, ease:Power1.easeInOut});
            tl2.to($heroGreen, 1, { marginTop: 0, ease:Power1.easeInOut});

            var tl4 = new TimelineMax;
            tl4.to($heroBlue,.8, { marginTop: 30, ease:Power1.easeOut});

            var tl3 = new TimelineMax({repeat:-1});
            tl3.to($heroBlue, 1, { marginTop: 0, ease:Power1.easeInOut});
            tl3.to($heroBlue, 1, { marginTop: 30, ease:Power1.easeInOut});

            tl4.add(tl3);
        });

        introTl.pause();

        self.playIntro = function()
        {
            introTl.restart();
        };

        //console.log($heroBlue.parent()[0]);

        //$container.on("click", function()
        //{
        //    introTl.restart();
        //});
    }


}());