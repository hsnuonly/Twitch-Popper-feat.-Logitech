$(document).ready(function () {


    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://embed.twitch.tv/embed/v1.js";
    var jq = document.createElement("script");
    jq.type = "text/javascript"
    jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
    var pp = document.createElement("script");
    pp.type = "text/javascript"
    pp.src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js";
    var bsj = document.createElement("script");
    bsj.type = "text/javascript"
    bsj.src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js";
    var bsc = document.createElement("link");
    bsc.rel = "stylesheet"
    bsc.src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap";

    document.head.append(s);
    document.head.append(jq);
    document.head.append(pp);
    document.head.append(bsj);
    document.head.append(bsc);

    var root = document.getElementById("app");
    var div = document.createElement("DIV");
    var frame = document.createElement("IFRAME");
    div.setAttribute("class", "card");
    //div.style.width = "350px";
    //div.style.height = "500px";
    div.setAttribute("id", "twitch")
    frame.setAttribute("src", "https://www.twitch.tv" + location.pathname + "/chat")
    frame.setAttribute("scrolling", "no")
    frame.setAttribute("id", "frame")
    frame.setAttribute("height", "500px")
    frame.setAttribute("width", "350px")

    var head = document.createElement("DIV");
    head.style.backgroundColor = 'white';
    head.style.height = "20px";
    head.style.width = "350px";
    head.setAttribute("id", "header")
    head.style.zIndex = 10000;
    div.appendChild(head);

    div.appendChild(frame);
    div.style.zIndex = 2147483647;
    document.body.appendChild(div);
    div.style.width = "350px";
    div.style.right = 0;
    div.style.top = '30%';
    div.style.position = "absolute";
    div.style.visibility = "hidden";
    var angle = 0;
    var mode = 1;

    document.onkeydown = function (e) {
        if (document.webkitIsFullScreen) {
            if (e.key == 'q' && e.ctrlKey) {
                if (div.style.visibility == 'hidden') {
                    div.style.visibility = 'visible';
                }
                else div.style.visibility = 'hidden';
            }
            else if (e.ctrlKey) {
                if (mode == 0) mode = 1;
                else mode = 0;
            }
            if (e.key == 'q' && e.altKey) {
                if (mode == 0) {
                    var doc = frame.contentDocument || frame.contentWindow.document;
                    var scroll = doc.getElementsByClassName('tse-scroll-content');
                    scroll[1].scrollBy(0, 50);
                }
                else {
                    angle = angle + 10;
                    div.style.transform = "rotate(" + angle + "deg)";
                }
            }
            if (e.key == 'a' && e.altKey) {
                if (mode == 0) {
                    var doc = frame.contentDocument || frame.contentWindow.document;
                    var scroll = doc.getElementsByClassName('tse-scroll-content');
                    scroll[1].scrollBy(0, -50);
                }
                else {
                    angle = angle - 10;
                    div.style.transform = "rotate(" + angle + "deg)";
                }
            }
        }
    };

    window.addEventListener('resize', function () {
        /*div.style.right = 0;
        div.style.top = "30%";
        div.style.transform = "rotate(" + 0 + "deg)";*/
        div.style.visibility = 'hidden';
    });

    dragElement(div);

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById("header")) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById("header").onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

})