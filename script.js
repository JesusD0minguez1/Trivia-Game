const categorySelect = document.getElementById("category");
const content = document.getElementById('DisplayQuetion');
const score = document.getElementById('ShowScore');
const btn1 = document.getElementById('Answer1');
const btn2 = document.getElementById('Answer2');
const btn3 = document.getElementById('Answer3');
const btn4 = document.getElementById('Answer4');
//Getting the ids of buttons

let increment = 0;
let userScore = 0;
let numOfQuestions = 5;
let questionCategory = 12;
let questionType = 'multiple';

let url = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${questionCategory}&type=${questionType}`;
//Indicating number and cat for questions
score.innerHTML = userScore;

const shuffleArr = myArr => {
    let a, b;
    for(let i=0; i<myArr.length; i++) {
        rand=Math.floor(Math.random()*myArr.length);
        a = myArr[i];
        b = myArr[rand];
        myArr[i] = b;
        myArr[rand] = a;
    }
    return myArr;
};

//Shuffles my arraylist

const main = () => {
    document.getElementById('QuestionDisplay').innerHTML = myData.results[increment].question; //Grabs 1 object in Results Arraylist and with questions and answers
    myAnswers = [
        [myData.results[increment].correct_answer, true],
        [myData.results[increment].incorrect_answers[0], false],
        [myData.results[increment].incorrect_answers[1], false],
        [myData.results[increment].incorrect_answers[2], false]
    ];
    myAnswers = shuffleArr(myAnswers);
    btn1.innerHTML = myAnswers[0][0];
    btn2.innerHTML = myAnswers[1][0];
    btn3.innerHTML = myAnswers[2][0];
    btn4.innerHTML = myAnswers[3][0];
}


let gOver = () => {
    if(increment > 5){
        window.location.href="gOver.html";
    }
}

let Checker = btn => {
    if(myAnswers[btn][1] == true)
    {
        userScore = userScore + 10;
        increment = increment + 1;
        score.innerHTML = userScore;
        main();
        gOver;
    }
    else
    {
        userScore = userScore - 10;
        increment = increment + 1;
        score.innerHTML = userScore;
        main();
        gOver;
    }
}


//'This' is a reference to the object being clicked
let check = evt => {
    try{
        switch(evt.target.id){
            case 'Answer1':
                Checker(0);
                break;
            case 'Answer2':
                Checker(1);
                break;
            case 'Anwser3':
                Checker(2);
                break;
            case 'Answer4':
                Checker(3);
                break;
        }
    }catch(e){}

};

fetch(url)
    .then(response => response.json())
    .then(data => {
        myData = data;
        main();
});

btn1.addEventListener("click", check);
btn2.addEventListener("click", check);
btn3.addEventListener("click", check);
btn4.addEventListener("click", check);
//window.location.href = "file.html";