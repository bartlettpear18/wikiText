//require modules
var requestify = require('requestify');

//declare constant links
var link = "https://en.wikipedia.org";
const firstThree = "/w/api.php?action=query&format=json&prop=extracts&redirects=1&exsentences=3&titles=";
const firstPar = "/w/api.php?action=query&format=json&prop=extracts&exintro=1&titles=";
const image = "/w/api.php?action=query&format=json&prop=pageimages&pithumbsize=100&titles=";
const contingency = "&"

//global variable for reply
var reply;

//logs total number of users
var users;

//logs total number of failures
var fail;

//logs total number of success
var success;

//array of failed terms
var failArray = [];

//print to terminal success rate as a percentage
function successRate() {
  var percentSuccess = (success/(success+fail))*100;
  console.log(percentSuccess);
}

//filter out html tags and symbols
function filter (passage) {
  return passage.replace(/<[^>]*?>/gm, '');
}

//searches wikipedia
function searchTerm(ques) {
  link += firstThree;
  link += ques;

   requestify.get(link)
     .then(function(response) {
         
         //find extract property in JSON file returned by requestify
         var properties = response.getBody();
         properties = (properties['query'])['pages'];
         var propNames = Object.getOwnPropertyNames(properties);
         
         //check if ques will work
         if(propNames == "-1") {
          console.log(ques + " didn't work");
          fail++;
          failArray.push(ques);
          reply = "Sorry, but we were unable to find " + ques;

         } else {
           properties = (properties[propNames])['extract'];
           
           //filter string
           reply = filter((properties));
           //reply = properties;          
           console.log(reply);
           
           //add to success
           success++;
         }
      }
    );
  return reply;
}

//image search function
function searchImage(ques) {
  link += image;
  link += ques;

  requestify.get(link).then(function(response) {
    console.log(response);
  })
}

//inputs search term, returns response
function response (ques) {
  //if user sas hello
  if(ques.toUpperCase() == "HELLO") {
    reply = "Hi, I'm WikiText. Thanks for stopping by. You can look anything you want up just by texting this number with whatever you want to know about. You should get a reply back in under 30 seconds. Text \"tips\" for more help. If you want more information, type \"more\" after you search term";
    users++;
  } 
  
  //if user needs help
  else if (ques.toUpperCase() == "TIPS") {
    reply = "In case your having trouble, try searching just nouns or phases and keepking an eye on capitalization.";
  }
  
  //if user wants more information
  else if(ques.substr(ques.length - 4).toUpperCase() == "MORE") {
    var more = ques.substr(0,ques.length-4);
    console.log(searchTerm(more));     
  } 
  
  //if user wants image
  else if(ques.substr(ques.length - 5).toUpperCase() == "IMAGE") {
    var image = ques.substr(0, ques.length-5);
    console.log(searchImage(image));
  }
  

  /* NEWS option, couldn't get to work
  else if(ques.toUpperCase() == "NEWS") {
    console.log(search('current events'));
  }
  */

  //regular term
  else {
    console.log(searchTerm(link));
  }
}

/*
//inputs search term, returns response
function response (ques) {
  //if user sas hello
  if(ques.toUpperCase() == "HELLO") {
    reply = "Hi, I'm WikiText. Thanks for stopping by. You can look anything you want up just by texting this number with whatever you want to know about. You should get a reply back in under 30 seconds. Text \"tips\" for more help. If you want more information, type \"more\" after you search term";
    users++;
  } 
  
  //if user needs help
  else if (ques.toUpperCase() == "TIPS") {
    reply = "In case your having trouble, try searching just nouns or phases and keepking an eye on capitalization.";
  }
  
  //if user wants more information
  else if(ques.substr(ques.length - 4).toUpperCase() == "MORE") {
    
    link += firstThree;
    link += ques.substr(0,ques.length-4);
    
    requestify.get(link)
     .then(function(response) {
         
         //find extract property in JSON file returned by requestify
         var properties = response.getBody();
         properties = (properties['query'])['pages'];
         var propNames = Object.getOwnPropertyNames(properties);
         
         //check if ques will work
         if(propNames == "-1") {
          console.log(ques + " didn't work");
          fail++;
          failArray.push(ques);
          reply = "Sorry, but we were unable to find " + ques;

         } else {
           properties = (properties[propNames])['extract'];
           
           //filter string
           reply = (filter(properties)).toString();
           console.log(reply);
           
           //add to success
           success++;
         }
      }
    );
  }
  
  //if user searches
  else {
    link += words;
    link += ques;
    
    //declaring outside of requestify so it can be used in the contingency event

    //requestify accesss api data
    requestify.get(link)
     .then(function(response) {
         
         //find extract property in JSON file returned by requestify
         var properties = response.getBody();
         properties = (properties['query'])['pages'];
         var propNames = Object.getOwnPropertyNames(properties);
         
         //check if ques will work
         if(propNames == "-1") {
          console.log(ques + " didn't work");
          fail++;
          failArray.push(ques);
          reply = "Sorry, but we were unable to find " + ques;

         } else {
           properties = (properties[propNames])['extract'];
           
           //filter string
           reply = (filter(properties)).toString();
           console.log(reply);
           
           //add to success
           success++;
         }
      }
    );
  }
  
  return reply
}

//call function to test
console.log(response('watch'));
//console.log(successRate());
//console.log(failArray);

*/

response('tip');