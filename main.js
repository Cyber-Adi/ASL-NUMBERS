prediction1=""
prediction2=""

Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:100
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function takeSnapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="CI" src="'+ data_uri+'"/>';
});
}
console.log('ml5 version', ml5.version);

classifier= ml5.imageClassifier('', modelLoaded);
function modelLoaded(){
    console.log('Model Loaded!');
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1= "The first prediction is" + prediction_1;
    speak_data_2= "The second prediction is" + prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
  
}
function check(){
    img=document.getElementById('CI');
    classifier.classify(img, gotResult);
}
function gotResult(error,results){
if (error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("REN").innerHTML=results[0].label;
    document.getElementById("REN2").innerHTML=results[1].label;
    prediction_1=results[0].label;
    prediction_2=results[1].label;
    speak();

}
}