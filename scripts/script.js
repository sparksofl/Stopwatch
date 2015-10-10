var wh = 0, wm = 0, ws = 0, rh = 0, rm = 0, rs = 0;
var isStartClicked = false, isPauseClicked = false;
var isDayTheme = true;
    
function start() {
    isStartClicked = true;  
    isPauseClicked = false;  
    _start();

    logTime("started at        ");
}

function pause() {
    isStartClicked = false;
    isPauseClicked = true;
    _pause();

    logTime("went rest at    ");
}

function disp() {
  document.time.work.value = _StopWatch.duration();
  setTimeout("disp()", 1000);
}

function _start() {
    if (isStartClicked && !isPauseClicked) {
        if (ws < 60) {
            document.time.ws.value = ++ws;
        } else if (ws == 60) {
            document.time.ws.value = 0;
            document.time.wm.value = ++wm;
            ws = 0;      
        } else if (wm < 60) {
            document.time.wm.value = ++wm;
        } if (wm == 60) {
            document.time.wm.value = 0;
            document.time.wh.value = ++wh;
            wm = 0;
        }
        setTimeout("_start()", 1000); 
    }   
}

function _pause() {    
    if (isPauseClicked && !isStartClicked) {
        if (rs < 60) {
            document.time.rs.value = ++rs;
        } else if (rs == 60) {
            document.time.rs.value = 0;
            document.time.rm.value = ++rm;
            rs = 0;      
        } else if (rm < 60) {
            document.time.rm.value = ++rm;
        } if (rm == 60) {
            document.time.rm.value = 0;
            document.time.rh.value = ++rh;
            rm = 0;
        }
        setTimeout("_pause()", 1000);
    }
}

function logTime(action) {
    var currentDate = new Date();
    document.backlog.backlog.value += "\n" + action + " " + 
                                        currentDate.getHours() +
                                        ":" + currentDate.getMinutes();
}

function saveTextAsFile()
{
    var textToWrite = document.getElementById("backlog").value + 
                        "\n\nTOTAL\nwork:    " + 
                        document.time.wh.value + 
                        " hours " + document.time.wm.value + 
                        " minutes" +
                        "\nrest:    " + document.time.rh.value + 
                        " hours " + document.time.rm.value + " minutes";

    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = "backlog.txt";

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;

    downloadLink.innerHTML = "My Hidden Link";

    window.URL = window.URL || window.webkitURL;
          

    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);

    downloadLink.onclick = destroyClickedElement;

    downloadLink.style.display = "none";

    document.body.appendChild(downloadLink);
    

    downloadLink.click();
}

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}

function switchMode() {
    var a = document.createElement('a');
    a.setAttribute("id", "night");
    a.href = "night.css";
    if (!isDayTheme) {
        document.head.appendChild(a);
    } else {
        document.head.removeChild(document.getElementById("night"));
    }
}

$(document).ready(function() {

    // $('input').on('click', 'cb', function() {
    //     alert("123");
    //     $('span').addClass('done');
    // });


    var $item = $('.td-item');
    $item.keyup(function (e) {
        if (e.keyCode == 13 && $(this).val()!='') {
            $('.td-list ul').append("<li><input type ='checkbox' class='cb'/><span>" + $(this).val() + "</span></li>");
            $('li').addClass('list-item');
            $item.val('');
        }
    });



    $('ul').on('click', 'li .cb', function() {
         $(this).closest('li').find('span').toggleClass('done');
    });

    $('ul').on('click', 'li span', function() {
        alert();
    });

    
});