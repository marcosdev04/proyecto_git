

function wsConnect(token) {

    console.log("WS- connect ", token);

    var websocket = new WebSocket(`ws://68.183.27.173:8080/?token=${token}`);

    websocket.onopen = function (evt) {
        console.log(evt)
    };
    websocket.onclose = function (evt) {
        console.log(evt)
    };
    websocket.onerror = function (evt) {
        console.log(evt)
    };

   websocket.onmessage = function (evt) {
        var data = JSON.parse(evt.data);
        console.log(data);
        switch (data.type) {
            case "likes":
                console.log('entro');
                $('#articulo-like-' + data.postId).text(data.likes);
                break;
            // case "view-post":
            //     TODO: cambias likes por views
            //     $('#articulo-view-' + data.postId).text(data.likes);
            //     break;

        }
    };
}

