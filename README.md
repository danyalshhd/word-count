This program gets the five most common words by using their occurences in the data set.
The solution checks word length and then splits the word by spaces and checks for each 
word whether it's a common English word or not.

It stores the word and its count in json object which acts as a dictionary.
It also stores company information for the respective in the same pattern.

After that the resulting data set is sorted on the basis of count and if there is 
same count for some of the words. The solution plucks that part of array, sort it
alphabatically and then push it to that particular index.

Bootstrap is used for this SPA. On clicking the word, five companies will be displayed.

## Install
To install the dependencies:

    npm install -g live-server
    
## Start Server

#Run following in the project directory path at command prompt

    live-server


#Run following on the browser

    http://127.0.0.1:8080/


## Directory Structure
The code structure is as follows:

    /home                        --component
      home.component.js
      home.html                  --template
    /posts-list
      posts-list.component.js
      posts-list.html
    README.md
    app.js                     
    index.html
