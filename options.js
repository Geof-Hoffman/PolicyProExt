$(function(){

document.querySelector('div').addEventListener('click', function(){
    chrome.runtime.sendMessage({message: "get_access_token"}, function(){
        console.log('auth token got')
    });
    
});

    
});