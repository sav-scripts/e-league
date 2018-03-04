/**
 * Created by sav on 2018/2/27.
 */
(function(){

    var $questionList = [];

    var self = window.QuestionControl =
    {
        init: function()
        {
            var $questionContainer = $("#question-container");

            setupGroup(1, 3);
            setupGroup(2, 7);

            function setupGroup(groupIndex, numQuestions)
            {
                for(var i=1;i<=numQuestions;i++){ setupOne(groupIndex, i); }
            }


            function setupOne(groupIndex, index)
            {
                var $group = $questionContainer.find(".group-" + groupIndex);

                var $question = $group.find(".question-" + index),
                    $questionPart = $question.find(".question-part"),
                    $answerPart = $question.find(".answer-part");

                //console.log($question.length);

                var isOpen = false;

                //console.log("g " + groupIndex + " q " + index + " height: " + answerHeight);



                $questionPart.on(_CLICK_, function()
                {
                    switchBox();
                });

                $questionList.push($question);

                $question._switchBox = switchBox;
                $question._fetchHeight = fetchHeight;
                $question._heightSetting = [0, 0];

                //switchBox();

                function fetchHeight()
                {
                    var vpIndex = Main.viewport.index;

                    if($question._heightSetting[vpIndex] > 0) return;

                    $question.toggleClass("open-mode", true);
                    $answerPart.css("height", "");

                    $question._heightSetting[vpIndex] = $answerPart.height();

                    $question.toggleClass("open-mode", false);
                }

                function switchBox(justUpdate)
                {
                    if(!justUpdate)
                    {
                        isOpen = !isOpen;
                    }

                    var vpIndex = Main.viewport.index;

                    //console.log(answerHeight);

                    if(isOpen)
                    {
                        $question.toggleClass("open-mode", true);
                        $answerPart.css("height", $question._heightSetting[vpIndex]);
                    }
                    else
                    {
                        $question.toggleClass("open-mode", false);
                        $answerPart.css("height", '');
                    }
                }

            }
        },

        onResize: function()
        {
            var vp = Main.viewport;
            if(vp.changed)
            {
                TweenMax.delayedCall(.1, function()
                {
                    var i;
                    for(i=0;i<$questionList.length;i++)
                    {
                        var $question = $questionList[i];
                        $question._fetchHeight();
                        $question._switchBox(true);
                    }
                });
            }
        }
    };

}());