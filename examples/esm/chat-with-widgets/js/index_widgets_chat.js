

import {
    chatConfig,
    chatWindow,
    widgetsConfig,
    KoreWidgetSDK

} from '../../../../../dist/kore-web-sdk.esm.browser.js';


//configure chatConfig
var botOptions=chatConfig.botOptions;
botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
botOptions.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";
/* 
Important Note: These keys are provided here for quick demos to generate JWT token at client side but not for Production environment.
Refer below document for JWT token generation at server side. Client Id and Client secret should maintained at server end.
https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/
**/


//configure widgetsConfig
let botOptionsWiz=widgetsConfig.botOptions;
botOptionsWiz.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
botOptionsWiz.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
botOptionsWiz.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
botOptionsWiz.clientId = "PLEASE_ENTER_CLIENT_ID";
botOptionsWiz.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";
/* 
Important Note: These keys are provided here for quick demos to generate JWT token at client side but not for Production environment.
Refer below document for JWT token generation at server side. Client Id and Client secret should maintained at server end.
https://developer.kore.ai/docs/bots/sdks/user-authorization-and-assertion/
**/



//create chat window reference
let chatWindowInstance = new chatWindow();
//create widgetsdk reference
let wSdk = new KoreWidgetSDK(widgetsConfig);
//establish connection between both
chatConfig.widgetSDKInstace=wSdk;




//OPTION #1 with own JWT Service
chatWindowInstance.on("jwtSuccess", (res,event) => {
    wSdk.setJWT(res.jwt);
    wSdk.show(widgetsConfig);
});
chatWindowInstance.show(chatConfig);




// //OPTION #2 with own JWT Service
// chatWindowInstance.getJWT(chatConfig.botOptions).then(function(res){
//     chatWindowInstance.setJWT(res.jwt);
//     chatWindowInstance.show();

//     wSdk.setJWT(res.jwt);
//     wSdk.show(widgetsConfig);

// },function(errRes){

// });



// //OPTION #3 with own JWT Service
// chatConfig.JWTAsertion=function(commitJWT){
//     chatWindowInstance.getJWT(chatConfig.botOptions).then(function(res){
//         chatWindowInstance.setJWT(res.jwt);
//         wSdk.setJWT(res.jwt);
//         wSdk.show(widgetsConfig);
//         commitJWT();
//     },function(errRes){
//         console.log(errRes);
//     });
//  };



//todo:underconstuction:identity needs to be passed
//jwt retry needs discussion
// chatConfig.API_KEY_CONFIG.KEY="xyz";
// chatWindowInstance.on("jwtSuccess", (res,event) => {
//     wSdk.setJWT(res.jwt);
//     wSdk.show(widgetsConfig);
// });
// chatWindowInstance.show(chatConfig);           