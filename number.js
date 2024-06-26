
const express = require("express");
const session = require("express-session");
const app = express();
const port = 3001;
const cors = require("cors");
const cron = require("cron");
const path = require("path");


const min = 1;
const max = 99;
var zz;
var win = true;
const inputArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const randomArray = [];
const avaibaleNum = [];
var dayNum = 0;
var currentState = 0;
var error = "";
var string = "";


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));


app.use(express.static(path.join(__dirname, 'build')));
app.get("*", (req,res)=> {
    res.sendFile(path.join(__dirname + '/build/index.html'))
})




// app.get("/", cors(), async (req, res) => {
//   res.send("This is working");
// });

const s = app.listen(process.env.PORT || port, () => {
  console.log(`Listening at http://localhost:${port}`);
  createRandomArray();
  console.log(randomArray);
});



app.post("/start", async (req, res) => {
  //retrieves from react
  console.log("SENDING....")
  res.send({randomArray}); // Send a response to the client
});

app.post("/post_number", async (req, res) => {
  //retrieves from react
  console.log("MARCO")
  let { inputNum: number } = req.body.user;
  console.log(number);
  let { inputArry: array } = req.body.user;
  let {currPoint :  stringState} = req.body.user;
  currentState = parseInt(stringState);
  let {err :  errr} = req.body.user;
  error = errr;
// Convert each element in the array to an integer
  const intArray = array.map(element => parseInt(element, 10)); 
  
  for(let i =0; i < 10 ; i ++){
    inputArr[i] = intArray[i];
  }

  console.log(array);
  console.log(intArray);

  let intValue = parseInt(number);
  var valid = true;

  if (spotTaken(intValue)) {
    if (invalidSpot(intValue)) {
      console.log("HI");
      console.log(inputArr);
      checkNextNumber();
      currentState= currentState+1;
    }
  }

  console.log(currentState);
  
  res.send({ inputArr, error, string , currentState}); // Send a response to the client
  error = "";
});

function spotTaken(number) {
  if (inputArr[number - 1] != 0) {
    console.log("1");
    //  errorMessage("Spot is already taken")
    error = "Spot is already taken";
    return false;
  } else {
    inputArr[number - 1] = randomArray[currentState];
    return true; //spot taken
  }
}

function invalidSpot(index) {
  let num = parseInt(index);
  for (zz = 0; zz < 10; zz++) {
    if (inputArr[zz] != 0 && num - 1 > zz && inputArr[num - 1] < inputArr[zz]) {
      inputArr[index - 1] = 0;
      console.log("2");
      error = " Too small! Pick a bigger number for this spot!";
      return false;
    } else if (
      inputArr[zz] != 0 &&
      num - 1 < zz &&
      inputArr[num - 1] > inputArr[zz]
    ) {
      inputArr[index - 1] = 0;
      console.log("3");

      error = "That's too big! Try a smaller number for this spot!";

      return false;
    }
  }
  return true;
}

function createRandomArray() {
  randomArray.length = 0;
  for (var i = 0; i < 10; i++) {
    var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!randomArray.includes(randomNum)) {
      randomArray.push(randomNum);
    }
  }

}

function checkNextNumber() {
  var count = 1;
  var mini = -1;
  for (var j = 0; j < 10; j++) {
    if (inputArr[j] != 0 && j == 0) {
      mini = 0;
      while (inputArr[j] != 0 && j != 10) {
        j++;
      }
      j--;
    } else if (inputArr[j] == 0 && mini == -1) {
      mini = 0;
      while (inputArr[j] == 0 && j != 10) {
        j++;
      }
      count = 1;
      if (j != 10) {
        while (count < inputArr[j]) {
          avaibaleNum.push(count);
          count++;
        }
      } else {
        while (count < 100) {
          avaibaleNum.push(count);
          count++;
        }
      }
      j--;
    } else if (inputArr[j] == 0) {
      count = inputArr[j - 1];
      count++;
      while (inputArr[j] == 0 && j != 10) {
        j++;
      }
      if (j != 10) {
        while (count < inputArr[j]) {
          avaibaleNum.push(count);
          count++;
        }
      } else {
        while (count < 100) {
          avaibaleNum.push(count);
          count++;
        }
      }
      j--;
    }
  }
  if (
    avaibaleNum.indexOf(randomArray[currentState + 1]) === -1 &&
    currentState !== 9
  ) {
    sharedString();
    console.log("122222222222")
   // error = `Womp Womp You Lost Next Number Was ${randomArray[currentState + 1]} `;
    error ="WOMP WOMP"
    win = false;
  } else if (currentState == 9) {
    error = "you win";
  }
  avaibaleNum.length = 0;
}

function sharedString() {
  string = "Numbling 123 \n";
  for (var ii = 0; ii < 10; ii++) {
    if (inputArr[ii] == "0") {
      string = string + "⬛";
    } else {
      string = string + "🟩";
    }
  }
}

let numChange = new cron.CronJob("*/9 * * * *", () => {
  createRandomArray();
  console.log("reload");
  console.log(randomArray);
  dayNum++;
});

numChange.start();
