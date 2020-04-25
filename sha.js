function SHA(Algorithm,str) {
    return crypto.subtle.digest(Algorithm, new TextEncoder("utf-8").encode(str)).then(buf => {
        var sout = Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
        $(".result").removeClass("hidden");
        $(".result textarea").text(sout);
        $(".result textarea")[0].focus();
        $(".result textarea")[0].select();
        document.execCommand('copy');

        $(".blinking").removeClass("hidden");
        setTimeout(function(){
            $(".blinking").css("visibility","hidden");
            $(".result textarea")[0].selectionStart=0;
            $(".result textarea")[0].selectionEnd=0;

        },3000);
    });
}

window.SHA = SHA;

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

$(document).ready(function(){

    var param = getUrlParam("prefix","");
    navigator.clipboard.readText()
        .then(text => {
            $("#TXT").val(param+text);
        })
        .catch(err => {
        });
})