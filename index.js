//Determina el top
var TOP =10;


const url = "https://raw.githubusercontent.com/raul27868/07MBIG-Visualizacion-Actividades-Guiadas/master/movies.csv";

//Funcion para obtener subarrays
function getSubarray(array, fromIndex, toIndex) {
  return array.slice(fromIndex, toIndex+1);
}
 




//CArga el fichero y realiza las transformaciones para crear los gráficos.
d3.csv(url, function(data) {

  console.log("Datos", getSubarray(data, 0, 10));

  //Carga los generos:agrupa y elimina los nulos
  generos =   [...new Set(data.map(d => d['Major Genre']))].filter(elem =>  elem  != "");

  console.log("Generos", generos );


  //Carga el combo con los generos.            
  generos.map(g => $('#generos').append($('<option>', {     value: g,     text: g  })) );
  
  //Detecta el cambio del combo
  $("#generos").change(function(){
    if ($("#generos").val() != 'Select'){
      //filtra los datos
      var new_data = data.filter(elem =>  elem['Major Genre']  == $("#generos").val() );
    }
    else{
      new_data = data;
    }
    //Ordena por Worldwide Gross
    new_data = new_data.sort((a, b) => {
      return b['Worldwide Gross'] - a['Worldwide Gross'];
    });

    //Nos quedamos con los top 10
    new_data= getSubarray(new_data, 0, TOP);
    console.log( $("#generos").val(),  getSubarray(new_data, 0, 5));

    visualiza(new_data);
  });

});
 
function visualiza(data){
  
  var prepared_data = data.map(d=> { return {"Titulo":d['Title'],"Genero": d['Major Genre'] , "Total": parseFloat(d['Worldwide Gross']) }} );

  //Borra el grafico actual
  $("#viz1").html("");

  //Visualiza el gráfico con los nuevos datos.
  var visualization = d3plus.viz()
  .container("#viz1")
  .data(prepared_data    )
  .type("bar")
  .id("Genero")
  .x("Titulo")
  .y("Total")
  .order("Total")
  .draw()
  }

d3.json("https://raw.githubusercontent.com/raul27868/07MBIG-Visualizacion-Actividades-Guiadas/master/columnas.json", function(data) {
var visualization = d3plus.viz()
.container("#viz2")
.data(data)
.type('bar')
.id('name')
.x('year')
.y('value')
.axes({ ticks: 'false' })
.draw();
});