# password-genius

Secure Password Application

A randomly created password generator with user options to include-
* lower case characters
* upper case characters
* numbers 0-9
* special characters

Minium length 8 charaters up to 128 characters.

The generator first ensures at least one character from each option is included.
It then combines all option sets and randomly selects characters up to the total length required.
Finally it does a shuffle of all characters to ensure no predicability.

The generator uses the Math.Random to select random characters from the character sets.

The generator then shuffles the password using the Fisher-Yates Shuffle algorithm.

Files <br>
index.html <br>
screenshot.png <br>
assets/style.css <br>
assets/script.css <br>

Site is currently hosted on Github pages at: https://robertpdavis.github.io/password-genius/

Screenshot
![Webpage screenshot](https://github.com/robertpdavis/password-genius/blob/main/screenshot.png "Screenshot of webpage")