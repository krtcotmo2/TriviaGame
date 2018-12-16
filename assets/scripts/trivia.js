let theGame = {
    defaultTimer:60,
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
        let ind = Math.floor(Math.random()*this.theQuestions.length);
        this.curQuestion = this.theQuestions.splice(ind,1)[0];
        $(`.feedback`).text(``);
        $(`.answerHolder`).html(``);
        $(`.displayQ`).text(this.curQuestion.question);
        for(let d=0; d<this.curQuestion.ans.length; d++){
            let className = `class='ans pointer'`;
            $(`.answerHolder`).append(`<div ${className}> ${this.curQuestion.ans[d]}</div>`);
        }
        theGame = this;
        $(`.ans`).on(`click`, function(){
            $(`.ans`).removeClass(`pointer`);
            $(this).addClass("chosen")
            theGame.evaluateAnswer($(`.ans`).index(this));

        })
        this.startQCountDown();
    },
    startQCountDown: function(){
        let thisGame = this;
        $(`.timeDisplay`).text(`Time remainaing: ${thisGame.timeCnt}`);    
        qCountDown = setInterval(function(){
            thisGame.timeCnt--;
            $(`.timeDisplay`).text(`Time remainaing:  ${thisGame.timeCnt}`);
            if(thisGame.timeCnt <= 0){                
                clearInterval(qCountDown);
                thisGame.evaluateAnswer(null);
            }            
        },1000)
    },
    stopQCountDown:function(){
        clearTimeout(this.questionTimer);
    },
    startBetweenTimer:function(){
        let thisGame = this;
        this.betweenTimer = setTimeout(function(){
            thisGame.endBetweenTimer();
            thisGame.loadQuestion();
        },10000)
    },
    endBetweenTimer:function(){
        clearTimeout(this.betweenQTimer);
    },
    evaluateAnswer:function(arg){
        $(`.ans`).unbind(`click`);  
        clearInterval(qCountDown);
        this.timeCnt=this.defaultTimer;
        if(arg===null){
            this.numUnanswered++;
        }else if(arg===this.curQuestion.correct){
            this.numCorrect++;
        }else{
            this.numWrong++;
            $(".ans").eq(arg).addClass("red");
        }
        $(".ans").eq(this.curQuestion.correct).addClass("font-weight-bold");
        $(`.feedback`).html(`<p class='font-weight-bold'>The correct answer is ${this.curQuestion.ans[this.curQuestion.correct]}</p><p>${this.curQuestion.expl}`);
        if(theGame.theQuestions.length > 0){           
            this.startBetweenTimer();
        }else{
            $("#btnReplay").removeClass("d-none");
        }   
    }

}