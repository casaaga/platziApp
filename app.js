// API REST (SI CIMPLE TODOS LOS METODOS)
	// Forma de comuncarse con el backend o servidor para pedir datos
	// LA petición devuelve un objeto en javascript JSON
	// Metodos de Petición	
		// GET | Devuelve recurso o lista de recursos 
		// POST | Registra un nuevo recurso
		// PUT | Actualiza recurs
		// DELETE | Borra recurso
	// Codigos de petición
		// 200 TODO OK
		// 300 RECURSO movido y sera redirigido 
		// 400 | 403 Recurso prohibido o no existe
		// 500 Error de Servidor

// AACESOS AL CONTENIDO DE APIS
	// JSONP - PADDING
		// Leer APIs publicas - Metido GET
	// CROSS ORIGIN RESOURCE SHARING
		// Leer API | Metodos GET POST PUT DELET
		// Se configura en el servidor cuando se crea una API


//	Ajax	>	peticiones asincrónicas de javascript con el servidor | peticiones y resultados sin tener que cambiar la pagina
//	jQuery	>	Libreria qye extiende JS
//	CDN 	> 	Content delivery network | https://developers.google.com/speed/libraries/

// GEOLOCATION
	//	navigator.geolocation.getCurrentPosition(coords, error) | parametros enviados

// $(document).ready(function(){
// 	alert('Hola Mama')	
// })

//	localstorage se crea para guardar información tempral de algunos elementos.
	//	Los elementos del storage se generan como string.
	// 	la forma de acceder a los datos del storage es varias formas 1.) localstorage.curso (curso = al elemento que se crea para cuardar los datos en el objeto.)
		// 	2.)  localstorage.setItem('cursos', JSON.stringify(cursos));
	// 	para convertis los elementos en un objeto se usa JSON.parse(elemento que tenga el string)



// Iniciar function CLOUSEURE
(function(){

//	Variables continuas, en este caso las que pide consitatemente un requerimiento son las KEY y las URL de la API
	var API_WEATHER_KEY_TIEMPO 	= 'd6a4075ceb419113c64885d9086d5';
	var API_WEATHER_KEY_CLIMA 	= '80114c7878f599621184a687fc500a12';
	var API_WEATHER_URL 		= 'http://api.openweathermap.org/data/2.5/weather?APPID=' + API_WEATHER_KEY_CLIMA + '&';

//	Variables continuas: en este caso se pone la url de la imagen q trae la API para el icono del estado
	var IMG_WEATHER 			= "http://openweathermap.org/img/w/";
//	new Date() crea un nuevo objeto de fecha actual en JS
	var today = new Date();
	var timeNow = today.toLocaleTimeString();
//	variables
	var $body = $('body');
	var $loader = $('.loader');
	var nombreNuevaCiudad =  $("[data-input='cityAdd']");
	var buttonAdd =  $("[data-button='add']");
	var buttonLoad =  $("[data-save='cities']");
//	Se crea un array vacio para almacenar los datos de las ciudades en el storage
	var cities = [];
//	Objeto de variables
	var cityWeather = {};
//	variables
	//	variables, los nombres son a gusto, no estan relacionado por ahora con la API
	cityWeather.zone;
	cityWeather.icon;
	cityWeather.temp;
	cityWeather.temp_max;
	cityWeather.temp_min;
	cityWeather.main;


//	Evento de lectura del click search del formulario de ciudades
	$( buttonAdd ).on('click', addNewCity);
//	Evento de lectura del input cityAdd para cada presión de la tecla enter
	$( nombreNuevaCiudad ).on('keypress', function (event) {
		// console.log(event.which);
		if (event.which == 13) {
			addNewCity(event);
		};
	})
// 	Mostrar elementos del storage
	$(buttonLoad).on('click', loadSaveCities)

	// Validamos si el navegador soporta geolocation
	if (navigator.geolocation) {
		
		navigator.geolocation.getCurrentPosition(getCoords, errorLocalizacion);

	} else{
		alert('Actualiza el navegador')
	};

	function errorLocalizacion(error){
		alert('Ocurrio un error' + error.code)
		//	0: Error desconocido
		//	1: Permiso denegado
		//	2: Posición no disponible
		//	3: Timeout
	}

	//	position es parametro en el que almacenamos  la información del objetoque trae localización
	//	https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition\

	function getCoords(position){
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;

		console.log('tu posición es ' + lat + ' , ' + lon);

		$.getJSON(API_WEATHER_URL + 'lat=' + lat + '&lon=' + lon, getCurrentWeahter) 
		// getCurrentWeahter es la función que se crea para que almacene la respuesta del servidor que trae el JSON de la API.
	};

	function getCurrentWeahter(data){ // la respuesta la almacenamos en el parametro (data) luego podemos trabajar los datos del api con el parametro data
		

		cityWeather.zone 		= data.name; // esta en la raiz del OBJETO
		// cityWeather.icon 		= "http://openweathermap.org/img/w/" + data.weather[0].icon + '.png'; // El objeto icon esta dentro de un array [0]
		cityWeather.icon 		= IMG_WEATHER + data.weather[0].icon + '.png'; // El objeto icon esta dentro de un array [0]
		cityWeather.temp		= Math.floor(data.main.temp - 273.15);	
		cityWeather.temp_max	= data.main.temp_max  - 273.15;	// El objeto viene con temperatura celcius, con la resta lo pasamos a GRADOS CENTIGRADOS
		cityWeather.temp_min	= data.main.temp_min - 273.15;	
		cityWeather.main		= data.weather[0].main ;	// El objeto icon esta dentro de un array [0]

		// console.log(data)

		// render de la función del render del html (las funciones se crean luego)
		renderTemplate(cityWeather);
	}

//	Render Template

//	FUncción para activar el template
//	argumento o parametro es el (id o css etc...) del elemento html para poderlo re utilizar
	function activateTemplate (id) {
		// querySelector api del DOM que nos permite acceder a los elementos de HTML
		var t = document.querySelector(id); 

		return	document.importNode(t.content, true);

	}

//	Función para render el contenido
	function renderTemplate (cityWeather) {
		
		// enviamos el id del template q vamos a activar
		var clone = activateTemplate('#template--city');

		clone.querySelector('[data-time]').innerHTML = timeNow;
		clone.querySelector('[data-city]').innerHTML = cityWeather.zone ; // atributo innerHMTL se usa si es un elemento html completo ej h3
		clone.querySelector('[data-icon]').src = cityWeather.icon ; // atributo src se susa para imagenes
		clone.querySelector('[data-temp="max"]').innerHTML = cityWeather.temp_max.toFixed(1) ;
		clone.querySelector('[data-temp="min"]').innerHTML = cityWeather.temp_min.toFixed(1) ; // toFixed(0) modifica los decimales de un numero decimal
		clone.querySelector('[data-temp="current"]').innerHTML = cityWeather.temp.toFixed(1) ;


		// $('.loader').hide(); // Oculatamos el mensaje de espera.
		$($loader).hide(); 
		// $('body').append(clone);
		$($body).append(clone);
	}

//	Función para leer el input de busqueda de ciudad

function addNewCity (event) {

	event.preventDefault();
	$.getJSON(API_WEATHER_URL + 'q=' + $(nombreNuevaCiudad).val(), getWatherNewCity);
	// console.log('click')
}

function getWatherNewCity (data) {
	// console.log(data)
// Limpiar el input text luego de enviar una consulta
	$(nombreNuevaCiudad).val('');

	cityWeather = {}
	cityWeather.zone 		= data.name;
	cityWeather.icon 		= IMG_WEATHER + data.weather[0].icon + '.png';
	cityWeather.temp		= Math.floor(data.main.temp - 273.15);	
	cityWeather.temp_max	= data.main.temp_max  - 273.15;	
	cityWeather.temp_min	= data.main.temp_min - 273.15;	

	renderTemplate(cityWeather);
// 	push() metodo de array en JS, nos permite enviar información al array
	cities.push(cityWeather);
// 	Tenemos en el storage del sitio los datos de la consulta realizada.
	localStorage.setItem('cities', JSON.stringify(cities));
}

//	Mostrar elementos que estan en el storage luefo del boton enviar.

function loadSaveCities (event) {
	event.preventDefault();

	function renderCities(cities){
		cities.forEach(function(city){
			renderTemplate(city);
		})
	}

	var cities = JSON.parse(localStorage.getItem('cities'));
	renderCities(cities)
}

})();






























