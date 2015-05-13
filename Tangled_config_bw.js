var settings;

// to get value of query string
function getURLVariable(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)",
        regex = new RegExp(regexS),
        results = regex.exec(window.location.href);
    if (results == null) return "";
    else return results[1];
}

function changeColor(picker_id, color) {
    var hcolor = color.toHex();
    var gcolor = GColor.fromHex(hcolor);

    switch (picker_id) {
        case 'bgcolor':
            settings.bgcolor = gcolor;
            $(".screen").css("background-color", '#' + hcolor);
            if (settings.bgcolor == GColor.fromHex("000000")) {
                settings.timecolor = GColor.fromHex("FFFFFF");
            } else {
                settings.timecolor = GColor.fromHex("000000");
            }

            break;
        case 'timecolor':
            settings.timecolor = gcolor;
            $(".number").css("color", '#' + hcolor);
            break;

    }

}

var pebble_palette = [
          ['000', 'fff']
];

$(document).ready(function () {

    $('#xbtnSave').click(function () {

        if (settings.bgcolor == settings.timecolor) {
            alert('Please select different colors for time and background');
            return
        }

        localStorage.setItem("bwsettings", JSON.stringify(settings));
        
        var location = (decodeURIComponent(getURLVariable('return_to')) || "pebblejs://close#") + encodeURIComponent(JSON.stringify(settings));
        document.location = location;

    })


    $('#xbtnCancel').click(function () {

        var location = decodeURIComponent(getURLVariable('return_to')) || "pebblejs://close#";
        document.location = location;

    })


    // defining color pickers
    $(".picker").spectrum({
        showPaletteOnly: true,
        hideAfterPaletteSelect: true,
        preferredFormat: "hex3",
        change: function (color) {
            changeColor(this.id, color);
        },
        palette: pebble_palette
    });

    try {
        settings = JSON.parse(localStorage.getItem("bwsettings"));
    }
    catch(err) {
        settings = null;
    }
        

    if(settings==null) {
        settings = {};
      
        settings.bgcolor = GColor.fromHex("000000");
        settings.timecolor = GColor.fromHex("FFFFFF");
    }


    $(":radio[value=" + settings.shadowdirecton + "]").attr('checked', true);
    
    $(".number").css("color", '#' + GColor.toHex(settings.timecolor));
    $("#timecolor").spectrum("set", '#' + GColor.toHex(settings.timecolor));

    $(".screen").css("background-color", '#' + GColor.toHex(settings.bgcolor));
    $("#bgcolor").spectrum("set", '#' + GColor.toHex(settings.bgcolor));


    $('#tblColorSelection').show();
    $('#ptblColorSelection').show();

    $('.number').css({
        top:'-290px',
        left: '77px'
    });

    $('#tblDir').css({
        left: "0",
        top: "-25px"
    });

    $("input[type='radio']").checkboxradio();
    $("input[type='button']").button({ inline: true, mini: true, theme: "b" });
    $('.sp-replacer').unwrap();
     
    $('#main').show();

});
