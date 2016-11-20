var express = require('express');
var app = express();
var url = require('url');


app.set('port', 8888);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/*", function(request, response){
	var szIP = "";
	var szLanguage = "";
	var iMozillaIndex = -1;
	var szSoftware = "";
	var iFirstParenthesis = -1;
	var iSecontParenthesis = -1;
	var objResult = null;

	var szAccepLanguage = request.headers["accept-language"];
	var szUserAgent = request.headers["user-agent"];

	szIP = request.connection.remoteAddress;
	szLanguage = szAccepLanguage.split(";")[0];

	iMozillaIndex = szUserAgent.indexOf("Mozilla");
	if (iMozillaIndex == -1)
	{
		szSoftware = "";
	}
	else
	{
		for (var i = iMozillaIndex; i < szUserAgent.length; i++)
		{
			if (szUserAgent[i] == '\(')
			{
				iFirstParenthesis = i;
				break;
			}
		}

		for (var i = iFirstParenthesis; i < szUserAgent.length; i++)
		{
			if (szUserAgent[i] == '\)')
			{
				iSecontParenthesis = i;
				break;
			}
		}

		szSoftware = szUserAgent.substring(iFirstParenthesis + 1, iSecontParenthesis);
	}

	objResult = {
		"ipaddress" : szIP,
		"language" : szLanguage,
		"software" : szSoftware
	};

	response.render('index', {data: JSON.stringify(objResult)});
});

app.listen(app.get('port'), function(){
	console.log("Listen in port : %d", 9960);
})


