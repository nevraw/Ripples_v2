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

function setCheckedValue(radioObj, newValue) {
	var radioLength = radioObj.length;
	if(radioLength == undefined) {
		console.log('radioLength == undefined');
		radioObj.checked = (radioObj.value == newValue.toString());
		return;
	}
	for(var i = 0; i < radioLength; i++) {
		radioObj[i].checked = false;
		if(radioObj[i].value == newValue.toString()) {
			radioObj[i].checked = true;
		}
	}
}

function getRipples() {
	var params = {};
	$('#BGSelection').serializeArray().forEach(function(pair) {
		params[pair.name] = pair.value;
	});
	return params.background;
}

function changeColor(picker_id, color) {
    var hcolor = color.toHex();
    var gcolor = GColor.fromHex(hcolor);

    switch (picker_id) {
        case 'bgcolor':
            settings.bgcolor = gcolor;
            $(".screen").css("background-color", '#' + hcolor);
            break;
        case 'timecolor':
            settings.timecolor = gcolor;
            $(".number").css("color", '#' + hcolor);
            break;
        case 'ripplescolor':
            settings.ripplescolor = gcolor;
            $(".ripples").css("ripplescolor", '#' + hcolor);
            break;

    }

}

var pebble_palette = [
          ['000', '005', '00a', '00f', '050', '055', '05a', '05f'],
          ['500', '505', '50a', '50f', '550', '555', '55a', '55f'],
          ['a00', 'a05', 'a0a', 'a0f', 'a50', 'a55', 'a5a', 'a5f'],
          ['f00', 'f05', 'f0a', 'f0f', 'f50', 'f55', 'f5a', 'f5f'],
          ['0a0', '0a5', '0aa', '0af', '0f0', '0f5', '0fa', '0ff'],
          ['5a0', '5a5', '5aa', '5af', '5f0', '5f5', '5fa', '5ff'],
          ['aa0', 'aa5', 'aaa', 'aaf', 'af0', 'af5', 'afa', 'aff'],
          ['fa0', 'fa5', 'faa', 'faf', 'ff0', 'ff5', 'ffa', 'fff']
];

$(document).ready(function () {

    $('#xbtnSave').click(function () {

        if (settings.bgcolor == settings.timecolor) {
            alert('Please select different colors for time and background');
            return
        }
        settings.background = getRipples();
        
        localStorage.setItem("Ripples_colsettings", JSON.stringify(settings));
        
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
        settings = JSON.parse(localStorage.getItem("Ripples_colsettings"));
    }
    catch(err) {
        settings = null;
    }
        

    if(settings==null) {
        settings = {};

        settings.invert = false;
        settings.background = false;
        settings.hour_24 = false;

        settings.bgcolor = GColor.fromHex("000000");
        settings.timecolor = GColor.fromHex("00FFFF");
        settings.ripplestimecolor = GColor.fromHex("00FFFF");
    }


//    $(":radio[value=" + settings.background + "]").attr('checked', true);

    $(".number").css("color", '#' + GColor.toHex(settings.timecolor));
    $("#timecolor").spectrum("set", '#' + GColor.toHex(settings.timecolor));

    $(".screen").css("background-color", '#' + GColor.toHex(settings.bgcolor));
    $("#bgcolor").spectrum("set", '#' + GColor.toHex(settings.bgcolor));

    $(".ripples").css("ripplescolor", '#' + GColor.toHex(settings.ripplescolor));
    $("#ripplescolor").spectrum("set", '#' + GColor.toHex(settings.ripplescolor));

//    setCheckedValue(document.form['tblBGSelection'].elements['background'], settings.background);







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
