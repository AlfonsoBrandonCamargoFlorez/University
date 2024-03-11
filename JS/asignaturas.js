const listaAsignaturas = [];
const loadAsignaturas= async()=>{
   
    try{
        listaAsignaturas.length=0;
        const respuesta=await fetch('http://localhost:3000/asignaturas');

        if(!respuesta.ok){
           throw new Error('Error al cargar Asignaturas. Estado: ',respuesta.status);
        }
        const Asignaturas=await respuesta.json();
        listaAsignaturas.push(...Asignaturas);

    }catch(error){
        console.error("Error al cargar Asignaturas",error.message);
    }
}

const mostrarListadoAsignaturas= async ()=>{
    await loadAsignaturas();
    const asignaturasForm = document.getElementById('asignaturas-form');
    const listadoAsignaturas = document.getElementById('todosAsignaturas');

    asignaturasForm.style.display = "none";
    listadoAsignaturas.style.display = "block";

    listadoAsignaturas.innerHTML=""
        
    
    const ul=document.createElement('ul');

    for(const asignatura of listaAsignaturas) {
        const li=document.createElement('li');
        li.textContent= `ID: ${asignatura.id}, Curso ID: ${asignatura.curso_id}, Cod: ${asignatura.codigo}, Creditos: ${asignatura.creditos}, Profesor ID: ${asignatura.profesor_id}, Cupos disponibles: ${asignatura.cupos_disponibles}, Programa ID ${asignatura.programa_id}, 
        ${
            asignatura.horario_clases.map( function(x) {
            return  'Horario Clase: ' + x.dia + ' desde las ' + x.hora_inicio + ' hasta las '+ x.hora_fin
        })
    }`;
        ul.appendChild(li);
    }

    listadoAsignaturas.appendChild(ul);

    const volverButton=document.createElement('button');
    volverButton.textContent='Volver al Formulario';
    volverButton.addEventListener('click',volverAlFormularioAsignaturas);
    listadoAsignaturas.appendChild(volverButton);
      

}

function actualizarCapacidad(){
    const inputSalonId = document.getElementById("salon_id");
    const salondID = inputSalonId.value;
    const inputCapacidad = document.getElementById("cuposDisponibles");
    const capacidad = findSalonById(salondID).capacidad_alumnos;
    inputCapacidad.value = capacidad
}

function obtenerCodigoCurso(){
    const inputSalonId = document.getElementById("cursoId");
    const cursoId = inputSalonId.value
    const codigoCurso = document.getElementById("codigo");
    const codigo = findCursoById(cursoId).codigo;
    codigoCurso.value = codigo;
}

//volver a ver el formulario
const volverAlFormularioAsignaturas = () =>{

    const asignaturasForm = document.getElementById('asignaturas-form');
    const listadoAsignaturas = document.getElementById('todosAsignaturas');

    asignaturasForm.style.display = "block";
    listadoAsignaturas.style.display = "none";

}



// Aqui pa bajo es para crear las asignaturas
//async = para que sea una funcion asincrona

const crearAsignatura = async ()=>{
    const inputCursoId = document.getElementById("cursoId");
    const inputCodigo = document.getElementById("codigo");
    const inputCreditos = document.getElementById("creditos");
    const inputProfesorId = document.getElementById("profesorId");
    const inputProgramaId = document.getElementById("programaId");
    const inputCuposDisponibles = document.getElementById("cuposDisponibles");    
    const inputDia = document.getElementById("dia");
    const inputHoraIni = document.getElementById("hora_inicio"); 
    const inputHoraFin = document.getElementById("hora_fin");
    const inputSalonId = document.getElementById("salon_id");
    
    if(!validadHorario()){
        return undefined;
    }


    const idAsignatura = listaAsignaturas.length+1;

    const cursoId = inputCursoId.value;
    const codigo = inputCodigo.value;
    const creditos = inputCreditos.value;
    const profesorId = inputProfesorId.value;
    const programaId = inputProgramaId.value;
    const cupos_disponibles = inputCuposDisponibles.value;
    const horarioClases = [{
        idhorario: (idAsignatura + "" + 1),
        dia: inputDia.value,
        hora_inicio: inputHoraIni.value,
        hora_fin: inputHoraFin.value,
        salon_id: inputSalonId.value
        }
    ]

    console.log(horarioClases)

    const newAsignatura ={
        id: idAsignatura,
        curso_id: cursoId,
        codigo: codigo,
        cupos_disponibles: cupos_disponibles,
        creditos: creditos,
        profesor_id: profesorId,
        programa_id: programaId,
        horario_clases: horarioClases,
    }

    await guardarAsignaturaJson(newAsignatura);
    await loadAsignaturas();

    inputCursoId.value = "";
    inputCodigo.value = "";
    inputCreditos.value = "";
    inputProfesorId.value = "";
    inputProgramaId.value = "";    
    
    alert ("Creacion de nueva Asignatura exitosa.")
    return newAsignatura
}
//guardar informacion en el jason
const guardarAsignaturaJson = async (newAsignatura) => {
    
    try {
        const respuesta = await fetch('http://localhost:3000/asignaturas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAsignatura),
        });

        if (!respuesta.ok) {
            throw new Error('Error al registrar la Asignatura. Estado: ', respuesta.status);
        }
        const asignaturaCreado = await respuesta.json();

        console.log('Asignatura registrado:', asignaturaCreado);


    } catch (error) {
        console.log("Error al cargar Asignaturas", error.meesage)

    }
}

const cargarFormularioAsignaturas = async () => {

    await loadAsignaturas();    

    const asignaturasForm = document.getElementById('asignaturas-form');
    asignaturasForm.innerHTML =
    `<form>

    <label for = "cursoId"><br>ID del Curso:</br> </label>
    <input type = "text" id = "cursoId" onchange="obtenerCodigoCurso()" required>

    <div style="display:none">
        <label for = "codigo"><br>Codigo del Curso:</br> </label>
        <input type = "text" id = "codigo" disabled>
    </div>

    <label for = "creditos"><br>Creditos que costara:</br> </label>
    <input type = "number" id = "creditos" required>

    <label for = "profesorId"><br>ID del Profesor</br> </label>
    <input type = "text" id = "profesorId" required>

    <label for = "salon_id"><br>Seleccione el salon </br> </label>
    <select id="salon_id" onchange="actualizarCapacidad()">
    ${
        listaSalones.map (function (salon) {
            return "<option value='" + salon.id +  "'>" + salon.numero_identificacion +"</option>"
        })

    };
    </select>

    <label for = "cuposDisponibles"><br>Cupos Disponibles</br> </label>
    <input type = "number" id = "cuposDisponibles" disabled>

    <label for = "programaId"><br>ID del <b>Programa</b></br> </label>
    <input type = "text" id = "programaId" required>

    <label for = "horario" >Elije tu Horario: </label>
    <br>
    <div class="box">
        <div class="inline">
            <select id="hora_inicio" onchange=validadHorario()>
                <optgroup label="Mañana">
                    <option value="8:00">8:00 AM</option>
                    <option value="9:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                  </optgroup>
                <optgroup label="Tarde">
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                </optgroup>
            </select>
            <div>-</div>
            <select id="hora_fin" onchange=validadHorario()>
                <optgroup label="Mañana">
                    <option value="8:00">8:00 AM</option>
                    <option value="9:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                </optgroup>
                <optgroup label="Tarde">
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                </optgroup>
            </select>
            
        </div>
        <label for = "horario" >Día: </label>
        <select id="dia">
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
            </select>
        

        <div class="align_buttons">
            <button type = "button" onclick = "crearAsignatura()">Agregar Asignatura</button>
            <button type = "button" onclick = "mostrarListadoAsignaturas()">Mostrar Asignaturas</button>
        </div>
    </div>

    </form>`
    ;

    actualizarCapacidad();
}

function validadHorario(){
    const horaIni = document.getElementById("hora_inicio").value; 
    const horafin = document.getElementById("hora_fin").value;

    const fecha1 = new Date("2000-01-01T" + (horaIni.length == 5 ? horaIni: "0"+horaIni) + ":00");
    const fecha2 = new Date("2000-01-01T" + (horafin.length == 5 ? horafin: "0"+horafin) + ":00");

    // Comparar las horas
    if (fecha1 >= fecha2) {
        alert('la hora inicial no puede ser mayor o igual a la final.')
        return false
    } else {
        return true;
    }
}

function getAsignaturasById(id){
    return listaAsignaturas.find(asignatura => asignatura.id == id )
}

function getHorarioById(id){
    return listaAsignaturas.find(asignatura => asignatura.horario_clases.idhorario == id ).map(function(asignatura){ asignatura.horario_clases.find(
        function(horario) { horario.idhorario == id } ) })
}

