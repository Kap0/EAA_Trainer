$(document).ready(function(){
  trainer.init();
});

var trainer = {
  number_of_questions : 0,
  data : null,
  answer : null,
  index : null, // = index of current question
  init : function(){
  	$.getJSON("data.json",function(data){
      trainer.data = data;
  	}).done(function(){
      trainer.number_of_questions = trainer.data.Fragen.length;

      i = trainer.number_of_questions;
      while(i){
        i--;
        trainer.data.Fragen[i].right = 0;
        trainer.data.Fragen[i].wrong = 0;
      }
      trainer.askquestion();
  	});
  },
  askquestion : function(){
    $("#error").html("|");
    $("#info").html("|");
    $("#buttontrue").removeAttr("disabled");
    $("#buttonfalse").removeAttr("disabled");

    //every ~2nd question is (pretty) random. the others are randomly selected from the worst-n-questions
    if(Math.floor(Math.random()*2)){
      n = 5; //has to be smaller than number_of_questions
      index = Math.floor(trainer.number_of_questions - n + Math.random()*n);
    }
    else{
      // get random question (except one of the top n questions)
      n = 5; //has to be smaller than number_of_questions
      index = Math.floor(n + Math.random()*(trainer.number_of_questions - n));
    }

    html = trainer.data.Fragen[index].Q;
    trainer.answer = trainer.data.Fragen[index].A;
    trainer.info = "";
    trainer.info = trainer.data.Fragen[index].I;
    trainer.index = index;

    $("#question").html(html);
  },
  check : function(a){
    $("#buttontrue").attr("disabled","disabled");
    $("#buttonfalse").attr("disabled","disabled");
    
    html = "";
    if(a == 1){
      html += "'Wahr'";
    }
    if(a == 0){
      html += "'Falsch'";
    }
    if(a == trainer.answer){
      html += " stimmt :)";
      trainer.data.Fragen[index].right++;
    }
    else{
      html += " stimmt nicht :(";
      trainer.data.Fragen[index].wrong++;
    }
    
    $("#error").html(html);
    $("#info").html(trainer.info);
    trainer.printstats();
  },
  printstats : function(){
    $("#debug").html("");
    $("#stats").html("");
    
    trainer.data.Fragen.sort(function(a,b) { return ((b.right - b.wrong)-(a.right - a.wrong)) } );
    i = trainer.number_of_questions;
    sum_r = 0;
    sum_w = 0;
    while(i--){
      var r = trainer.data.Fragen[i].right;
      var w = trainer.data.Fragen[i].wrong;
      //$("#stats").append(r+"/"+w+" ("+trainer.data.Fragen[i].Q+")<br>");
      sum_r += r;
      sum_w += w;
    }
    $("#stats").prepend(sum_r+"/"+(sum_r+sum_w)+" ("+Math.round((sum_r/(sum_r+sum_w))*100)+"%) correct!<br>");
  }
}