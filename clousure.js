
//CLOSURE de una función : variables dentro de una funcion que no pueden accederse desde afuera.
	// para acceder al contneido debemos devolver el resutaldo interno de la función con un RETURN
	// Una buena practiva de un metodo o opcion privada es colocar un guin bajo a las variables q son privadas ej. _variable / _mivariablePrivada ej. 3

//	EJEMPLO 1

function function_closure () {
	var b = 100;
	return function () {
		return b;
		console.log(b)
	}
}

	//	para acceder en el ejemplo creamos una varriable nueva y le asignamos la función de la que queremos el resultado o la variable
var n = function_closure();

	//	ejecutamos la variable nueva ej. (n)  como una función ej. n() 
		//	Esta función se vuelve la función superior o padre de la función inicial ej. (function_closure)
n();

//	EJEMPLO 2

function aumentarFuente(size){
	return function(){
		document.body.style.fontSize = size + 'px';
	}
}

var size30 = aumentarFuente(30);
var size50 = aumentarFuente(50);
var size70 = aumentarFuente(70);

size70();

//	EJEMPLO 3
// Función que se autoejecuta (function(){})()

var Contador = (function() {
// variable privada
  var _contadorPrivado = 0;

// función privada
  function cambiarValor(valor) {
    _contadorPrivado += valor;
  };

// Hacemos el return con un objeto de funciones
  return {
    incrementar: function() {
      cambiarValor(1);
    },
    decrementar: function() {
      cambiarValor(-1);
    },
    valor: function() {
      return _contadorPrivado;
    }
  };

})();

Contador.valor()
Contador.incrementar()
Contador.decrementar()


























