
//Assign the doc selector for the button the user clicks to generate the password to a var
var generateBtn = document.querySelector("#generate");

//Write password to the #password input
function writePassword() {
  //Call function to generate the password
  var password = generatePassword();
  //Assign the doc selector to output the created password to a var
  var passwordText = document.querySelector("#password");

  //output the created password
  passwordText.value = password;

}

//Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


//Password generator function
function generatePassword() {
  
  //Set up vars
  //Character set object --uppercase to be created from lowercase set
  var charSets = {
    lowerCase:["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    numeric:["0","1","2","3","4","5","6","7","8","9"],
    special:[" ","!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/",":","<","=",">","?","@","[","\\","]","^","_","`","{","|","}","~"],
  }

  //Options object
  var options = {
    passLength:0,
    //Set all booleans to false
    lowerCase:false,
    upperCase:false,
    numeric:false,
    special:false
  }

  //Use var to do password length check before setting option
  var passLength = 0;

  //Array to hold all required character sets
  var allChars =[];

  //Var to hold created password
  var passWord = "";


  //Get password length - check valid input
  while (passLength === 0) {
    passLength= parseInt(prompt("How many characters do you wish to have in your passeord? (Min:8 Max:128)","8"));

    if (passLength < 8 || passLength > 128 || Number.isNaN(passLength)){
      if (!confirm("Invalid password type or length. Do you wish to try again?")){
        return false;
      }else{
        generatePassword(0);
      }
    }

    options["passLength"] = passLength;
  }

  //Prompt user if lower case letters are required
  if (confirm("Do you want to include lower case letters?")){
    options["lowerCase"] = true;
  }

  //Prompt user if upper case letters are required
  if (confirm("Do you want to include upper case letters?")){
    options["upperCase"] = true;
  }

  //Prompt user if numbers are required
  if (confirm("Do you want to include numbers (0-9)?")){
    options["numeric"] = true;
  }

    //Prompt user if special characters are required
  if (confirm("Do you want to include special characters? (e.g. !,?)")){
    options["special"] = true;
  }
  //Check that at least 1 password type option is chosen. If not, go back.
  if (!options["lowerCase"] && !options["upperCase"] && !options["numeric"] && !options["special"]) {
    if (!confirm("At least one password type option must be selected. Do you wish to try again?")){
      return false;
    }else{
      generatePassword(0);
    }
  }

  //Start building password
  //At least 1 character from each option must be included. ALso create combined character set - allChars.
  for (var key in options) {
    if (options[key] === true){
      console.log(key);
      console.log(options[key]);
      if (key != "upperCase"){
        passWord = passWord + getRandom(charSets[key]);
        allChars = allChars.concat(charSets[key]);
      } else {
        passWord = passWord + getRandom(charSets["lowerCase"]).toUpperCase();
        for (var index = 0; index < charSets["lowerCase"].length; index++) {
          allChars = allChars.concat(charSets["lowerCase"][index].toUpperCase());
        }
      }
      //Adjust the password length to account for characters added
      options["passLength"] = options["passLength"] - 1;
    }
  }

  //Finish building password
  for (var index = 0; index < options["passLength"]; index++) {
    passWord = passWord + getRandom(allChars);
  }

  //Shuffle password and returm
  passWord = Shuffle(passWord);

  console.log(passWord);
  console.log(passWord.length);

  return passWord;

}

function getRandom(itemArray){

    //Check parameter is a valid array
    if (itemArray === "" || itemArray === null || !Array.isArray(itemArray)){
      return false;
    }

    var item = itemArray[Math.floor(Math.random() * itemArray.length)];
    return item;

}

//Standard shuffle function using Fisher-Yates Shuffle - https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function Shuffle(passWord) 
{

  var arrayPassWord = passWord.split("");

  for (var i = arrayPassWord.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [arrayPassWord[i], arrayPassWord[j]] = [arrayPassWord[j], arrayPassWord[i]];
  }

  return arrayPassWord.join("");
}
