
var islasCanarias = [ "laPalma", "elHierro", "laGomera", "tenerife", "granCanaria", "fuerteventura", "lanzarote" ];
var islasLasPalmas = [ "granCanaria", "fuerteventura", "lanzarote" ];
var islasTenerife = [ "laPalma", "elHierro", "laGomera", "tenerife" ];
var islasBaleares = [ "mallorca", "menorca", "ibiza", "formentera" ];
var extranjero = [ "portugal", "francia", "marruecos" ];

var provinciasESK = ["alava", "guipuzcua", "vizcaya"];

var colorGris = "#f6f4f2";
var colorBase = "#DDD";

var comunidadPrevia = "espana";
var nivelColegios = false;

function abreZona(e, zona){
	if(extranjero.indexOf(zona) != -1 || zona=="trazo"){
		e.preventDefault();
		return false;
	}
	/*
	if(nivelColegios === true && e != null){
		return false;
	}
	*/
	if(islasBaleares.indexOf(zona) != -1){
		if(comunidadPrevia != "balearesC"){
			zona = "balearesC";
		}else{
			zona = "baleares";
		}
	}

	if(islasCanarias.indexOf(zona) != -1){
		if(comunidadPrevia != "canariasC"){
			zona = "canariasC";
		}else{
			if(islasLasPalmas.indexOf(zona) != -1){
				zona="lasPalmas";
			}else{
				zona="tenerife";
			}
		}
	}
	
	$("#infoZona").html("<div class='cabeceraZona'>"+zonaToLabel(zona)+"</div>");
		switch(zona){
			case "espana" :			
				$("#mapaCover").fadeIn("fast", function(){
					$("#detallesColegio").hide();
					$("#datosColegio").hide();		
					$("#listaColegios").html("");
					mapa("espana");
					nivelColegios = false;
					$("#mapaCover").fadeOut();
					$("#infoZona").html("");
					$("#btnVolver").html("");				
				});
				break;
			// Comunidades
			case "galiciaC" :
			case "andaluciaC" : 
			case "aragonC" : 
			case "asturiasC" : 
			case "balearesC" : 
			case "canariasC" : 
			case "cantabriaC" : 
			case "castillaLaManchaC" : 
			case "castillaLeonC" : 
			case "catalunaC" : 
			case "ceutaC" : 
			case "extremaduraC" : 
			case "euskadiC" : 
			case "galiciaC" : 
			case "madridC" : 
			case "melillaC": 
			case "murciaC": 
			case "navarraC" : 
			case "laRiojaC" :
			case "valenciaC" :
			case "paisVascoC" : 		
				$("#mapaCover").fadeIn("fast", function(){
					$("#detallesColegio").hide();
					$("#datosColegio").hide();			
					seleccionarComunidad(zona.substring(0,zona.length-1));			
				});
				break;
			//Provincias
			case "laCoruna" :
			case "lugo" :
			case "orense" :
			case "pontevedra" :
			case "laRioja" :
			case "madrid" :
			case "cantabria" :
			case "baleares" :
			case "lasPalmas" :
			case "tenerife" :
			case "ceuta" :
			case "melilla" :
			case "almeria" : 
			case "cadiz" : 
			case "cordoba" : 
			case "granada" : 
			case "huelva" : 
			case "jaen" : 
			case "malaga" : 
			case "sevilla" : 
			case "huesca" : 
			case "teruel" : 
			case "zaragoza" : 
			case "asturias" : 
			case "albacete" : 
			case "ciudadReal" : 
			case "cuenca" : 
			case "guadalajara" : 
			case "toledo" : 
			case "avila" : 
			case "burgos" : 
			case "leon" : 
			case "palencia" :
			case "salamanca" : 
			case "segovia" : 
			case "soria" : 
			case "valladolid" : 
			case "zamora" : 			
			case "barcelona" :
			case "gerona" : 
			case "lerida" : 
			case "tarragona" :
			case "caceres" : 
			case "badajoz" :			
			case "alava" : 
			case "guipuzcua" :
			case "vizcaya" :			
			case "murcia" :
			case "navarra" :
			
			case "alicante" :
			case "castellon" : 
			case "valencia" : 
				seleccionarProvincia(zona);
				break;
					
			//Fin
			default: e.preventDefault();
		}
}

function mostrarColegio(provincia,personaRaw){
		
	var persona = escapeHtmlEntities(personaRaw)
	$("#mapaCover").fadeIn("fast",function(){
		$("#datosColegio").show();
		$("#detallesColegio").show();
		mostrarVolver(comunidadPrevia);
		var cadena = "";
		//Detalles del colegio: tipo + nombre + datos
		var datos = colegiosInfo[provincia][persona];
		var ciudadColegio = datos.split("-")[0].trim();
		var resto = datos.split("-")[1].trim();
		var tipoColegio = resto.split(".")[1];
		var nombreColegio = resto.split(".")[0].trim();		
		var infoColegio = "";
		try{
			infoColegio = "<br>" + resto.replace(/([^\.]*\.){2}/, '');
		}catch(err){
			
		}
		cadena += "<b>"+tipoColegio + " " + nombreColegio + "</b>" + infoColegio;		
		$("#detallesColegio").html(cadena);
		
		//Biografía
		cadena = "<p class='nombrePersona'>"+persona+"</p>" 
		if(provinciasESK.indexOf(provincia) != -1){			
			cadena += biografiasESK[persona] + "<br/><br/>";
		}
		cadena += biografias[persona];
		$("#biografia").html(cadena);
		$("#mapaCover").fadeOut("fast");
	});
}

function seleccionarProvincia(provincia){
	//Limpiar
	$("#biografia").html("");
	$("#detallesColegio").html("");	
	
	//Preparar
	nivelColegios = true;
	//$(".jvectormap-region[fill='"+colorGris+"']").addClass("desactivado");
	$(".jvectormap-region").attr("fill",colorGris);	
	$(".jvectormap-region[data-code='"+provincia+"']").attr("fill",coloresZonas[provincia]);	
	
	//$("#datosColegio").fadeIn();
	//mostrarVolver(comunidadPrevia);	
	
	//Rellenar lista de colegios
	var colegios = colegiosInfo[provincia];
	var cadena = "";
	for(var i in colegios){
		var ciudadColegio = colegios[i].split("-")[0].trim();
		var resto = colegios[i].split("-")[1].trim();
		var nombreColegio = ciudadColegio + " - " + resto.split(".")[1] + " " + resto.split(".")[0];
		cadena += '<li onClick="mostrarColegio(\''+provincia+'\' , \''+i+'\')" class="listaColegiosEntry">'+nombreColegio+'</li>';
	}
	$("#listaColegios").html(cadena);
	$("#mapaCover").fadeOut();
//	comunidadPrevia = "";
}

function seleccionarComunidad(comunidad){
	nivelColegios = false;
	if(islasBaleares.indexOf(comunidad) != -1){
		comunidad = "baleares";
	}
	
	comunidadPrevia = comunidad+"C";
	$("#datosColegio").hide();
	$("#listaColegios").html("");
	mapa(comunidad)
	$("#mapaCover").fadeOut();
	mostrarVolver("espana");	
}

function mostrarVolver(zona){
	$("#btnVolver").html("<a href=\"#\" onclick=\"abreZona(null,'"+zona+"')\" class=\"btnVolverMapa\">Mostrar "+zonaToLabel(zona)+"</a>");
}

function infoZona(e, zona){	
	var pintado = false;
	if(extranjero.indexOf(zona) != -1){
		e.preventDefault();
		return false;
	}
	
	if(nivelColegios === true){
		return false;
	}
	
	$("[data-code]").attr("fill",colorGris);
	for(i in extranjero){
		$("[data-code='"+extranjero[i]+"']").attr("fill",colorBase);
	}
	$("[data-code='trazo']").attr("fill","#FFF");

	if(islasCanarias.indexOf(zona) != -1){
		pintado = true;
		if(comunidadPrevia != "canariasC"){
			for(var i in islasCanarias){
				$("[data-code='"+islasCanarias[i]+"']").attr("fill",coloresZonas[islasCanarias[i]]);
			}	
			$("#infoZona").html("<div class='cabeceraZona'>"+"Canarias"+"</div>");
		}else{
			if(islasLasPalmas.indexOf(zona) != -1){
				for(var i in islasLasPalmas){
					$("[data-code='"+islasLasPalmas[i]+"']").attr("fill",coloresZonas["lasPalmas"]);
				}	
				$("#infoZona").html("<div class='cabeceraZona'>"+zonaToLabel("lasPalmas")+"</div>");
			}else{
				for(var i in islasTenerife){
					$("[data-code='"+islasTenerife[i]+"']").attr("fill",coloresZonas["tenerife"]);
				}	
				$("#infoZona").html("<div class='cabeceraZona'>"+zonaToLabel("tenerife")+"</div>");
			}
		}
	}

	if(islasBaleares.indexOf(zona) != -1){
		pintado = true;
		for(var i in islasBaleares){
			$("[data-code='"+islasBaleares[i]+"']").attr("fill",coloresZonas[islasBaleares[i]]);
		}	
		$("#infoZona").html("<div class='cabeceraZona'>"+"Islas Baleares"+"</div>");		
	}

	if(pintado === false){
		$("[data-code='"+zona+"']").attr("fill",coloresZonas[zona]);
		/*
		var fill = $("[data-code='"+zona+"']").attr("fill");
		$("[data-code='"+zona+"']").css("background-color",colorGris); 
		$("[data-code='"+zona+"']").animate({"background-color":'rgb(255,255,255)'},{duration:1300,step:function(now){$("[data-code='"+zona+"']").attr("fill",now); console.log("-"+now);}});
		*/
		$("#infoZona").html("<div class='cabeceraZona'>"+zonaToLabel(zona)+"</div>");
	}
	e.preventDefault();
}

function mapa(nombre){
	$("#mapa").html("");
	var zonasGris = [];
	if(nombre == "espana"){
		zonasGris = extranjero;
	}
	$("#mapa").vectorMap({
		map: nombre,
		regionsSelectable : false,
		regionsSelectableOne: false,
		zoomOnScroll : false,
		panOnDrag : false,
		zoomButtons : false,		
		selectedRegions : zonasGris,
		backgroundColor: "#FFF", 
		onRegionClick : abreZona,
		onRegionOver : infoZona, 
		regionStyle : {
			initial: {
				"fill" : colorGris,
				"fill-opacity": 1,
				"stroke": "black",
				"stroke-width": 1,
				"stroke-opacity": 0.7
			},
			hover: {
				"fill-opacity": 1,
				"cursor": "pointer"
			},
			selected: {
				"fill": colorBase,
				"fill-opacity": 1				
			},
			selectedHover: {
			}
		},
    });
	$("[data-code='trazo']").attr("fill","#FFF");
}

var coloresZonas = {
					"andaluciaC" : "#777ECA",
					"aragonC" : "#D30060",
					"asturiasC" : "#18B386",
					"balearesC" : "#FF7A19",
					"canariasC" : "#D3B308",
					"cantabriaC" : "#D30060",
					"castillaLaManchaC" : "#FF6666",
					"castillaLeonC" : "#D3B308",
					"catalunaC" : "#FF5319",
					"ceutaC" : "#FF5319",
					"extremaduraC" : "#D30060",
					"paisVascoC" : "#777ECA",
					"galiciaC" : "#FF5319",
					"madridC" : "#18B386",
					"melillaC": "#D30060",
					"murciaC": "#D30060",
					"navarraC" : "#D3B308",
					"laRiojaC" : "#FF5319",
					"valenciaC" : "#D3B308",
					"portugal" : colorBase,
					//Islas
					"mallorca" : "#FF7A19", 
					"menorca" : "#FF7A19", 
					"ibiza" : "#FF7A19", 
					"formentera" : "#FF7A19",
					"laPalma" : "#D3B308", 
					"elHierro" : "#D3B308", 
					"laGomera" : "#D3B308", 
					"tenerife" : "#D3B308", 
					"granCanaria" : "#D3B308", 
					"fuerteventura" : "#D3B308", 
					"lanzarote" : "#D3B308",
					//Provincias	
					"laCoruna" : "#FF5319",
					"lugo" : "#D3B308",
					"orense" : "#D30060",
					"pontevedra" : "#777ECA",	
					"laRioja" : "#FF5319",
					"madrid" : "#FF5319",
					"cantabria" : "#D30060",
					"lasPalmas" : "#18B386",
					"tenerife" : "#D3B308",
					"ceuta" : "#FF5319",
					"melilla" : "#FF5319",
					"almeria" : "#FF7A19",
					"cadiz" : "#18B386",
					"cordoba" : "#18B386",
					"granada" : "#D30060",
					"huelva" : "#777ECA",
					"jaen" : "#FF6666",
					"malaga" : "#D3B308",
					"sevilla" : "#D3B308",
					"huesca" : "#D30060",
					"teruel" : "#777ECA",
					"zaragoza" : "#FF6666",
					"asturias" : "#18B386",
					"albacete" : "#777ECA",
					"ciudadReal" : "#D30060",
					"cuenca" : "#D3B308",
					"guadalajara" : "#FF6666",
					"toledo" : "#FF7A19",
					"avila" : "#18B386",
					"burgos" : "#18B386",
					"leon" : "#FF6666",
					"palencia" : "#D3B308",
					"salamanca" : "#777ECA",
					"segovia" : "#D3B308",
					"soria" : "#FF5319",
					"valladolid" : "#D30060",
					"zamora" : "#FF7A19",
					"barcelona" : "#FF6666",
					"gerona" : "#D3B308",
					"lerida" : "#FF5319",
					"tarragona" : "#18B386",
					"caceres" : "#FF6666",
					"badajoz" : "#D30060",
					"alava" : "#D30060",
					"guipuzcua" : "#777ECA",
					"vizcaya" : "#D3B308",
					"murcia" : "#D30060",
					"navarra" : "#D3B308",
					"alicante" : "#FF7A19",
					"castellon" : "#D3B308",
					"valencia" : "#FF6666",
};

function zonaToLabel(zona){
	switch(zona){
			case "espana" : return "España"; break;
			// Comunidades
			case "galiciaC" : return "Galicia"; break;
			case "andaluciaC" : return "Andalucía"; break;
			case "aragonC" : return "Aragón"; break;
			case "asturiasC" : return "Asturias"; break;
			case "balearesC" : return "Baleares"; break;
			case "canariasC" : return "Canarias"; break;
			case "cantabriaC" : return "Cantabria"; break;
			case "castillaLaManchaC" : return "Castilla la Mancha"; break;
			case "castillaLeonC" : return "Castilla y León"; break;
			case "catalunaC" : return "Catalunya"; break;
			case "ceutaC" : return "Ceuta"; break;
			case "extremaduraC" : return "Extremadura"; break;
			case "euskadiC" : return "Euskadi"; break;
			case "galiciaC" : return "Galicia"; break;
			case "madridC" : return "Madrid"; break;
			case "melillaC": return "Melilla"; break;
			case "murciaC": return "Murcia"; break;
			case "navarraC" : return "Navarra"; break;
			case "laRiojaC" : return "La Rioja"; break;
			case "valenciaC" : return "País Valencià"; break;
			case "paisVascoC" : return "Euskadi"; break;			
			//Provincias
			case "laCoruna" : return "A Coruña"; break;
			case "lugo" : return "Lugo"; break;
			case "orense" : return "Orense"; break;
			case "pontevedra" : return "Pontevedra"; break;
			case "laRioja" : return "La Rioja"; break;
			case "madrid" : return "Madrid"; break;
			case "cantabria" : return "Cantabria"; break;
			case "lasPalmas" : return "Las Palmas"; break;
			case "tenerife" : return "Santa Cruz de Tenerife"; break;
			case "ceuta" : return "Ceuta"; break;
			case "melilla" : return "Melilla"; break;
			case "almeria" : return "Almería"; break;
			case "cadiz" : return "Cádiz"; break;
			case "cordoba" : return "Córdoba"; break;
			case "granada" : return "Granada"; break;
			case "huelva" : return "Huelva"; break;
			case "jaen" : return "Jaen"; break;
			case "malaga" : return "Málaga"; break;
			case "sevilla" : return "Sevilla"; break;
			case "huesca" : return "Huesca"; break;
			case "teruel" : return "Teruel"; break;
			case "zaragoza" : return "Zaragoza"; break;
			case "asturias" : return "Asturias"; break;
			case "albacete" : return "Albacete"; break;
			case "ciudadReal" : return "Ciudad Real"; break;
			case "cuenca" : return "Cuenca"; break;
			case "guadalajara" : return "Guadalajara"; break;
			case "toledo" : return "Toledo"; break;
			case "avila" : return "Ávila"; break;
			case "burgos" : return "Burgos"; break;
			case "leon" : return "León"; break;
			case "palencia" : return "Palencia"; break;
			case "salamanca" : return "Salamanca"; break;
			case "segovia" : return "Segovia"; break;
			case "soria" : return "Soria"; break;
			case "valladolid" : return "Valladolid"; break;
			case "zamora" : return "Zamora"; break;
			case "barcelona" : return "Barcelona"; break;
			case "gerona" : return "Girona"; break;
			case "lerida" : return "Lleida"; break;
			case "tarragona" : return "Tarragona"; break;
			case "caceres" : return "Cáceres"; break;
			case "badajoz" : return "Badajoz"; break;
			case "alava" : return "Araba"; break;
			case "guipuzcua" : return "Guipuzkoa"; break;
			case "vizcaya" : return "Bizkaia"; break;
			case "murcia" : return "Murcia"; break;
			case "navarra" : return "Navarra"; break;
			case "alicante" : return "Alicante"; break;
			case "castellon" : return "Castellón"; break;
			case "valencia" : return "Valencia"; break;
			default: return "";
		}
}

if(typeof escapeHtmlEntities == 'undefined') {
        escapeHtmlEntities = function (text) {
            return text.replace(/[\u00A0-\u2666<>\&]/g, function(c) {
                return '&' + 
                (escapeHtmlEntities.entityTable[c.charCodeAt(0)] || '#'+c.charCodeAt(0)) + ';';
            });
        };

        // all HTML4 entities as defined here: http://www.w3.org/TR/html4/sgml/entities.html
        // added: amp, lt, gt, quot and apos
        escapeHtmlEntities.entityTable = {
            34 : 'quot', 
            38 : 'amp', 
            39 : 'apos', 
            60 : 'lt', 
            62 : 'gt', 
            160 : 'nbsp', 
            161 : 'iexcl', 
            162 : 'cent', 
            163 : 'pound', 
            164 : 'curren', 
            165 : 'yen', 
            166 : 'brvbar', 
            167 : 'sect', 
            168 : 'uml', 
            169 : 'copy', 
            170 : 'ordf', 
            171 : 'laquo', 
            172 : 'not', 
            173 : 'shy', 
            174 : 'reg', 
            175 : 'macr', 
            176 : 'deg', 
            177 : 'plusmn', 
            178 : 'sup2', 
            179 : 'sup3', 
            180 : 'acute', 
            181 : 'micro', 
            182 : 'para', 
            183 : 'middot', 
            184 : 'cedil', 
            185 : 'sup1', 
            186 : 'ordm', 
            187 : 'raquo', 
            188 : 'frac14', 
            189 : 'frac12', 
            190 : 'frac34', 
            191 : 'iquest', 
            192 : 'Agrave', 
            193 : 'Aacute', 
            194 : 'Acirc', 
            195 : 'Atilde', 
            196 : 'Auml', 
            197 : 'Aring', 
            198 : 'AElig', 
            199 : 'Ccedil', 
            200 : 'Egrave', 
            201 : 'Eacute', 
            202 : 'Ecirc', 
            203 : 'Euml', 
            204 : 'Igrave', 
            205 : 'Iacute', 
            206 : 'Icirc', 
            207 : 'Iuml', 
            208 : 'ETH', 
            209 : 'Ntilde', 
            210 : 'Ograve', 
            211 : 'Oacute', 
            212 : 'Ocirc', 
            213 : 'Otilde', 
            214 : 'Ouml', 
            215 : 'times', 
            216 : 'Oslash', 
            217 : 'Ugrave', 
            218 : 'Uacute', 
            219 : 'Ucirc', 
            220 : 'Uuml', 
            221 : 'Yacute', 
            222 : 'THORN', 
            223 : 'szlig', 
            224 : 'agrave', 
            225 : 'aacute', 
            226 : 'acirc', 
            227 : 'atilde', 
            228 : 'auml', 
            229 : 'aring', 
            230 : 'aelig', 
            231 : 'ccedil', 
            232 : 'egrave', 
            233 : 'eacute', 
            234 : 'ecirc', 
            235 : 'euml', 
            236 : 'igrave', 
            237 : 'iacute', 
            238 : 'icirc', 
            239 : 'iuml', 
            240 : 'eth', 
            241 : 'ntilde', 
            242 : 'ograve', 
            243 : 'oacute', 
            244 : 'ocirc', 
            245 : 'otilde', 
            246 : 'ouml', 
            247 : 'divide', 
            248 : 'oslash', 
            249 : 'ugrave', 
            250 : 'uacute', 
            251 : 'ucirc', 
            252 : 'uuml', 
            253 : 'yacute', 
            254 : 'thorn', 
            255 : 'yuml', 
            402 : 'fnof', 
            913 : 'Alpha', 
            914 : 'Beta', 
            915 : 'Gamma', 
            916 : 'Delta', 
            917 : 'Epsilon', 
            918 : 'Zeta', 
            919 : 'Eta', 
            920 : 'Theta', 
            921 : 'Iota', 
            922 : 'Kappa', 
            923 : 'Lambda', 
            924 : 'Mu', 
            925 : 'Nu', 
            926 : 'Xi', 
            927 : 'Omicron', 
            928 : 'Pi', 
            929 : 'Rho', 
            931 : 'Sigma', 
            932 : 'Tau', 
            933 : 'Upsilon', 
            934 : 'Phi', 
            935 : 'Chi', 
            936 : 'Psi', 
            937 : 'Omega', 
            945 : 'alpha', 
            946 : 'beta', 
            947 : 'gamma', 
            948 : 'delta', 
            949 : 'epsilon', 
            950 : 'zeta', 
            951 : 'eta', 
            952 : 'theta', 
            953 : 'iota', 
            954 : 'kappa', 
            955 : 'lambda', 
            956 : 'mu', 
            957 : 'nu', 
            958 : 'xi', 
            959 : 'omicron', 
            960 : 'pi', 
            961 : 'rho', 
            962 : 'sigmaf', 
            963 : 'sigma', 
            964 : 'tau', 
            965 : 'upsilon', 
            966 : 'phi', 
            967 : 'chi', 
            968 : 'psi', 
            969 : 'omega', 
            977 : 'thetasym', 
            978 : 'upsih', 
            982 : 'piv', 
            8226 : 'bull', 
            8230 : 'hellip', 
            8242 : 'prime', 
            8243 : 'Prime', 
            8254 : 'oline', 
            8260 : 'frasl', 
            8472 : 'weierp', 
            8465 : 'image', 
            8476 : 'real', 
            8482 : 'trade', 
            8501 : 'alefsym', 
            8592 : 'larr', 
            8593 : 'uarr', 
            8594 : 'rarr', 
            8595 : 'darr', 
            8596 : 'harr', 
            8629 : 'crarr', 
            8656 : 'lArr', 
            8657 : 'uArr', 
            8658 : 'rArr', 
            8659 : 'dArr', 
            8660 : 'hArr', 
            8704 : 'forall', 
            8706 : 'part', 
            8707 : 'exist', 
            8709 : 'empty', 
            8711 : 'nabla', 
            8712 : 'isin', 
            8713 : 'notin', 
            8715 : 'ni', 
            8719 : 'prod', 
            8721 : 'sum', 
            8722 : 'minus', 
            8727 : 'lowast', 
            8730 : 'radic', 
            8733 : 'prop', 
            8734 : 'infin', 
            8736 : 'ang', 
            8743 : 'and', 
            8744 : 'or', 
            8745 : 'cap', 
            8746 : 'cup', 
            8747 : 'int', 
            8756 : 'there4', 
            8764 : 'sim', 
            8773 : 'cong', 
            8776 : 'asymp', 
            8800 : 'ne', 
            8801 : 'equiv', 
            8804 : 'le', 
            8805 : 'ge', 
            8834 : 'sub', 
            8835 : 'sup', 
            8836 : 'nsub', 
            8838 : 'sube', 
            8839 : 'supe', 
            8853 : 'oplus', 
            8855 : 'otimes', 
            8869 : 'perp', 
            8901 : 'sdot', 
            8968 : 'lceil', 
            8969 : 'rceil', 
            8970 : 'lfloor', 
            8971 : 'rfloor', 
            9001 : 'lang', 
            9002 : 'rang', 
            9674 : 'loz', 
            9824 : 'spades', 
            9827 : 'clubs', 
            9829 : 'hearts', 
            9830 : 'diams', 
            338 : 'OElig', 
            339 : 'oelig', 
            352 : 'Scaron', 
            353 : 'scaron', 
            376 : 'Yuml', 
            710 : 'circ', 
            732 : 'tilde', 
            8194 : 'ensp', 
            8195 : 'emsp', 
            8201 : 'thinsp', 
            8204 : 'zwnj', 
            8205 : 'zwj', 
            8206 : 'lrm', 
            8207 : 'rlm', 
            8211 : 'ndash', 
            8212 : 'mdash', 
            8216 : 'lsquo', 
            8217 : 'rsquo', 
            8218 : 'sbquo', 
            8220 : 'ldquo', 
            8221 : 'rdquo', 
            8222 : 'bdquo', 
            8224 : 'dagger', 
            8225 : 'Dagger', 
            8240 : 'permil', 
            8249 : 'lsaquo', 
            8250 : 'rsaquo', 
            8364 : 'euro'
        };
    }