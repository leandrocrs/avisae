// DECLARACAO
var map = null;

// BOOTSTRAP
function bootstrap(){
	/*var str_nome_tabela = ""
	var bd = localStorage.getItem(str_nome_tabela);
	if (bd == null){
		console.log("Banco inexistente");
		localStorage.setItem("0",eval)
	}*/
	navigator.geolocation.getCurrentPosition(showpos)
}

//EVENTOS
function btnAdicionarClick(){
	console.log("sera");	
	document.getElementById('confirmAdicionar').style.display='none';	
}

function btnCancelarClick(){	
	document.getElementById('confirmAdicionar').style.display='none';
}

// ALARME
function addAlarm(){
		
	var resposta = navigator.mozAlarms.add(new Date().setSeconds(new Date().getSeconds()+5), "honorTimezone");

	resposta.onsuccess = function () {
	  console.log("Alarme agendado");
	};

	resposta.onerror = function () { 
	  console.log("Erro ao adicionar alarme: " + this.error.name);
	};

}

// GEOLOCATION
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
		icon: 'icon/seulocal.png'		
	});			
			
	google.maps.event.addListener(map, 'click', function(event) {
		document.getElementById("confirmAdicionar").style.display="block";
		document.getElementById("lblCoordenadas").innerHTML=eval(event.latLng);				
	});
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
				icon: 'icon/marcador.png'
			});		
			map.setCenter(latlng); 
		}			
	});
}