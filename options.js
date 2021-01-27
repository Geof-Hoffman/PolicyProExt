$(function () {
    var files = '';
    var filesList = [];
    var finished = [];
    var problems = [];

    chrome.storage.sync.get(['finished', 'filesList'], function(data){
console.log(data.filesList);
console.log[data.finished];
    });

    $('#fileNums').on('change mouseup mousedown  keydown', function () {
        updateList();
    });
    
    $('#clearCurrent').on('click', function(){
        var clearFiles =[];
        chrome.storage.sync.set({'filesList': clearFiles});
        var currentDiv = document.getElementById('current');
        currentDiv.innerHTML = '';

    });
    
    $('#clearFinished').on('click', function(){
        var finished =[];
        chrome.storage.sync.set({'finished': finished});
        var currentDiv = document.getElementById('current');
        currentDiv.innerHTML = '';
    });

    function updateList(){
        files = document.getElementById('fileNums').value;
        //console.log(files);
        filesList = files.split(/\s/);
        chrome.storage.sync.set({ 'filesList': filesList }, function () {            
         
            var i;
            var text = '';
            for (i = 0; i < filesList.length; i++) {
                text += filesList[i] + "<br>";
                document.getElementById("current").innerHTML = text;
                $('#fileNums').val('');
                };
        });
    };
    function displayLists(){
        chrome.storage.sync.get(['filesList', 'finished'], function(data){
            var currentList = data.filesList;  
            console.log(currentList);         
            var finishedList =data.finished;
            console.log(finishedList);    
            var i;
            var text = '';
            for (i = 0; i < currentList.length; i++) {
                text += currentList[i] + "<br>";
                document.getElementById("current").innerHTML = text;               
                };   
            var j;
            var finishedText = '';
            for (j = 0; j < finishedList.length; j++) {
                finishedText += finishedList[j] + "<br>";
                document.getElementById("finished").innerHTML = finishedText;               
                };                 
          });
    };
    displayLists()


/*


    
    
    chrome.storage.sync.get(['finished'], function(data){
        console.log(data.finished);
        if(data.finished){
            var j;
            var textj;
            for (j = 0; j < data.finished.length; j++) {
                textj += data.finished[i]+"<br>";                                  
                document.getElementById("finished").innerHTML = textj;
            }
        }else{
            var defaultFinished = [];
            chrome.storage.sync.set({'finished': defaultFinished})
        };
    });
    chrome.storage.sync.get(['filesList'], function(data){
    var i;        
    var filesList = data.filesList;
    for (i = 0; i < data.filesList.length; i++) {
        var text;            
        text += filesList[i] + "<br>";
        document.getElementById("current").innerHTML = text;
    };
    
    });
    
    
    
   
*/
});