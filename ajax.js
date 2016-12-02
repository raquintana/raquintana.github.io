// ajax.js
//
// The following ajax function assumes that all data sent and received is in
// the form of a json encoded object sent using an http POST message.
function ajax(url, reqObj, handler) {
    var req = new XMLHttpRequest();
    if (!req) {
        alert('Browser not supported.');
        return;
    }
    req.onreadystatechange = function() {
        var resp;
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                if (this.responseText.trim().length === 0) {
                    handler({});
                    return;
                }
                try {
                    resp = JSON.parse(this.responseText);
                } catch(e) {
                    handler({ 
                        result: 'error', 
                        msg: 'JSON.parse exception.\n' + this.responseText
                    });
                 }
                handler(resp);
            } else {
                handler({ result: 'error', msg: 'Ajax error, status: ' + this.status});
            }
        }
    };
    req.open('POST', url);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(reqObj));
}
