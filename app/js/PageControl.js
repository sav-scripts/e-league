/**
 * Created by sav on 2018/2/27.
 */
(function(){

    var $doms =
        {
            sections: []
        },
        _sectionDic = {},
        _settings =
        {
            menuHeight: 0
        },
        _lastAnchor;

    var self = window.PageControl =
    {
        init: function()
        {
            var $sceneContainer = $("#scene-container"),
                $boxContainer = $("#box-container");

            addSection("/Intro", $("#intro"), "intro");
            addSection("/QandA", $("#question-container"), "ignore");
            addSection("/Box1", $boxContainer.find(".box-1"), 'box');
            addSection("/Box2", $boxContainer.find(".box-2"), 'box');
            addSection("/Box3", $boxContainer.find(".box-3"), 'box');
            addSection("/Box4", $boxContainer.find(".box-4"), 'box');
            addSection("/Box5", $boxContainer.find(".box-5"), 'box');

            ScrollListener.init().bind(onScrolling);
            ScrollListener.active();

            $(window).scrollTop(0);

            function addSection(anchor, $dom, sectionType)
            {
                _sectionDic[anchor] = $dom[0];
                $doms.sections.push($dom[0]);

                $dom[0]._anchor = anchor;
                $dom[0]._sectionType = sectionType;

            }
        },

        toSection: function(anchor, cb)
        {

            var dom = _sectionDic[anchor];
            if(dom)
            {
                var targetTop = $(dom).offset().top - _settings.menuHeight;

                if(anchor === '/Intro')
                {
                    targetTop = 0;
                }

                ScrollListener.scrollTo(targetTop, cb);

            }
        },

        onResize: function()
        {
            _settings.menuHeight = $("#menu").height();
        }
    };

    function onScrolling()
    {

        var i,
            dom,
            result,
            anchor,
            sectionType;

        var vp = Main.viewport,
            screenMiddle = vp.height * .5;
            //screenMiddle = (vp.height - _settings.menuHeight) * .5 + _settings.menuHeight;

        var oldAnchor = _lastAnchor;

        for(i=0;i<$doms.sections.length;i++)
        {
            dom = $doms.sections[i];
            result = ScrollListener.testDom(dom, screenMiddle);

            if(result.contentInside && dom._sectionType !== "ignore")
            {
                anchor = dom._anchor;
                sectionType = dom._sectionType;
                break;
            }
        }

        //console.log(anchor);

        if(anchor)
        {
            _lastAnchor = anchor;

            //anchor = $doms.sections[$doms.sections.length-1]._anchor;

            //console.log(anchor);

            if(anchor === "/Intro")
            {
                RadialBackground.startFlash();
            }
            else
            {
                RadialBackground.stopFlash();
            }

            if(sectionType === "box")
            {
                Animator.switchBoxAnime(anchor, true);
            }

            if(oldAnchor && oldAnchor !== anchor)
            {
                Animator.switchBoxAnime(oldAnchor, false);
            }
        }

    }

}());