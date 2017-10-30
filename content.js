window.onload = function () {
    var prevhref = null;

    var root = document.getElementById("app");
    var div = document.createElement("DIV");
    var frame = document.createElement("IFRAME");
    //div.style.width = "350px";
    //div.style.height = "500px";
    div.setAttribute("id", "twitch")
    frame.setAttribute("src", "https://www.twitch.tv" + location.pathname + "/chat")
    frame.setAttribute("scrolling", "no")
    frame.setAttribute("id", "frame")

    var head = document.createElement("DIV");
    head.setAttribute("id", "pop-header")
    div.appendChild(head);
    var footer = document.createElement("DIV");
    footer.setAttribute("id", "pop-footer")
    div.appendChild(footer);

    div.appendChild(frame);
    document.body.appendChild(div);
    var angle = 0;
    var mode = 0;

    $("#twitch").draggable();
    document.onkeydown = function (e) {
        if (document.webkitIsFullScreen) {
            if (e.keyCode == 81 && e.ctrlKey || e.keyCode == 9) {
                if (div.style.visibility == 'hidden') {
                    div.style.visibility = 'visible';
                }
                else div.style.visibility = 'hidden';
            }
            else if (e.ctrlKey) {
                if (mode == 0) mode = 1;
                else mode = 0;
            }
            if (e.keyCode == 81 && e.altKey || e.keyCode == 187) {
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
            if (e.keyCode == 65 && e.altKey || e.keyCode == 189) {
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
        div.style.visibility = 'hidden';
        if (location.href != prevhref) {
            prevhref = location.href;
            frame.setAttribute("src", "https://www.twitch.tv" + location.pathname + "/chat")
            frame.reload();
        }
    });
}