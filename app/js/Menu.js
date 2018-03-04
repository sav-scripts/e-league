/**
 * Created by sav on 2018/2/27.
 */
(function(){

    var $doms = {},
        _isMobileOpen = false;

    var self = window.Menu =
    {
        init: function()
        {
            setupPcAndButtons();
            setupMobile();

            function setupPcAndButtons()
            {
                $doms.container = $("#menu");
                var $buttonContainer = $doms.container.find(".button-group"),
                    $pcButtons = {};

                $pcButtons.package = $buttonContainer.find(".button:nth-child(1)").on(_CLICK_, function(event)
                {
                    event.preventDefault();

                    closeMobile();
                });

                $pcButtons.goodEvent = $buttonContainer.find(".button:nth-child(3)").on(_CLICK_, function(event)
                {
                    event.preventDefault();

                    closeMobile();
                });

                $pcButtons.qAndA = $buttonContainer.find(".button:nth-child(5)").on(_CLICK_, function(event)
                {
                    event.preventDefault();

                    PageControl.toSection("/QandA");

                    closeMobile();
                });

                $pcButtons.doSearch = $buttonContainer.find(".button:nth-child(7)").on(_CLICK_, function(event)
                {
                    event.preventDefault();

                    closeMobile();
                });

                $pcButtons.toIntro = $buttonContainer.find(".button:nth-child(9)").on(_CLICK_, function(event)
                {
                    event.preventDefault();

                    PageControl.toSection("/Intro");

                    closeMobile();
                });


            }

            function setupMobile()
            {
                var $container = $doms.mobileContainer = $doms.container.find(".mobile-button-container"),
                    $trigger = $doms.container.find(".trigger");

                $container.on(_CLICK_, function(event)
                {
                    //event.preventDefault();
                    //event.stopPropagation();

                    //console.log(event.target === $container[0]);

                    //if($container.has(event.target).length || event.target === $container[0])
                    //{
                    //    event.stopPropagation();
                    //}

                    if(event.target === $container[0])
                    {
                        closeMobile();
                    }
                });

                $container.on("touchmove", function(event)
                {
                    event.preventDefault();
                });

                //$container.css("display", "none").css("visibility", "visible");

                $trigger.on(_CLICK_, function(event)
                {
                    event.preventDefault();

                    openMobile();
                });
            }
        }
    };

    function openMobile()
    {
        if(_isMobileOpen) return;
        _isMobileOpen = true;

        //$doms.mobileContainer.css("display", "block");
        $doms.mobileContainer.toggleClass("open-mode", true);
    }

    function closeMobile()
    {
        if(!_isMobileOpen) return;
        _isMobileOpen = false;

        //$doms.mobileContainer.css("display", "none");
        $doms.mobileContainer.toggleClass("open-mode", false);
    }

}());