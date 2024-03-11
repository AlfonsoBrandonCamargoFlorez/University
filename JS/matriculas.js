const listaMatriculas = [];
let horarioAsig = []; 


const loadMatriculas= async()=>{
   
    try{
        listaMatriculas.length=0;
        const respuesta=await fetch('http://localhost:3000/matriculas');

        if(!respuesta.ok){
           throw new Error('Error al cargar Matriculas. Estado: ',respuesta.status);
        }
        const Matriculas=await respuesta.json();
        listaMatriculas.push(...Matriculas);

    }catch(error){
        console.error("Error al cargar Matriculas",error.message);
    }
}

const mostrarListadoMatriculas= async ()=>{
    await loadMatriculas();
    const matriculasForm = document.getElementById('matriculas-form'); 
    const listadoMatriculas = document.getElementById('todosMatriculas');

    matriculasForm.style.display = "none";
    listadoMatriculas.style.display ="block";

    listadoMatriculas.innerHTML=""
        
    
    const ul=document.createElement('ul');

    for(const matricula of listaMatriculas){
        const li=document.createElement('li');
        li.textContent= `ID: ${matricula.id}, Estudiante ID: ${matricula.estudiante_id}, Asignatura ID: ${matricula.asignatura_id}, Periodo: ${matricula.periodo_id}, Precio: ${matricula.precio}, Horario: ${matricula.idhorario}`;
        ul.appendChild(li);
    }

    listadoMatriculas.appendChild(ul);

    const volverButton=document.createElement('button');
    volverButton.textContent='Volver al Formulario';
    volverButton.addEventListener('click',volverAlFormularioMatriculas);
    listadoMatriculas.appendChild(volverButton);
}

//volver a ver el formulario
const volverAlFormularioMatriculas = () =>{

    const matriculasForm = document.getElementById('matriculas-form');
    const listadoMatriculas = document.getElementById('todosMatriculas');

    matriculasForm.style.display = "block";
    listadoMatriculas.style.display = "none";
}





//Aui pa bajo es para crear matriculas
//async = oara que sea una funcion ascincrona
const crearMatricula = async ()=>{
    const inputEstudianteId = document.getElementById("estudianteId");
    const inputAsignaturaId = document.getElementById("asignaturaId");
    const inputPeriodoId = document.getElementById("periodoId");
    const inputPrecio = document.getElementById("precio");
    const inputIdHorario = document.getElementById("idhorario");

    const estudianteId = inputEstudianteId.value;
    const asignaturaId = inputAsignaturaId.value;
    const periodoId = inputPeriodoId.value;
    const precio = inputPrecio.value;
    const idHorario = inputIdHorario.value;

    if(!validarHorarioEstudiante()){
        return undefined;
    }

    const newMatricula ={
        id: listaMatriculas.length+1,
        estudiante_id: estudianteId,
        asignatura_id: asignaturaId,
        periodo_id: periodoId,
        precio: precio,
        idhorario: idHorario
    }

    await guardarMatriculaJson(newMatricula);
    await loadMatriculas();

    inputEstudianteId.value = "";
    inputAsignaturaId.value = "";
    inputPeriodoId.value = "";
    inputIdHorario.value = "";
    precio.value ="";
    alert ("Creacion de la nueva Matricula exitosa")
    return newMatricula
}
//guardar informacion en el jason
const guardarMatriculaJson = async (newMatricula) => {

    try {
        const respuesta = await fetch('http://localhost:3000/matriculas', {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify(newMatricula),
        });

        if (!respuesta.ok) {
            throw new Error('Error al registrar al profesor. Estado: ', respuesta.status);
        }
        const matriculaCreada = await respuesta.jason();

        console.log('Matricula Registrada', matriculaCreada);
        
    }catch (error) {
        console.log("Error al cargar las Matriculas", error.message)
    }
}

const cargarFormularioMatriculas = async () => {

    await loadMatriculas();

    const matriculasForm = document.getElementById('matriculas-form');
    matriculasForm.innerHTML =
    `<form>


        <label for = "astudianteId">ID del <b>Estudiante</b>: </label>
        <input type = "text" id = "estudianteId" required> 

        <label for = "asignaturaId">ID de la <b>Asignatura</b>: </label>
        <input type = "text" id = "asignaturaId" onchange="updateHorariosDisponibles()" required> 

        <label for = "horarioAsignatura" > Horario de la Asignatura <b>Periodo</b>: </label>
        <select type = "select" id = "idhorario" required>
          
        </select>

        <label for = "periodoId" >ID del <b>Periodo</b>: </label>
        <select type = "select" id = "periodoId" required>
            <option value="">Selecciona el periodo que quieres estudiar</option>
            <option value="2">Periodo 2</option>
        </select>

        <label for = "precio" >Precio de la Matricula: </label>
        <select type = "select" id = "precio" required>
            <option value="">2500</option>            
        </select>      

       
        
       <button type = "button" onclick = "crearMatricula()">Agregar Maticula</button>
       <button type = "button" onclick = "mostrarListadoMatriculas()">Mostrar Matriculas</button>

    </form>`
    ;
}

function updateHorariosDisponibles(){
    const idAsignaturaSeleccionada =  document.getElementById("asignaturaId").value
    const result = getAsignaturasById(idAsignaturaSeleccionada).horario_clases;
    
    if (result != undefined){
        var comboSelector = document.getElementById("idhorario");
        comboSelector.innerHTML = ''; // limpia las opciones del combo
        horarioAsig = [];
        horarioAsig.push(result);

        for(let i = 0; i < result.length; i++ ){
            agregarNuevaOpcion(comboSelector, result[i].idhorario, "Día " + result[i].dia + " desde "+ result[i].hora_inicio + " hasta" + result[i].hora_fin );
        }

    }
    
}

function agregarNuevaOpcion(comboSelector, valor, texto) {
    // Crear un nuevo elemento option
    var nuevaOpcion = document.createElement("option");
    
    // Establecer el valor y el texto de la nueva opción
    nuevaOpcion.value = valor;
    nuevaOpcion.text = texto;
    
    // Agregar la nueva opción al combobox
    comboSelector.add(nuevaOpcion);
}

function validarHorarioEstudiante() {
    const inputEstudianteId = document.getElementById("estudianteId").value;
    const inputIdHorario = document.getElementById("idhorario").value;

    const dataHorario = horarioAsig[0].find(id => id.idhorario == inputIdHorario);

    const matriculasDelEstudiante = getAsignaturasDeEstudiante(inputEstudianteId)

    const idHorariosRegistrados = matriculasDelEstudiante.map(matrix => matrix.idhorario);
    
    const asignaturaDelEstudiantes = matriculasDelEstudiante.map(mat => getAsignaturasById(mat.asignatura_id));

    const horariosDelEstudiante = asignaturaDelEstudiantes.flatMap (h => h.horario_clases)
    .filter(filtro => idHorariosRegistrados.includes(filtro.idhorario))
    .find( horario =>
        horario.dia == dataHorario.dia &&
        horario.hora_inicio == dataHorario.hora_inicio &&
        horario.hora_fin == dataHorario.hora_fin
    );

    if (horariosDelEstudiante != undefined){
        alert("El estudiante ya tiene una asignatura en el horario seleccionado.");
        return false;
    } else {
        return true;
    }

}

function getAsignaturasDeEstudiante(id){
    return listaMatriculas.filter(matricula => matricula.estudiante_id == id )
}