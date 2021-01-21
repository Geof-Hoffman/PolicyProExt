const API_KEY ="AIzaSyD4KY4E1hBBnLDcnfLDQfscpIJk68QK9yQ";
let userSignedIn = false;
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    if (request.message === 'get_access_token'){
            chrome.identity.getAuthToken({interactive: true}, function(auth_token){
                console.log(auth_token);
            })
            sendResponse(true);
        }else if(request.message === 'get_profile'){
            chrome.identity.getProfileUserInfo({acountStatus: 'ANY'}, function(user_info){
                console.log(user_info);
            })
            sendResponse(true);
        }else if(request.message === 'get_contacts'){


        }else if(request.message === 'create_contact'){


        }else if(request.message === 'delete_contact'){

        }
});