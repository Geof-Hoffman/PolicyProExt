
$(function () {
  chrome.storage.sync.get(['address', 'vesting', 'loanAmount',
    'type', 'date', 'optEndOne', 'premium', 'costOne', 'costTwo', 'costThree', 'costFour',
    'optEndtwo', "stateName", 'date'], function (data) {
      $("#address").val(data.address).val();
      $("#vesting").val(data.vesting).val();
      $("#loanAmount").val(data.loanAmount).val();
      $("#type").val(data.type).val();
      $("#date").val(data.date).val();
      $("#optEndOne").val(data.optEndOne).val();
      $("#optEndtwo").val(data.optEndtwo).val();
      $("#state").val(data.stateName).val();
      $("#premium").val(data.premium).val();
      $("#costOne").val(data.costOne).val();
      $("#costTwo").val(data.costTwo).val();
      $("#costThree").val(data.costThree).val();
      $("#costFour").val(data.costFour).val();
      $("#date").val(data.date).val();
      updateState(data.stateName);
      checkCalc()
    });
  function find(array, criteriaFn) {
    let current = array
    let next = []
    while (current || current === 0) {
      if (criteriaFn(current)) {
        return current
      }
      if (Array.isArray(current)) {
        for (let i = 0; i < current.length; i++) {
          next.push(current[i])
        }
      }
      current = next.shift()
    }
    return null;
  }
  var stateName = '';
  var stateArray = [];
  var reviewList = [];
  var split = 0;
  var list = document.getElementById("myUL");
  var myNodelist = document.getElementsByTagName("LI");
  var data = [{
    id: "VA",
    state: "Virginia",
    UW: "CTIC",
    split: 13,
    end: false,
    cpl: "$30",
    signer: "William G. Reilly",
    review: ['NFT ABA -in TDR', 'Owners Aff-in TDR', 'Deed of Trust', 'Executed Settlement Statment']
  },
  {
    id: "MD",
    state: "Maryland",
    UW: "FATIC",
    split: 13,
    end: false,
    cpl: "$45",
    signer: "William G. Reilly",
    review: ['NFT ABA', 'CTS ABA', 'Owaff aff']
  },
  {
    id: "CO",
    state: "Colorado",
    split: 15,
    end: { 8.1: 50, 6: 30, 9: '', 4.1: '', 5.1: '' },
    cpl: "$45",
    signer: "William G. Reilly",
    review: ['NFT ABA', 'CTS ABA', 'Ownyeah   s aff']
  },
  {
    id: "MD",
    state: "Maryland",
    split: 13,
    end: false,
    cpl: "$45",
    signer: "William G. Reilly",
    review: ['NFT ABA', 'CTS ABA', 'Owner\'s aff']
  }];

  //event handlers
  $("#popout").on("click", function () {
    var popupWindow = window.open(
      chrome.extension.getURL("popup.html"),
      "exampleName",
      "width=600,height=600"
    );
    window.close(); // close the Chrome extension pop-up
    console.log("popped out");
  });
  $("#state").change(function () {
    //sets statename to input
    stateName = $(this).val();
    updateState(stateName);
    //console.log(stateName);
  });
  $("#address").keyup(function () {
    var address = $(this).val();
    chrome.storage.sync.set({ "address": address });
  });
  $("#vesting").keyup(function () {
    var vesting = $(this).val();
    chrome.storage.sync.set({ "vesting": vesting });
  });
  $("#loanAmount").keyup(function () {
    var loanAmount = $(this).val();
    chrome.storage.sync.set({ "loanAmount": loanAmount });
  });
  $("#type").on("change", function () {
    var type = $(this).val();
    chrome.storage.sync.set({ "type": type });
  });
  $("#date").on("change", function () {
    var date = $(this).val();
    chrome.storage.sync.set({ "date": date });
  });
  $("#optEndOne").keyup(function () {
    var optEndOne = $(this).val();
    chrome.storage.sync.set({ "optEndOne": optEndOne });
  });
  $("#optEndtwo").keyup(function () {
    var optEndtwo = $(this).val();
    chrome.storage.sync.set({ "optEndtwo": optEndtwo });
  });
  $("#myInput").keyup(function (event) {
    if (event.keyCode === 13) {
      $("#add").click();
    }
  });
  $(".addBtn").on("click", function () {
    //sends input value to newElement function to be added to list; 
    //must add enter key event (same function as "add" button);
    var e = $(this).val();
    newElement(e);
  });
  $("#clear").on("click", function () {
    //sets all variables to ""
    clear();
    console.log("storage clear")
  });
  $("#myUL").on("click", () =>
    hideItem()
  );
  $("#premium").on('change mouseup mousedown mouseout keydown', function () {
    checkCalc()
    var premium = $(this).val();
    chrome.storage.sync.set({ 'premium': premium }, function () {
      console.log('Premium is set to ' + premium);
    });
  });
  $("#costOne").keyup(function () {
    checkCalc();
    var costOne = $(this).val();
    chrome.storage.sync.set({ 'costOne': costOne }, function () {
      console.log('First Endorsment fee is set to ' + costOne);
    });
  });
  $("#costTwo").keyup(function () {
    checkCalc()
    var costTwo = $(this).val();
    chrome.storage.sync.set({ 'costTwo': costTwo }, function () {
      console.log('Second Endorsment fee is set to ' + costTwo);
    });
  });
  $("#costThree").keyup(function () {
    checkCalc()
    var costThree = $(this).val();
    chrome.storage.sync.set({ 'costThree': costThree }, function () {
      console.log('Third Endorsment fee is set to ' + costThree);
    });
  });
  $("#costFour").keyup(function () {
    checkCalc();
    var costFour = $(this).val();
    chrome.storage.sync.set({ 'costFour': costFour }, function () {
      console.log('Fourth Endorsment fee is set to ' + costFour);
    });
  });
  $('button').on('click', function () {
    var value = $(this).val();
    var data = $(this).data('val');
    var dummy = $('<input>').val(data).appendTo('body').select()
    document.execCommand('copy')
  });
  //Functions
  function checkCalc() {
    //captures numbers from inputs 
    var premium = parseFloat($("#premium").val());
    if (isNaN(premium)) {
      premium = 0;
    }
    var costOne = parseFloat($("#costOne").val());
    if (isNaN(costOne)) {
      costOne = 0;
    }
    var costTwo = parseFloat($("#costTwo").val());
    if (isNaN(costTwo)) {
      costTwo = 0;
    }
    var costThree = parseFloat($("#costThree").val());
    if (isNaN(costThree)) {
      costThree = 0;
    }
    var costFour = parseFloat($("#costFour").val());
    if (isNaN(costFour)) {
      costFour = 0;
    }
    var total = parseFloat(premium) + parseFloat(costOne) + parseFloat(costTwo) + parseFloat(costThree) + parseFloat(costFour);
    var totalFixed = total * split;
    var UWcheck = totalFixed.toFixed(2);
    $("#UWsplit").val(UWcheck).val();
  };
  function updateState(stateName) {
    list.innerHTML = '';  //clears list
    chrome.storage.sync.set({ 'stateName': stateName }, function () {
     // console.log('StateName is set to ' + stateName);
    });
    stateArray = find(data, index => index.state === stateName); //updates variable stateArray to the new state
    reviewList = stateArray.review; //sets value of review list to new state
    display = stateArray.end;
    split = stateArray.split / 100;
    $(".foo").toggle(display);
    $("#bar").toggle(display);
    for (var i = 0; i < reviewList.length; i++) {   //adds review items to list
      // Create DOM element
      var li = document.createElement('li');
      // Set text of element
      li.textContent = reviewList[i];
      // Append this element to its parent
      list.appendChild(li);
    } //adds close box
    for (var i = 0; i < myNodelist.length; i++) {
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      myNodelist[i].appendChild(span);
    }
    //console.log(stateArray);
    $("#split").text(`UW: ${stateArray.UW} split: ${stateArray.split} CPL: ${stateArray.cpl}`);

  };
  function hideItem() {
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }
  };
  function clear(){
    updateState(stateName)
  chrome.storage.sync.set({"optEndtwo": "",'address':"", 'vesting': "", 'loanAmount': "",
  'type': "", 'date': "", 'optEndOne': "", 'premium': "", 
  'costOne': "", 'costTwo': "", 'costThree': "", 'costFour': "",
   'date': ""});
   $("#address").val(data.address).val();
   $("#vesting").val(data.vesting).val();
   $("#loanAmount").val(data.loanAmount).val();
   $("#type").val(data.type).val();
   $("#date").val(data.date).val();
   $("#optEndOne").val(data.optEndOne).val();
   $("#optEndTwo").val(data.optEndTwo).val();
   $("#premium").val(data.premium).val();
   $("#costOne").val(data.costOne).val();
   $("#costTwo").val(data.costTwo).val();
   $("#costThree").val(data.costThree).val();
   $("#costFour").val(data.costFour).val();
   $("#date").val(data.date).val();
   checkCalc()
   
   };
  // Create a new list item when clicking on the "Add" button
  function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.prepend(t);
    if (inputValue === '') {
      // alert("add curitive items");
    } else {
      document.getElementById("myUL").prepend(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.prepend(txt);
    li.prepend(span);

    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }
  }
  function displayDrops() {
    // displays states in dropdown
    var output = '<option value=""><strong>choose state</strong></option>';

    for (var i = 0; i < data.length; i++) {
      output += '<option>' + data[i].state + '</option>';
    }

    document.getElementById('state').innerHTML = output;
  };
  displayDrops();
  hideItem();
  // Add a "checked" symbol when clicking on a list item
  list.addEventListener('click', function (ev) { if (ev.target.tagName === 'LI') { ev.target.classList.toggle('checked'); } }, false);
  var i;
  for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }

  /*
   //Training Mode
   var stuff = {
   'state': "Select state to begin",
   'address': "Enter Address from commitment/ report/ RW",
   'vesting': "Enter vesting from commitment Mortgage Req.",
   'loanAmount': "On Loan Instructions:\n\n-Confirm address\n-Confirm vesting\n-Enter Loan Amount, type and required endorsements",
   'premium': "Get premium from final rate calc"
   }
   
   var loanAmount = "On Loan Instructions:\n\n-Confirm address\n-Confirm vesting\n-Enter Loan Amount, type and required endorsements";
   
   for (i = 0; i < stuff.length; i++){
    var keys = Object.keys(stuff);
    console.log(keys);
   keys.forEach((key, index)=>{
   document.getElementById('state').title = stuff['state'];
    });
   }
   document.getElementById().title = loanAmount ;
   $(document).ready(function(){
     $('[data-toggle="tooltip"]').tooltip();   
   });
   
  /**********TO DO LIST****************
   * -Add copy function to input buttons
   * -Add state info
   * 
  

   // Map [Enter] key to work like the [Tab] key
 
// Catch the keydown for the entire document
$(document).keydown(function(e) {
 
  // Set self as the current item in focus
  var self = $(':focus'),
      // Set the form by the current item in focus
      form = self.parents('form:eq(0)'),
      focusable;
 
  // Array of Indexable/Tab-able items
  focusable = form.find('input,a,select,button,textarea,div[contenteditable=true]').filter(':visible');
 
  function enterKey(){
    if (e.which === 13 && !self.is('textarea,div[contenteditable=true]')) { // [Enter] key
 
      // If not a regular hyperlink/button/textarea
      if ($.inArray(self, focusable) && (!self.is('a,button'))){
        // Then prevent the default [Enter] key behaviour from submitting the form
        e.preventDefault();
      } // Otherwise follow the link/button as by design, or put new line in textarea
 
      // Focus on the next item (either previous or next depending on shift)
      focusable.eq(focusable.index(self) + (e.shiftKey ? -1 : 1)).focus();
 
      return false;
    }
  }
  // We need to capture the [Shift] key and check the [Enter] key either way.
  if (e.shiftKey) { enterKey() } else { enterKey() }
}); */
   
 

});