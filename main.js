rightWristY = 0;
rightWristX = 0;
scoreRightWrist = 0;

game_status = "";
function perLoad()
{
  ball_touch_paddel.wav = loadSound("ball_touch_paddel.wav");
  missed = loadSound("missed.wav");
}
function setup()
{
  var canvas = createCanvas(700,600);
  canvas.parent('canvas');

  video = createCapture(VIDEO);
  video.size(700,600);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}
function modelLoaded()
{
  console.log('PoseNet Is Initialized');
}
function gotPoses()
{
  if(results.length > 0)
  {
    rightWristY = results[0].pose.nose.y;
    rightWristX = results[0].pose.nose.x;
    scoreRightWrist = results[0].pose.keypoint[10].score;
    console.log(scoreRightWrist);
  }
}
function draw()
{
  if(game_status == "start")
  {
    background(0);
    image(video, 0, 0, 700, 600);

    fill("black");
    stroke("black")
    rect(0,0,20,700);
    
    if(scoreRightWrist > 0.2)
    {
      fill("red")
      stroke("red")
      circle(rightWristX, rightWristY, 30);
    }
  }
  function startGame()
  {
    game_status = "start";
    document.getElementById("status").innerHTML = "Game Is Loaded";
  }
}