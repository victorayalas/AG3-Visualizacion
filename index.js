

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


var data_3 = [
  {"year": 1991, "name":"alpha", "value": 15},
  {"year": 1992, "name":"alpha", "value": 34},
  {"year": 1991, "name":"alpha2", "value": 17},
  {"year": 1992, "name":"alpha2", "value": 65},
  {"year": 1991, "name":"beta", "value": 10},
  {"year": 1992, "name":"beta", "value": 10},
  {"year": 1991, "name":"beta2", "value": 40},
  {"year": 1992, "name":"beta2", "value": 38},
  {"year": 1991, "name":"gamma", "value": 5},
  {"year": 1992, "name":"gamma", "value": 10},
  {"year": 1991, "name":"gamma2", "value": 20},
  {"year": 1992, "name":"gamma2", "value": 34},
  {"year": 1991, "name":"delta", "value": 50},
  {"year": 1992, "name":"delta", "value": 43},
  {"year": 1991, "name":"delta2", "value": 17},
  {"year": 1992, "name":"delta2", "value": 35}
]

var visualization = d3plus.viz()
    .container("#viz3")
    .data(data_3)
    .type("box")
    .id("name")
    .x("year")
    .y("value")
    .draw()