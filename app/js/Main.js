(function(){

    "use strict";
    var self = window.Main =
    {
        viewport:
        {
            width: 0,
            height: 0,
            ranges: [640],
            index: -1,
            changed: false
        },

        init: function()
        {
            window._CLICK_ = 'click';

            Menu.init();
            PageControl.init();
            QuestionControl.init();

            Animator.init();
            Animator.playIntro();

            $(window).on("resize", onResize);
            onResize();
        }
    };

    function onResize()
    {
        var width = $(window).width(),
            height = $(window).height();



        var vp = self.viewport;
        vp.width = width;
        vp.height = height;

        var oldIndex = vp.index;

        if(vp.width <= vp.ranges[0])
        {
            vp.index = 0;
        }
        else
        {
            vp.index = 1;
        }

        vp.changed = oldIndex !== vp.index;

        PageControl.onResize();
        QuestionControl.onResize();
        Animator.onResize();
    }

}());
