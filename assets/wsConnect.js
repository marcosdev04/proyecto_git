

function wsConnect(token) {

    console.log("WS- connect ", token);

    var websocket = new WebSocket(`ws://68.183.27.173:8080/?token=${token}`);

    websocket.onopen = function (evt) {
        // console.log(evt)
    };
    websocket.onclose = function (evt) {
        // console.log(evt)
    };
    websocket.onerror = function (evt) {
        // console.log(evt)
    };

   websocket.onmessage = function (evt) {
        var data = JSON.parse(evt.data);
            console.log(evt);
        switch (data.type) {
            case "likes":
                // console.log('entro');                          
                // $('#text' + data.postId).text();
                $(`#likes-${data.postId}`).text(data.likes);
                break;
            case "new-comment":               
                $('#comment-' + data.postId).text(data.comments);
                break;
            case "view-post":
                // TODO: cambias likes por views
                $('#view-' + data.postId).text(data.views);
                break;
        }
    };
}

