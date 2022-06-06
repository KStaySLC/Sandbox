var apiKey = 'OKx141pMJXLlcnHxgfs3WsoGod6GWuz2ZRafceTeDjHPsnWLq0'
var apiSecret = 'Pi76yQR0TVo10zUX7kgY4aQV4WZ2IcAggPwlssg7'
var token, tokenType, expires;
var data = ''
var submitButton = document.getElementById('#submit');

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getToken').addEventListener('click', sendRequest());
    sessionStorage.setItem("token", data)
});

var sendRequest = function() {

   fetch('https://api.petfinder.com/v2/oauth2/token', { 
       method: 'POST',
       body: 'grant_type=client_credentials&client_id=' + apiKey + '&client_secret=' + apiSecret,
       headers: {
           'Content-Type' : 'application/x-www-form-urlencoded'
       } 
    
   }).then(function(resp) {
       
       return resp.json();

   }).then(function(data) {
    console.log('token', data)
       token = data.access_token;
       tokenType = data.token_type;
       expires = new Date().getTime() + (data.expires_in * 1000);
   }).catch(function (err) {
       console.log('errors', err);
   });
};

var renewToken = () => {
    if (!expires || expires - new Date().getTime() <1) {
        sendRequest().then(function() {

        });
    }
};

// var parameters  = ''
var getDogs = function() {
    fetch('https://api.petfinder.com/v2/' + 'type', { 
        method: 'GET',
        
        headers: {
            'Authorization' : 'Bearer' +  token,
            // 'Content-Type' : 'application/x-www-form-urlencoded'
        }
        
    }).then(function (resp) {
        return resp.json();
        
    }).then(function (data) {
        console.log('dogs', data);
    }).catch(function(err) {
        console.log('errors', err);
    });
};console.log('looking for dogs')
getDogs()

var makeCall = function () {
    if (!expires || expires - new Date().getTime() <1) {
        console.log('new call');
        sendRequest().then(function() {
            getDogs();
        });
        return;
    } 
    console.log('from cache');
    getDogs();
}
