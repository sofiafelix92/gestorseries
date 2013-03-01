function listado_series(pageNumber){  
    
    var records=$.getValues("Servlet?id=getpages");
    var pages= $.getValues("Servlet?id=getpages");    
    var series=$.getValues("Servlet?id=getpage&page="+pageNumber);    
    var tabla=      "<table class='tablaserie table-bordered table-hover'>"
    
    tabla +=    "<tr>"
    tabla +=            "<th>Id</th>"
    tabla +=            "<th>Nombre Serie</th>"
    tabla +=            "<th>Año</th>"
    tabla +=            "<th>Opciones</th>"
    tabla +=            "<th>Actores</th>"
    tabla +=    "</tr>";               
    $.each(series, function(index, serie) {
        tabla += "<tr>"                
        tabla +=        "<td>"
        tabla +=            "<p>" +serie.id+"</p>"
        tabla +=        "</td>" 
                
        tabla +=        "<td>"
        tabla +=             "<p>" +serie.nombre+"</p>"
        tabla +=        "</td>" 
                
        tabla +=        "<td>"
        tabla +=             "<p>" +serie.año+"</p>"
        tabla +=        "</td>"  
                
        tabla +=        "<td>"
        tabla +=            "<a class='btn ver_serie' href=\"#myModal\" data-toggle=\"modal\" data-id="+serie.id+"><i class='icon-eye-open'></i> <strong>View</strong></a>"
        tabla +=            "<a class='btn editar_serie' href=\"#myModal\" data-toggle=\"modal\" data-id="+serie.id+"><i class='icon-edit'></i> <strong>Edit</strong></a>"
        tabla +=            "<a class='btn eliminar_serie' data-id="+serie.id+"><i class='icon-trash'></i> <strong>Delete</strong></a>"
        tabla +=        "</td>"    
                
        tabla +=        "<td>"
        tabla +=             "<a class='btn ver_actores_serie' href=\"#myModal\" data-toggle=\"modal\" data-id="+serie.id+"><i class='icon-eye-open'></i> <strong>Actores</strong></a>"
        tabla +=        "</td>"                                      
        tabla +=  "</tr>";                   
    });     
    
    tabla +=    "</table>"; 

    tabla +=   "<a class='btn nueva_serie' href=\"#myModal\" data-toggle=\"modal\">"
    tabla +=       "<i class='icon-plus'></i>"
    tabla +=       "<strong>Nueva Serie</strong>"
    tabla +=   "</a>"
            
            
    tabla +=  getNeighborhood("index.jsp?ver=series&pagenumber=", pageNumber, pages, 10); 
    
    $("#divtabla").empty();
    $("#divtabla").append(tabla);                                                      
    $(".ver_serie").click(function(){                
        detalle_serie($(this).data('id'))                        
    });                 
    $(".editar_serie").click(function(){
        editar_serie($(this).data('id'))       
    });        
    $(".eliminar_serie").click( function(){
        var confirmacion=confirm('Esta seguro que desea eliminar la serie?');        
        if (confirmacion){
            eliminar_serie($(this).data('id'))
        }
    });
    $(".ver_actores_serie").click( function(){
        ver_actores_serie($(this).data('id'))
    });
    $(".nueva_serie").click( function(){
        crear_serie()
    });
    
}

function detalle_serie(id){            
    $("#modal_cuerpo").html("<img src='img/loading.gif' width=40 height=40 alt='cargando...' />");
    $.ajax({                    
        url: 'Servlet?id='+id, 
        dataType: 'json',
        type: "GET",
        success: 
        function(serie){                                
            if(serie.id_serie == 0){
                $("#modal_cuerpo").empty(); 
                $("#modal_cuerpo").append("<p>El id no existe.</p>");                
            }else{                    
                $("#modal_cuerpo").empty();                 
                $("#modal_cuerpo").append(                            
                    "<div class='grande-datos'>",   
                    
                    "<div class='info-datos'>",                   
                    "<strong class='text-success'>Id: "+serie.id+"</strong><br>",
                    "<strong class='text-success'>Nombre: "+serie.nombre+"</strong><br>",
                    "<strong class='text-success'>Canal: "+serie.canal+"</strong><br>",
                    "<strong class='text-success'>Numero de Temporadas: "+serie.tempordas+"</strong><br>",
                    "<strong class='text-success'>Numero de Capitulos: "+serie.capitulos+"</strong><br>",
                    "<strong class='text-success'>Año: "+serie.año+"</strong>",
                    "</div>",

                    "<div>",
                    "<img src='img/himym.jpg' class='img-polaroid foto-serie'>",
                    "</div>", 

                    "</div>"
                    );      
            }          
        },      
        error: function(){                
            if(id ==""){                    
                $("#modal_cuerpo").empty(); 
                $("#modal_cuerpo").append("<p>Debe introducir un id.</p>");                    
            }
        }            
    });    
}
function eliminar_actor_serie(id_serie,id_actor){ 
    $("#modal_cuerpo").html("<img src='img/loading.gif' width=40 height=40 alt='eliminando...' />");
    $.ajax({                    
        url: 'EliminarActorSerieServlet?serie_id='+id_serie+'&actor_id=+'+id_actor, 
        dataType: 'text',
        type: "POST",
        success: 
        function(text){                        
            $("#modal_cuerpo").empty(); 
            $("#modal_cuerpo").append("<p>"+text+"</p>");                                                                  
            listado_series(0);
        },      
        error: function(){                
            if(id ==""){                    
                $("#modal_cuerpo").empty(); 
                $("#modal_cuerpo").append("<p>Debe introducir un id.</p>");                    
            }
        }            
    });  
 
    
}
function agregar_actor_serie(id_serie,id_actor){   
    alert(id_serie+":"+id_actor);
    $.ajax({                    
        url: 'AgregarActorSerieServlet?serie_id='+id_serie+'&actor_id=+'+id_actor, 
        dataType: 'text',
        type: "POST",
        success: 
        function(text){                        
            listado_series(0);
        },      
        error: function(){                
            if(id ==""){                    
                $("#modal_cuerpo").empty(); 
                $("#modal_cuerpo").append("<p>Debe introducir un id.</p>");                    
            }
        }            
    });  
 
    
}


function eliminar_serie(id){   
    $("#modal_cuerpo").html("<img src='img/loading.gif' width=40 height=40 alt='eliminando...' />");
    $.ajax({                    
        url: 'EliminarSerieServlet?id='+id, //8088 casa - 8884clase
        dataType: 'text',
        type: "POST",
        success: 
        function(text){                                    
            listado_series(0);
        },      
        error: function(){                
            if(id ==""){                    
                $("#modal_cuerpo").empty(); 
                $("#modal_cuerpo").append("<p>Debe introducir un id.</p>");                    
            }
        }            
    });  
 
}

function editar_serie(id){   
    $("#modal_cuerpo").html("<img src='img/loading.gif' width=40 height=40 alt='cargando...' />");
    $.ajax({                    
        url: 'Servlet?id='+id,
        dataType: 'json',
        type: "GET",
        success: 
        function(serie){                                
            if(serie.id_serie == 0){
                $("#modal_cuerpo").empty();                 
                $("#modal_cuerpo").append("<p>El id no existe.</p>");                
            }else{                    
                $("#modal_cuerpo").empty();    
                var form=
                 
                "<form action='ActualizarSerieServlet' name='actualiza_serie_form'>"+ 
                    
                "<input name='id' type='hidden' value='"+serie.id+"'/>"+                    									 
                "<label>Nombre</label>"+  
                "<input name='nombre' type='text' value='"+serie.nombre+"' class='input-large'/>"+  											 
                "<label>Canal</label>"+  
                "<input name='canal' type='text' value='"+serie.canal+"' class='input-large'/>"+ 											 
                "<label>Numero de Temporadas</label>"+  
                "<input name='temporadas' type='text' value='"+serie.temporadas+"' class='input-large'/>"+  											 
                "<label>Numero de Capitulos</label>"+  
                "<input name='capitulos' type='text' value='"+serie.capitulos+"' class='input-large'/>"+							 
                "<label>Año</label>"+  
                "<input name='anyo' type='text' value='"+serie.año+"' class='input-large'/>"+ 

                "<div>"+  
                "<button name='save-serie' type='submit' class='btn btn-primary'>Submit</input>"+  
                "</div>"+          
                    
                "</form>";                                
                $("#modal_cuerpo").append(form);      
            }          
            
        },      
        error: function(){
                
            if(id == ""){                    
                $("#modal_cuerpo").empty(); 
                $("#modal_cuerpo").append("<p>Debe introducir un id.</p>");
                    
            }
        }
    });        
}

function crear_serie()
{        
    $("#modal_cuerpo").empty();    
    var form =
        
    "<form action='GuardarSerieServlet'>"+     
    "<label>Nombre</label>"+  
    "<input name='nombre' type='text' class='input-large'/>"+  											 
    "<label>Canal</label>"+  
    "<input name='canal' type='text' class='input-large'/>"+ 											 
    "<label>Numero de Temporadas</label>"+  
    "<input name='temporadas' type='text' class='input-large'/>"+  											 
    "<label>Numero de Capitulos</label>"+  
    "<input name='capitulos' type='text' class='input-large'/>"+							 
    "<label>Año</label>"+  
    "<input name='anyo' type='text' class='input-large'/>"+ 

    "<div>"+  
    "<button name='save-serie' type='submit' class='btn btn-primary'>Submit</input>"+  
    "</div>"+ 

    "</form>"; 

    $("#modal_cuerpo").append(form);      
}          
         
         
function ver_actores_serie(id){
    $("#modal_cuerpo").html("<img src='img/loading.gif' width=40 height=40 alt='cargando...' />");    
    var actores=$.getValues("ActoresSerieServlet?id="+id);     
    if(actores.length == 0){
        $("#modal_cuerpo").empty(); 
        $("#modal_cuerpo").append("<p>La serie no tiene actores</p>");                
    }else{    
        $("#modal_cuerpo").empty();                
        var tabla=      "<table class='tablaactores table table-hover'>"
        tabla += "<tr>"
        tabla +=       "<th>Id</th>"
        tabla +=       "<th>Nombre</th>"
        tabla +=       "<th>Apellido</th>"    
        tabla +=       "<th>Opciones</th>" 
        tabla += "</tr>"          
        $.each(actores, function(index, actor) {            
            tabla += "<tr>"                
            tabla +=        "<td>"
            tabla +=            "<p>" +actor.id+"</p>"
            tabla +=        "</td>"                   
            tabla +=        "<td>"
            tabla +=            "<p>" +actor.nombre+"</p>"
            tabla +=        "</td>"                                                         
            tabla +=        "<td>"
            tabla +=            "<p>" +actor.ape2+"</p>"
            tabla +=        "</td>"
            tabla +=        "<td>"
            tabla +=          "<a class='btn eliminar_actor_serie' data-serie_id="+id+" data-actor_id="+actor.id+"><strong>Eliminar</strong></a>"
            tabla +=        "</td>"
            tabla += "</tr>"                     
        });                
        tabla +=    "</table>";             
        tabla += "<div>"                       
        tabla +=        "<button > Agregar Actor </button>"                            
        tabla +=          "<table id='tabla_actores' cellpadding='7' width='40%' border='1' align='center'>"
        tabla +=          "<thead>"
        tabla +=          "<tr>"
        tabla +=          "<th>Nombre</th>"
        tabla +=          "<th>Apellido</th>"		
        tabla +=          "<th>Serie</th>"
        tabla +=          "<th>Opciones</th>"
        tabla +=          "</tr>"
        tabla +=          "</thead>"
        tabla +=          "<tbody>"     
        var actores2=$.getValues("ServletActores?id=all"); 
        $.each(actores2, function(index, actor) {            
            tabla += "<tr>"                
            tabla +=        "<td>"
            tabla +=            "<p>" +actor.id+"</p>"
            tabla +=        "</td>"                   
            tabla +=        "<td>"
            tabla +=            "<p>" +actor.nombre+"</p>"
            tabla +=        "</td>"                                                         
            tabla +=        "<td>"
            tabla +=            "<p>" +actor.ape2+"</p>"
            tabla +=        "</td>"
            tabla +=        "<td>"
            tabla +=          "<a class='btn agregar_actor_serie' data-serie_id="+id+" data-actor_id="+actor.id+"><strong>Agregar</strong></a>"
            tabla +=        "</td>"
            tabla += "</tr>"                
        });        

        tabla +=        "</td>"
        tabla += "</tr>"                                                         
        tabla +=          "</tbody>"
        tabla +=          "</table>"                                                 
        tabla +=  "</div>"  
                                                                                        
    }
            
            
      
    $("#modal_cuerpo").append(tabla);                                                    
    $(".eliminar_actor_serie").click(function(){                
        eliminar_actor_serie($(this).data('serie_id'),$(this).data('actor_id'))
        ver_actores_serie(id);
    }); 
    $(".agregar_actor_serie").click(function(){          
        agregar_actor_serie($(this).data('serie_id'),$(this).data('actor_id'))
        ver_actores_serie(id);
    });    
            
    $(document).ready(function(){
        $("#tabla_actores").hide();
        $("button").click(function(event){
            var desplegable = $(this).next();
            $('.tabla_actores').not(desplegable).slideUp('fast');
            desplegable.slideToggle('fast');
            event.preventDefault();
        })
    });
            
            
                              

}        
    
function getNeighborhood(link,  page_number, total_pages, neighborhood) { 
    page_number=parseInt(page_number);
    total_pages=parseInt(total_pages);
    neighborhood=parseInt(neighborhood);
    vector = "<div class=\"pagination\"><ul>";
    if (page_number > 1)
        vector+=("<li><a class=\"pagination_link\" id=\"" + (page_number - 1) + "\" href=\"" + link + (page_number - 1) + "\">prev</a></li>");
    if (page_number > neighborhood + 1)
        vector+=("<li><a class=\"pagination_link\" id=\"1\" href=\"" + link + "1\">1</a></li>");
    if (page_number > neighborhood + 2)
        vector+=("<li>" + "<a href=\"#\">...</a>" + "</li>");
    for (i = (page_number - neighborhood); i <= (page_number + neighborhood); i++){
        if (i >= 1 && i <= total_pages){
            if (page_number == i){
                vector+=("<li class=\"active\"><a class=\"pagination_link\" id=\"" + i + "\" href=\"" + link +     i + "\">" + i + "</a></li>");
            }            
            else
                vector+=("<li><a class=\"pagination_link\" id=\"" + i + "\" href=\"" + link + i + "\">" + i + "</a></li>");
        }
    }
    if (page_number < total_pages - (neighborhood + 1))
        vector+=("<li>" + "<a href=\"#\">...</a>" + "</li>");
    if (page_number < total_pages - (neighborhood))
        vector+=("<li><a class=\"pagination_link\" id=\"" + total_pages + "\" href=\"" + link + total_pages + "\">" + total_pages + "</a></li>");
    if (page_number < total_pages)
        vector+=("<li><a class=\"pagination_link\"  id=\"" + (page_number + 1) + "\" href=\"" + link + (page_number + 1) + "\">next</a></li>");        
    vector += "</ul></div>";
    return vector;
}           

function ajaxCallSync(url, type, data) {
    var result;
    $.ajax({
        type: type,
        url: url,
        datatype: 'json',
        timeout: 30000,
        success: function(data2){
            result=data2;
        }
    }            
    );       
    return {
        getResult : function(){
            if (result) return result;
        }
    };
}; 

jQuery.extend({
    getValues: function(url) {
        var result = null;
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            async: false,
            success: function(data) {
                result = data;
            }
        });
        return result;
    }
});

//http://www.emenia.es/lista-desplegable-y-plegable-con-jquery/

// http://www.jqueryeasy.com/2012/05/19/filtrar-y-ordenar-una-tabla-mysql-con-ajax/
