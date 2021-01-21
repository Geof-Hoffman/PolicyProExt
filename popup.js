
$(function () {
  chrome.storage.sync.get(['fileNum','address', 'vesting', 'loanAmount',
    'type', 'date', 'optEndOne', 'premium', 'costOne', 'costTwo', 'costThree', 'costFour',
    'optEndtwo', 'stateName', 'date'], function (data) {
      $('#fileNum').val(data.fileNum).val();
      $('#address').val(data.address).val();
      $('#vesting').val(data.vesting).val();
      $('#loanAmount').val(data.loanAmount).val();
      $('#type').val(data.type).val();
      $('#date').val(data.date).val();
      $('#optEndOne').val(data.optEndOne).val();
      $('#optEndtwo').val(data.optEndtwo).val();
      $('#state').val(data.stateName).val();
      $('#premium').val(data.premium).val();
      $('#costOne').val(data.costOne).val();
      $('#costTwo').val(data.costTwo).val();
      $('#costThree').val(data.costThree).val();
      $('#costFour').val(data.costFour).val();
      $('#date').val(data.date).val();
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
  var list = document.getElementById('myUL');
  var myNodelist = document.getElementsByTagName('LI');
  var data = [{
    id: 'VA',
    state: 'Virginia',
    UW: 'CTIC',
    jacket:'Refinance Rate – Standard Loan -> REFINANCE LOAN – ALTA Short Form Residential Loan Policy 12/03/12 w-VA Mod_434 – Refinance Loan Policy',
    split: 13,
    end: false,
    cpl: '$30',
    pud: '5.1',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s Aff','Deed of Trust', 'Executed Settlement Statement'],
    lps: "Transmital, jacket, CTIC Notice",
    ups: "Email policy to UW"
  },
  {
    id: 'MD',
    state: 'Maryland',
    UW: 'FATIC',
    jacket: 'ALTA Short Form Residential Loan Policy (Rev. 6-16-07) (A&B)',
    split: 13,
    end: false,
    cpl: '$45',
    pud: '5.1/4.1',
    signer: 'William G. Reilly',
    review: ['NFT ABA',  'Owner\'s aff']
  },
  {
    id: 'CO',
    state: 'Colorado',
    UW:'CTIC',
    split: 15,
    jacket:',',
    end: { 8.1: 50, 6: 30, 9: '', 4.1: '', 5.1: '' },
    cpl: '$25',
	pud: '5.1/4.1',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s Aff','Gap Aff', 'Marital Status Aff']
  },
  {
    id: 'AL',
    state: 'Alabama',
    UW: '',
    split: 0,
    jacket:'',
    split: 20,
    end: false,
    cpl: '$25/ $25 (BWR opt.)',
    pud: '5.0 or 5.1',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s aff', 'Fire Dues Aff']
  }, 
  {
    id: 'DC',
    state: 'District of Columbia',
    UW: 'FATICO',
    split: 13,
    jacket:'ALTA Short Form Residential Loan Policy (6-17-06; Rev. 4-8-16) (A&B)',
    end: false,
    cpl: '$50',
    pud: '?',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s Aff', 'Gap Aff', 'Executed Settlement Statement', 'Deed of Trust']
  },  
  {
    id: 'FL',
    state: 'Florida',
    UW: 'CW',
    split: 30,
    jacket:'?',
    end: {'9':'10% prem'},
    cpl: 'n/a',
    pud: '5.1/4.1',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s aff', 'Borrower Affidavit (BA)', 'Gap Affidavit & Indemnity (GA)', 'Marital Status (MSA)', '•	Title Affidavit (TA)', 'Indemnity Agreement (IA) [not notarized]','Lien Affidavit (LA)', 'Homestead Affidavit (HA)', 'FL Premium Disclosure (FPD) [not notarized]', 'Compliance Agreement (CA)' ]
  },  
  {
    id: 'GA',
    state: 'Georgia',
    UW: 'FATICO',
    split: 15,
    jacket:'ALTA Short Form Residential Loan Policy (Rev. 6-16-07) (A&B)',
    end: true,
    cpl: '$50',
    pud: '5.0',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s aff', 'Security Deed', 'Executed Settlement Statement']
  },  
  {
    id: 'IL',
    state: 'Illinois ',
    UW: 'FATICO',
    split: 15,
    jacket:'ALTA Short Form Residential Loan Policy (Rev. 6-16-07) (A&B)',
    end: false,
    cpl: 'Lender $25; Borrower $25 for sale/$50 for refi; Seller $50',
    pud: '5.1/4.1',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s aff', 'Marital Status Aff (notarized)', 'Personal Undertaking', 'Deed of Trust', 'Executed Settlement Statement']
  },  
  {
    id: 'IN',
    state: 'Indiana',
    UW: 'CTIC',
    split: 15,
    jacket:'BASIC LOAN – ALTA Short Form Residential Loan Policy 12/03/12_434 – Basic Loan Rates',
    end: false,
    cpl: '15',
    pud: '5.0/4.0',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s aff', 'ABA (x2 NFTS/NFCU & NFTS/CTS)', 'Gap Aff (notarized) ',	'Mortgagor’s Aff (notarized)','Borrower’s Aff (notarized)', 'Homeowner’s Aff (notarized)','Tax Benefits Sheet']
  },  
  {
    id: 'KS',
    state: 'Kansas ',
    UW: 'CTIC',
    split: 15,
    jacket:'REFINANCE LOAN – ALTA Short form Residential Loan Policy 12/03/12 w-KS/MO mod_434 – Refinance Rates',
    end: 'filed rate',
    cpl: 'n/a',
    pud: '5.0- first lien',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s aff', 'Gap (notarized)', 'Marital Status Affidavit (notarized)','Executed Settlement statement', 'Deed of trust']
  },   
  {
    id: 'KY',
    state: 'Kentucky',
    UW: 'CTIC',
    split: 15,
    jacket:'REFINANCE LOAN – ALTA Short Form Residential Loan Policy 12/03/12 w-KY Mod_434 – REFINANCE RATE',
    end: '$30/',
    cpl: '$50 lender; $25/borrower (optional) (+ lender\'s premium tax [dependant on county], full amount remitted)',
    pud: '5.0/4.0',
    signer: 'Mel',
    review: ['NFT ABA', 'Owner\'s aff','Owners Aff (notarized)','ABA (x2 NFTS/NFCU & NFTS/CTS)','Gap', 'Marital Status Affidavit (notarized)',
    'Cert in Residential Transactions',
    'Aff and Indemnity (notarized)',
     'Executed Settlement Statement', 'Deed of trust']
  },    
  {
    id: 'LA',
    state: 'Louisiana',
    UW: 'CTIC',
    split: 20,
    jacket:'BASIC LOAN - ALTA Short Form Residential Loan Policy 06/16/07 for LA 04/01/14_452 - Loan Rate',
    end: 'varies per endorsement (commonly used $50 -100); CPL paid directly to UW by attorney',
    cpl: '$25',
    pud: '5.0',
    signer: 'Melanie Johnson',
    review: ['NFT ABA', 'Owner\'s aff', 'Executed Settlement Statement', 'Deed of trust']
  },     
  {
    id: 'ME',
    state: 'Maine',
    UW: 'CTIC',
    split: 20,
    jacket:'REFINACE LOAN – ALTA Short Form Residential Loan Policy 12/03/12 w-ME Mod_434 – Refinance Rates',
    end: ' 9.3- Residential Endorsement Flat Fee: $75.00 (plus $50 survey aff, subject to split [$40.00 to NFTS, $10.00 to CTIC])',
    cpl: '$25',
    pud: '',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s aff','Gap (notarized)',
    'Survey Aff (notarized)',
    'Residential Mortgage Survey Aff (notarized)',
    'No Open Lien Aff (notarized)',
     'Executed Settlement Statement', 'Deed of trust']
  },     
  {
    id: 'MA',
    state: 'Massachusetts ',
    UW: 'CTIC',
    split: 25,
    jacket:'BASIC LOAN – ALTA Short Form Residential Loan Policy 06/16/07-342 – Standard Loan Policy',
    end: false,
    cpl: 'n/a',
    pud: '5.0',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s aff', 'Executed Settlement Statement', 'Deed of trust', 'FTO STATE']
  },     
  {
    id: 'MI',
    state: 'Michigan ',
    UW: 'CTIC',
    split: 15,
    jacket:'BASIC LOAN – ALTA Short Form Residential Loan Policy 12/03/12_434 – Basic Loan Rates',
    end: false,
    cpl: 'n/a',
    pud: '5.1/4.1',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s aff', 'Gap (notarized)',' Marital Status Aff (notarized)','Personal Undertaking (notarized)', 'Executed Settlement Statement', 'Deed of trust' ]
  },     
  {
    id: 'MN',
    state: 'Minnesota ',
    UW: 'CTIC',
    split: 20,
    jacket:'REFINANCE LOAN - ALTA Short Form Residential Loan Policy 12/03/12_434 - Refinance Loan Rate',
    end: 'some endorsements 10%; some flat $50-200; some at no charge',
    cpl: 'n/a',
    pud: '5.0/4.0',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s aff','Gap (notarized)', 'Marital Status Affidavit (notarized)', 'Aff Regarding Seller (notarized)',  'Executed Settlement Statement', 'Deed of trust']
  },     
  {
    id: 'MS',
    state: 'Mississippi ',
    UW: 'CTIC',
    split: 20,
    jacket:'Mortgage Original Rate OR Reissue Loan Rate (as applicable)  BASIC LOAN – ALTA Short Form Residential Loan Policy 12/03/12_434 – Mortgage Original Rate OR REISSUE LOAN - ALTA Short Form Residential Loan Policy 12/03/12_434 – Reissue Loan Rate',
    end: 'No charge on residential endorsements except ALTA 7 is $100',
    cpl: '$50',
    pud: '5.1/4.1',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s aff',' Gap (notarized)', 'Marital Status Affidavit', 'Indemnity and Hold Harmless Aff (notarized)', 'Executed Settlement Statement', 'Deed of trust']
  },     
  {
    id: 'MO',
    state: 'Missouri ',
    UW: 'FATICO',
    split: 50,
    jacket:'First American – must be a licensed agent in the state for refi and purchase',
    end: 'Missouri does not presently charge for any endorsements All filed endorsements except for the following are issued for a work fee only  No premium or risk rate applies*',
    cpl: '%25',
    pud: '5.1/4.1',
    signer: 'Melanie Johnson',
    review: ['NFT ABA', 'Owner\'s aff', 'Owner Affidavit (state specific)', ' Gap', 'Notice of Closing or Settlement Risk, Form T-3 (only if no policy issued)', 'Title Insurance & Service Charge Disclosure', 
    'NFT ABA + MO AfB',
    'Marital Status', 'CTS added: City Nuisance Fee Disclosure & Hold Harmless', 'Executed Settlement Statement', 'Deed of trust']
  },     
  {
    id: 'NC',
    state: 'North Carolina',
    UW: 'FATICO',
    split: 15,
    jacket:'ALTA Short Form Residential Loan Policy (Rev. 6-16-07) (A&B)',
    end: '$21 each for 8.1, 9 and PUD—no charge for all others *Closing services insurance premium is an additional fee added to the base premium (refer to First American rate calculator) *Commitment Premium is $15',
    cpl: 'n/a',
    pud: '5.0',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s aff', 'Executed Settlement Statement', 'Deed of trust']
  },     
  {
    id: 'NE',
    state: 'Nebraska',
    UW: 'CTIC',
    split: 15,
    jacket:'REFINANCE LOAN – ALTA Short Form Residential Loan Policy 12/03/12 w-NE Mod_434 – Refinance Rate',
    end: '$25 Each',
    cpl: '$25',
    pud: '',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s aff', 'Executed Settlement Statement', 'Deed of trust']
  },        
  {
    id: 'NH',
    state: 'New Hampshire',
    UW: 'CTIC',
    split: 20,
    jacket:'BASIC LOAN – ALTA Short Form Residential Loan Policy-Current Violations 04/02/15_492 – Original Mortgage Rate',
    end: 'Flat package rate for survey and all endorsements\n Standard loan $125\nExpanded $175\n',
    cpl: '$25',
    pud: '5.1/4.1',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s aff', 'Owners Aff', 'ABA (x2 NFTS/NFCU & NFTS/CTS)', 'Gap Aff (notarized)', 'Gap Indemnity (notarized)', 'Marital Status Aff',' Policy Aff (/expanded coverage policy aff) (notarized)','Survey Aff (notarized)', 'Executed Settlement Statement', 'Deed of trust']
  },        
  {
    id: 'NJ',
    state: 'New Jersey',
    UW: 'CTIC',
    split: 13,
    jacket:'REFINANCE LOAN - ALTA Short Form Residential Loan Policy-Current Violations 04/02/15 w-NJRB Mod 07/01/2018_506 – Refinance Loan Rates',
    end: '$25 each unless Enhanced policy is purchased *If Enhanced Lender’s policy is purchased then there are NO charges for endorsements however simultaneous issue fee is still applicable',
    cpl: '$75',
    pud: '5.1/4.1',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s aff','Gap (notarized)', 'Marital Status Aff (notarized)', 'Aff of Title (notarized)', 'Executed Settlement Statement',' Deed of trust']
  },        
  {
    id: 'OH',
    state: 'Ohio',
    UW: 'FATICO',
    split: 10,
    jacket:'ALTA Short Form Residential Loan Policy (Rev. 6-16-07) (A&B)',
    end: 'varies up to $150 (reference RC)',
    cpl: '$40 lender; $20 borrower (optional)',
    pud: '5.0/4.0',
    signer: 'Melanie Johnson',
    review: ['NFT ABA', 'Owner\'s aff',' Marital Status Aff (notarized)', 'Closing Disclosure', 'Notice of Availability and Offer of Closing Protection Coverage/Offer of CPL', 'Affidavit of No New Improvements (notarized)', 'Executed Settlement Statement', 'Deed of trust']
  },        
  {
    id: 'PA',
    state: 'Pennsylvania ',
    UW: 'CW',
    split: 0,
    jacket:'NA',
    end: false,
    cpl: 'NA',
    pud: 'NA',
    signer: '?',
    review: ['NFT ABA', 'Owner\'s aff','Witness not required on Deed', ' POA Alive & Well Affidavit does not need to record', ' Outsale Affidavit is not required for Purchase Money MTG',  ' Survey Waiver is not required per UW',  ' NOP Judgments are listed in owner affidavit', 'Executed Settlement Statement', 'Deed of trust']
  },        
  {
    id: 'RI',
    state: 'Rhode Island',
    UW: 'CTIC',
    split: 20,
    jacket:'REFINANCE LOAN - ALTA Short Form Residential Loan Policy 06/16/07_343 – Reduced Rates – Refinance Mortgages',
    end: 'Endorsements 6.0, 6.1, and Alta 9 $25; Survey Deletion $25.00 (100% of endorsement fees go to UW)',
    cpl: '$35',
    pud: '4.0',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s aff', 'Tax cert (municipal lien cert)', 'Executed Settlement Statement', 'Deed of trust']
  },        
  {
    id: 'SC',
    state: 'South Carolina',
    UW: 'CTIC',
    split: 40,
    jacket:'ALTA Short Form Residential Loan Policy 12/03/12 w/SC NS Mod_434',
    end: false,
    cpl: '$35',
    pud: '5.0',
    signer: 'William G. Reilly',
    review: ['NFT ABA', 'Owner\'s aff', 'Executed Settlement Statement', 'Deed of trust', 'FTO state']
  },        
  {
    id: 'TN',
    state: 'Tennessee ',
    UW: 'CW',
    split: 15,
    jacket:'[select agent CLTIC] Loan Original Rates  BASIC LOAN – ALTA Short Form Residential Loan Policy 12/03/12 for TN_434 – Loan Original Rates',
    end: false,
    cpl: '$50',
    pud: '5.0',
    signer: 'MEL',
    review: ['RISK RATE', 'NFT ABA', 'Owner\'s aff', 'Gap ','Marital Status Affidavit', 'Executed Settlement Statement', 'Deed of trust']
  },        
  {
    id: 'WV',
    state: 'West Virginia ',
    UW: 'CW',
    split: 15,
    jacket:'BASIC LOAN – ALTA Short Form Residential Loan Policy 12/03/12 w-WV Mod_434 – Loan Policy Rate OR REISSUE LOAN – ALTA Short Form Residential Loan Policy 12/03/12 w-WV Mod_434 – Reissue Loan Rate',
    end: '8.1 is $15 and included in split; $50 commitment included and subject to split (included in premium for split)',
    cpl: '$50',
    pud: '5.1/ 9.3',
    signer: 'William G. Reilly',
    review: ['Owner\'s aff', 'Executed Settlement Statement', 'Deed of trust']
  },        
  {
    id: 'WI',
    state: 'Wisconsin',
    UW: 'CTIC',
    split: 15,
    jacket:'REFINANCE LOAN – ALTA Short Form Residential Loan Policy 12/03/12 w-WI Mod_434 – Original Policy Rates - 2013',
    end: 'Alta 6 and Alta 7 are $125, no charge for all others',
    cpl: 'na',
    pud: '5.0',
    signer: 'Mel',
    review: ['NFT ABA', 'Owner\'s aff', 'Gap', 'Marital Status Affidavit', 'Owner’s Affidavit as to Liens and Possession', 'Executed Settlement Statement', 'Deed of trust']
  }
  

];
//console.log(data);
  //event handlers
  $('#popout').on('click', function () {
    var popupWindow = window.open(
      chrome.extension.getURL('popup.html'),
      'exampleName',
      'width=600,height=600'
    );
    window.close(); // close the Chrome extension pop-up
    console.log('popped out');
  });
  $('#state').change(function () {
    //sets statename to input
    stateName = $(this).val();
    updateState(stateName);
    //console.log(stateName);
  });
  $('#address').keyup(function () {
    var address = $(this).val();
    chrome.storage.sync.set({ 'address': address });
  });
  $('#vesting').keyup(function () {
    var vesting = $(this).val();
    chrome.storage.sync.set({ 'vesting': vesting });
  });
  $('#loanAmount').keyup(function () {
    var loanAmount = $(this).val();
    chrome.storage.sync.set({ 'loanAmount': loanAmount });
  });
  $('#type').on('change', function () {
    var type = $(this).val();
    chrome.storage.sync.set({ 'type': type });
  });
  $('#date').on('change', function () {
    var date = $(this).val();
    chrome.storage.sync.set({ 'date': date });
  });
  $('#optEndOne').keyup(function () {
    var optEndOne = $(this).val();
    chrome.storage.sync.set({ 'optEndOne': optEndOne });
  });
  $('#optEndtwo').keyup(function () {
    var optEndtwo = $(this).val();
    chrome.storage.sync.set({ 'optEndtwo': optEndtwo });
  });
  $('#myInput').keyup(function (event) {
    if (event.keyCode === 13) {
      $('#add').click();
    }
  });
  $('.addBtn').on('click', function () {
    //sends input value to newElement function to be added to list; 
    //must add enter key event (same function as 'add' button);
    var e = $(this).val();
    newElement(e);
  });
  $('#clear').on('click', function () {
    //sets all variables to ''
    clear();
    console.log('storage cleared')
  });
  $('#myUL').on('click', () =>
    hideItem()
  );
  $('#premium').on('change mouseup mousedown mouseout keydown', function () {
    checkCalc()
    var premium = $(this).val();
    chrome.storage.sync.set({ 'premium': premium }, function () {
      console.log('Premium is set to ' + premium);
    });
  });
  $('#fileNum').on('change mouseup mousedown mouseout keydown', function () {
    var fileNum = $(this).val();
    chrome.storage.sync.set({ 'fileNum': fileNum }, function () {
      console.log(fileNum);
    });
  });
  $('#costOne').keyup(function () {
    checkCalc();
    var costOne = $(this).val();
    chrome.storage.sync.set({ 'costOne': costOne }, function () {
      console.log('First Endorsment fee is set to ' + costOne);
    });
  });
  $('#costTwo').keyup(function () {
    checkCalc()
    var costTwo = $(this).val();
    chrome.storage.sync.set({ 'costTwo': costTwo }, function () {
      console.log('Second Endorsment fee is set to ' + costTwo);
    });
  });
  $('#costThree').keyup(function () {
    checkCalc()
    var costThree = $(this).val();
    chrome.storage.sync.set({ 'costThree': costThree }, function () {
      console.log('Third Endorsment fee is set to ' + costThree);
    });
  });
  $('#costFour').keyup(function () {
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
    var premium = parseFloat($('#premium').val());
    if (isNaN(premium)) {
      premium = 0;
    }
    var costOne = parseFloat($('#costOne').val());
    if (isNaN(costOne)) {
      costOne = 0;
    }
    var costTwo = parseFloat($('#costTwo').val());
    if (isNaN(costTwo)) {
      costTwo = 0;
    }
    var costThree = parseFloat($('#costThree').val());
    if (isNaN(costThree)) {
      costThree = 0;
    }
    var costFour = parseFloat($('#costFour').val());
    if (isNaN(costFour)) {
      costFour = 0;
    }
    var total = parseFloat(premium) + parseFloat(costOne) + parseFloat(costTwo) + parseFloat(costThree) + parseFloat(costFour);
    var totalFixed = total * split;
    var UWcheck = totalFixed.toFixed(2);
    $('#UWsplit').val(UWcheck).val();
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
    $('.foo').toggle(display);
    $('#bar').toggle(display);
    for (var i = 0; i < reviewList.length; i++) {   //adds review items to list
      // Create DOM element
      var li = document.createElement('li');
      // Set text of element
      li.textContent = reviewList[i];
      // Append this element to its parent
      list.appendChild(li);
    } //adds close box
    for (var i = 0; i < myNodelist.length; i++) {
      var span = document.createElement('SPAN');
      var txt = document.createTextNode('\u00D7');
      span.className = 'close';
      span.appendChild(txt);
      myNodelist[i].appendChild(span);
    }
    //console.log(stateArray);
    $('#split').text(`UW: ${stateArray.UW} split: ${stateArray.split} CPL: ${stateArray.cpl}`);
    
    var lps = data[data.findIndex(data => data.state === stateName)].lps;
    //console.log(LPS);
    $("#lps").attr("title", lps);
    var ups = data[data.findIndex(data => data.state === stateName)].ups;
    //console.log(LPS);
    $("#ups").attr("title", ups);
  };

  function hideItem() {
    var close = document.getElementsByClassName('close');
    var i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = 'none';
      }
    }
  };
  function clear(){
  updateState(stateName)
  chrome.storage.sync.set({'fileNum':'','optEndtwo': '','address':'', 'vesting': '', 'loanAmount': '',
  'type': '', 'date': '', 'optEndOne': '', 'premium': '', 
  'costOne': '', 'costTwo': '', 'costThree': '', 'costFour': '',
   'date': ''});
   $('#fileNum').val(data.fileNum).val();
   $('#address').val(data.address).val();
   $('#vesting').val(data.vesting).val();
   $('#loanAmount').val(data.loanAmount).val();
   $('#type').val(data.type).val();
   $('#date').val(data.date).val();
   $('#optEndOne').val(data.optEndOne).val();
   $('#optEndTwo').val(data.optEndTwo).val();
   $('#premium').val(data.premium).val();
   $('#costOne').val(data.costOne).val();
   $('#costTwo').val(data.costTwo).val();
   $('#costThree').val(data.costThree).val();
   $('#costFour').val(data.costFour).val();
   $('#date').val(data.date).val();
   checkCalc()
   console.log("values cleared");
   
   };  // Create a new list item when clicking on the 'Add' button
  function newElement() {
    var li = document.createElement('li');
    var inputValue = document.getElementById('myInput').value;
    var t = document.createTextNode(inputValue);
    li.prepend(t);
    if (inputValue === '') {
      // alert('add curitive items');
    } else {
      document.getElementById('myUL').prepend(li);
    }
    document.getElementById('myInput').value = '';

    var span = document.createElement('SPAN');
    var txt = document.createTextNode('\u00D7');
    span.className = 'close';
    span.prepend(txt);
    li.prepend(span);

    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = 'none';
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
    var span = document.createElement('SPAN');
    var txt = document.createTextNode('\u00D7');
    span.className = 'close';
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }

  /*
   //Training Mode
   var stuff = {
   'state': 'Select state to begin',
   'address': 'Enter Address from commitment/ report/ RW',
   'vesting': 'Enter vesting from commitment Mortgage Req.',
   'loanAmount': 'On Loan Instructions:\n\n-Confirm address\n-Confirm vesting\n-Enter Loan Amount, type and required endorsements',
   'premium': 'Get premium from final rate calc'
   }
   
   var loanAmount = 'On Loan Instructions:\n\n-Confirm address\n-Confirm vesting\n-Enter Loan Amount, type and required endorsements';
   
   for (i = 0; i < stuff.length; i++){
    var keys = Object.keys(stuff);
    console.log(keys);
   keys.forEach((key, index)=>{
   document.getElementById('state').title = stuff['state'];
    });
   }
   document.getElementById().title = loanAmount ;
   $(document).ready(function(){
     $('[data-toggle='tooltip']').tooltip();   
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
   
  /*  function getCell(){
    var url = 'https://docs.google.com/spreadsheets/d/1avFsg8sS4Md1O8OK7gdd4Dc2eweSL5M-c3667VkL-Xs/edit#g'; //url provided when published
    var x = new XMLHttpRequest();
    x.open('GET', url);
    x.onload = function(){
        console.log(x.response);
    }
    x.send();
}
getCell('A1'.content);

function setCell(){
    var url = 'https://docs.google.com/spreadsheets/d/1avFsg8sS4Md1O8OK7gdd4Dc2eweSL5M-c3667VkL-Xs/edit#g'; //url provided when published
    var x = new XMLHttpRequest();
    x.open('POST', url);
    x.onload = function(){
        console.log(x.response);
    }
    x.send();
}

setCell();

*/
 

});