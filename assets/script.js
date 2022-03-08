
//Assign the doc selector for the button the user clicks to generate the password to a var
var generateBtn = document.querySelector("#generate");

//Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


//Functions -------------------------------------

//Write password to the #password input
function writePassword() {
  //Call function to generate the password
  var password = generatePassword();

  //Call again if user confirms
  if (password === true){
    password = generatePassword();
  //User cancels
  } else if (password === false){
    password = "Cancelled by user";
  }

  //Assign the doc selector to output the created password to a var
  var passwordText = document.querySelector("#password");

  //output the created password
  passwordText.value = password;
}

//Password generator function
function generatePassword() {
  
  //Set up vars
  //Character set object -uppercase to be created from lowercase set
  var charSets = {
    lowerCase:["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    numeric:["0","1","2","3","4","5","6","7","8","9"],
    special:[" ","!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/",":","<","=",">","?","@","[","\\","]","^","_","`","{","|","}","~"],
  }

  //Options object
  var options = {
    //Set all booleans to false
    lowerCase:false,
    upperCase:false,
    numeric:false,
    special:false
  }

  //Var for password length
  var passLength = 0;

  //Array to hold all required character sets
  var allChars =[];

  //Var to hold created password
  var passWord = "";

  //Set the password length.
  passLength= prompt("How many characters do you wish to have in your passeord? (Min: 8 Max: 128)","8");

  //Make sure input only contains digits and meets length requirements - note parseInt will still get through if first character is digit followed by string.
  //Use regex test instead
  if (!/^\d+$/.test(passLength) || passLength < 8 || passLength > 128){
    if (confirm("Invalid password type or length. Do you wish to try again?")){
      //User wants to try again
      return true;
    }else{
      //User cancels    
      return false;
    }
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

  //Check that at least 1 password type option is chosen. If not, give user option to do it again or cancel.
  if (!options["lowerCase"] && !options["upperCase"] && !options["numeric"] && !options["special"]) {
    if (confirm("At least one password type option must be selected. Do you wish to try again?")){
      return true;
    }else{
      return false;
    }
  }

  //Password length and options chosen so start building password
  //At least 1 character from each option must be included. Also create combined character set - allChars.
  for (var key in options) {
    //Check for character options chosen (i.e option = true)
    if (options[key] === true){
      if (key != "upperCase"){
        passWord = passWord + getRandom(charSets[key]);
        allChars = allChars.concat(charSets[key]);
      } else {
        //Uppercase to use lowercase and convert
        passWord = passWord + getRandom(charSets["lowerCase"]).toUpperCase();
        for (var index = 0; index < charSets["lowerCase"].length; index++) {
          allChars = allChars.concat(charSets["lowerCase"][index].toUpperCase());
        }
      }
      //Adjust the password length to account for inital characters added
      passLength = passLength - 1;
    }
  }

  //Finish building password
  for (var index = 0; index < passLength; index++) {
    passWord = passWord + getRandom(allChars);
  }
  console.log(passWord);

  //Shuffle password and returm
  passWord = Shuffle(passWord);

  console.log(passWord);
  console.log(passWord.length);

  return passWord;
}

//Function to return random character from array
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

//End