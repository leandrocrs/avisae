/**
* Bootstrap

function bootstrap(){
	var str_nome_tabela = ""
	var bd = localStorage.getItem(str_nome_tabela);
	if (bd == null){
		console.log("Banco inexistente");
		localStorage.setItem("0",eval)
	}

}
*/

/**
* Eventos
*/
function btnAdicionarClick(){
	console.log("sera");	
	document.getElementById('confirmAdicionar').style.display='none';	
}

function btnCancelarClick(){	
	document.getElementById('confirmAdicionar').style.display='none';
}

/**
* Seta o alarme
*/
function addAlarm(){
		
	var resposta = navigator.mozAlarms.add(new Date().setSeconds(new Date().getSeconds()+5), "honorTimezone");

	resposta.onsuccess = function () {
	  console.log("Alarme agendado");
	};

	resposta.onerror = function () { 
	  console.log("Erro ao adicionar alarme: " + this.error.name);
	};

}

/** 
*	GMAPS
*/
function showpos(position){
	lat=position.coords.latitude;
	lon=position.coords.longitude;
	var latlng = new google.maps.LatLng(lat,lon);
	  
	var myOptions = {
		zoom: 14,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	//criando o mapa
	map = new google.maps.Map(document.getElementById("mapa"), myOptions);		

	var posicaoAtual = new google.maps.LatLng(lat, lon);
	marcadorPosicaoAtual = new google.maps.Marker({
  		position: posicaoAtual,
  		map: map,
  		title:"Sua Posicao",
		icon: 'icon/avisae30.png'		
	});			
			
	google.maps.event.addListener(map, 'click', function(event) {
		document.getElementById("confirmAdicionar").style.display="block";
		document.getElementById("lblCoordenadas").innerHTML=eval(event.latLng);				
	});
}

var map = null; 

function carregar(){
	navigator.geolocation.getCurrentPosition(showpos)
}

function buscar(){
	var endereco = document.getElementById("endereco").value;				
	geocoder = new google.maps.Geocoder();		
	geocoder.geocode({'address':endereco}, function(results, status){ 
		if( status = google.maps.GeocoderStatus.OK){
			latlng = results[0].geometry.location;
			marcadorPontoEscolhido = new google.maps.Marker({
				position: latlng,
				map: map,
				title:endereco,
				icon: 'icon/avisae30.png'
			});		
			map.setCenter(latlng); 
		}			
	});
}