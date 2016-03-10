//copy paste function
var copyTextareaBtn = document.querySelector('.js-textareacopybtn');
copyTextareaBtn.addEventListener('click', function(event) {
  var copyTextarea = document.querySelector('.js-copytextarea');
  copyTextarea.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
});


//input box function
var userinput = document.querySelector('#userinput');
var returnedurl = document.querySelector("#returnedurl");
var mainbuttons = document.querySelector(".btnmain");
var returnbuttons= document.querySelector(".btnreturn");

//handle submit button event
document.querySelector("#btnsubmit").addEventListener('click',function(event){

  userinput.style.display="none";
  returnedurl.style.display="inline";
  returnedurl.focus();
  returnedurl.select();

  mainbuttons.style.display="none";
  returnbuttons.style.display="inline-block";
});


//handle create another button event
document.querySelector("#btnback").addEventListener('click',function(event){
  userinput.style.display="inline";
  returnedurl.style.display="none";
  mainbuttons.style.display="inline";
  returnbuttons.style.display="none";
});


//handle clear button event
document.querySelector("#btnclear").addEventListener('click',function(event){

  userinput.value="";
});
