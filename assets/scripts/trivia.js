let theGame = {
    defaultTimer:600,
    timeCnt:0,
    qCountDown: null,
    betweenQTimer: null,
    numCorrect: 0,
    numWrong: 0,
    numUnanswered: 0,
    theQuestions: [],
    curQuestion: {},

    startGame:function(arr){
        this.theQuestions = arr.slice(0);
        this.numCorrect=0;
        this.numWrong=0;
        this.numUnanswered=0;
        this.theQuestions = allQuestions.slice(0);
        this.timeCnt=this.defaultTimer;
        this.loadQuestion();
    },
    loadQuestion:function(){
        //create random number and select question index of the Questions
        let ind = Math.floor(Math.random()*this.theQuestions.length);
        this.curQuestion = this.theQuestions.splice(ind,1)[0];
        //clear feedback answers and set question
        $(`.feedback`).text(``);
        $(`.answerHolder`).html(``);
        $(`.displayQ`).text(this.curQuestion.question);
        //loop through all answers and add to answer holder
        for(let d=0; d<this.curQuestion.ans.length; d++){
            let className = `class='ans pointer'`;
            $(`.answerHolder`).append(`<div ${className}> ${this.curQuestion.ans[d]}</div>`);
        }
        theGame = this;
        //set onclick for the answers
        $(`.ans`).on(`click`, function(){
            $(`.ans`).removeClass(`pointer`);
            $(this).addClass("chosen")
            theGame.evaluateAnswer($(`.ans`).index(this));
        })
        //start 30 sec timer
        this.startQCountDown();
    },
    startQCountDown: function(){
        let thisGame = this;
        qCountDown = setInterval(function(){
            //reduce time counter
            thisGame.timeCnt--;
            //set width of the timer bar
            $(".hideBar").width($(".timeDisplay").width() - (thisGame.timeCnt/thisGame.defaultTimer)*$(".timeDisplay").width());
            //if timer is done. stop the timer and evalauate answer for a null value
            if(thisGame.timeCnt <= 0){                
                clearInterval(qCountDown);
                thisGame.evaluateAnswer(null);
            }            
        },50)
    },
    stopQCountDown:function(){
        clearTimeout(this.questionTimer);
    },
    startBetweenTimer:function(){
        let thisGame = this;
        //sets timer for between the anwer and the next question to 10 seconds - stops timer and laods question
        this.betweenTimer = setTimeout(function(){
            thisGame.endBetweenTimer();
            thisGame.loadQuestion();
        },10000)
    },
    endBetweenTimer:function(){
        clearTimeout(this.betweenQTimer);
    },
    evaluateAnswer:function(arg){
        //removes click from answers, clears interval and resets timer back to 30 sec
        $(`.ans`).unbind(`click`);  
        clearInterval(qCountDown);
        this.timeCnt=this.defaultTimer;
        //evaluates based on value passed on in function - compares # passes into funciton vs the current question correct answer property
        if(arg===null){
            this.numUnanswered++;
        }else if(arg===this.curQuestion.correct){
            this.numCorrect++;
        }else{
            this.numWrong++;
            $(".ans").eq(arg).addClass("red");
        }
        //bold the correct answer sets feedback
        $(".ans").eq(this.curQuestion.correct).addClass("font-weight-bold");
        $(`.feedback`).html(`<p class='font-weight-bold'>The correct answer is ${this.curQuestion.ans[this.curQuestion.correct]}</p><p>${this.curQuestion.expl}`);
        //evalauates if there are any questions left, if yes start timer if no, show replay button and show score
        if(theGame.theQuestions.length > 0){           
            this.startBetweenTimer();
        }else{
            $("#btnReplay").removeClass("d-none");
            $(`.feedback`).append(`<div class='d-flex justify-content-around'><div><b>Correct: ${this.numCorrect}</b></div><div><b>Incorrect: ${this.numWrong}</b></div><div><b>Unanswered: ${this.numUnanswered}</b></div></div>`)
        }   
    }

}