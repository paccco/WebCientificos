/** listener para cambiar en vivo las palabras censuradas */

const input = document.querySelector('#textocom');

input.addEventListener("input",filtro);


/** mostrar y ocultar la caja de comentarios */
function mostrar_ocultar(){
    var seccion = document.getElementById("cajaCom");
    if (seccion.style.display === "none") {
      seccion.style.display = "";
    } else {
      seccion.style.display = "none";
    }
}

/** al hacer clic en enviar comprobamos nombre y correo , luego ponemos el texto con su formato*/
function send(){
  var nombre = document.getElementById("name").value;
  var correo = document.getElementById("email").value;
  var texto = document.getElementById("textocom").value;

  if(nombre!="" && texto!="" && correo!=""){
    if(compruebaEmail(correo)){
      const hoy=new Date();
      var newt = document.createElement("p");
      var t = document.createTextNode(nombre+" "+hoy.toUTCString()+":\n"+texto); //formato de comentario

      newt.appendChild(t);
      document.getElementById("comen").appendChild(newt);
    }else{
      window.alert("Inserte un correo valido");
    }
  }else{
    window.alert("Rellene todos los campos porfavor");
  }
}


/** comprueba que el texto sea parecido a un correo, con que tenga una arroba y un punto vale */
function compruebaEmail(email){
  var arroba=false;
  var punto=false;

  for(i=0;i<email.length;++i){
    if(email.charAt(i)=='@')
      arroba=true;
    else if(email.charAt(i)=='.')
      punto=true;
  }

  return arroba && punto;
}

/** filtra las palabras censuradas */
function filtro(){
  let palabrasCensuradas=["puta","mierda", "subnormal", "gilipollas"];
  var texto=document.getElementById("textocom").value;

  palabrasCensuradas.forEach(palabra => {
    // Creamos una expresión regular para buscar la palabra censurada en la cadena de texto
    const patron = new RegExp("\\b" + palabra + "\\b", 'gi');
    
    // Censuramos la palabra reemplazándola con asteriscos
    texto = texto.replace(patron, '*'.repeat(palabra.length));
  });

  document.getElementById("textocom").value=texto;
}