const listaAlumnos = [];

const loadAlumnos= async()=>{
   
    try{
        listaAlumnos.length=0;
        const respuesta=await fetch('http://localhost:3000/alumnos');

        if(!respuesta.ok){
           throw new Error('Error al cargar Alumnos. Estado: ',respuesta.status);
        }
        const Alumnos=await respuesta.json();
        listaAlumnos.push(...Alumnos);

    }catch(error){
        console.error("Error al cargar Alumnos",error.message);
    }
}

const mostrarListadoAlumnos= async ()=>{
    await loadAlumnos();
    const alumnosForm = document.getElementById('alumnos-form');
    const listadoAlumnos = document.getElementById('todosAlumnos');

    alumnosForm.style.display = "none";
    listadoAlumnos.style.display ="block";

    listadoAlumnos.innerHTML=""

   
    const ul=document.createElement('ul');

    for(const alumno of listaAlumnos){
        const li=document.createElement('li');
        li.textContent= `ID: ${alumno.id}, Nombre: ${alumno.nombre} ${alumno.apellido}, ${alumno.tipo_documento} ${alumno.numero_documento}, Residencia: ${alumno.ciudad_residencia}, Direccion: ${alumno.direccion}, Telefono: ${alumno.telefono}, Fecha Nacimiento: ${alumno.fecha_nacimiento}, Genero: ${alumno.sexo}, Programa: ${alumno.programa_id}  `;
        ul.appendChild(li);
    }

    listadoAlumnos.appendChild(ul);

    const volverButton=document.createElement('button');
    volverButton.textContent='Volver al Formulario';
    volverButton.addEventListener('click',volverAlFormularioAlumnos);
    listadoAlumnos.appendChild(volverButton);
}

//volver a ver el formulario
const volverAlFormularioAlumnos = () =>{

    const alumnosForm = document.getElementById('alumnos-form');
    const listadoAlumnos = document.getElementById('todosAlumnos');

    alumnosForm.style.display = "block";
    listadoAlumnos.style.display = "none";

}

// Aqui pa bajo es para crear los alumnos
//async = para que sea una funcion asincrona
const crearAlumno = async ()=>{
    const inputNombreAlumno = document.getElementById("nombreAlumno");
    const inputApellidoAlumno = document.getElementById("apellidoAlumno");
    const inputTipoDocumento = document.getElementById("tipoDocumento");
    const inputNumeroDocumento = document.getElementById("numeroDocumento");
    const inputCiudadResidencia = document.getElementById("ciudadResidencia");
    const inputDireccion = document.getElementById("direccion");
    const inputTelefono = document.getElementById("telefono");
    const inputFechaNacimiento = document.getElementById("fechaNacimiento");
    const inputSexo = document.getElementById("Genero");
    const inputProgramaId = document.getElementById("programaId");

    const nombreAlumno = inputNombreAlumno.value;
    const apellidoAlumno = inputApellidoAlumno.value;
    const tipoDocumento = inputTipoDocumento.value;
    const numeroDocumento = inputNumeroDocumento.value;
    const ciudadResidencia = inputCiudadResidencia.value;
    const direccion = inputDireccion.value;
    const telefono = inputTelefono.value;
    const fechaNacimiento = inputFechaNacimiento.value;
    const sexo = inputSexo.value;
    const programaId = inputProgramaId.value;

    const newAlumno ={
        id: listaAlumnos.length+1,
        nombre: nombreAlumno,
        apellido: apellidoAlumno,
        tipo_documento: tipoDocumento,
        numero_documetno: numeroDocumento,
        ciudad_residencia: ciudadResidencia,
        direccion: direccion,
        telefono: telefono,
        fecha_nacimiento: fechaNacimiento,
        sexo: sexo,
        programa_id: programaId,
    }

    await guardarAlumnoJson(newAlumno);
    await loadAlumnos();

    inputNombreAlumno.value = "";
    inputApellidoAlumno.value = "";
    inputTipoDocumento.value = "";
    inputNumeroDocumento.value = "";
    inputCiudadResidencia.value = "";
    inputDireccion.value = "";
    inputTelefono.value = "";
    inputSexo.value = "";
    inputProgramaId.value = "";
    alert ("Creacion del nuevo alumno exitosa.")
    return newAlumno
}

//guardar la informacion en el jason
const guardarAlumnoJson = async (newAlumno) => {

    try {
        const respuesta = await fetch('http://localhost:3000/alumnos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAlumno),
        });
        
        if (!respuesta.ok) {
            throw new Error('Error al registrar el Alumno. Estado: ', respuesta.status);
        }
        const alumnoCreado = await respuesta.json();

        console.log('Alumno registrado:', alumnoCreado);


    } catch (error) {
        console.log("Error al cargar ALumnos", error.meesage)
           
    }
}

const cargarFormularioAlumnos = async () => {

    await loadAlumnos();
    
    const alumnosForm = document.getElementById('alumnos-form');
    alumnosForm.innerHTML =
    `<form>

        <label for = "nombreAlumno">Nombres: </label>
        <input type = "text" id = "nombreAlumno" required> 

        <label for = "apellidosAlumno">Apellidos: </label>
        <input type = "text" id = "apellidoAlumno" required> 

        <label for = "tipoDocumento" >Tipo Documento: </label>
        <select type = "select" id = "tipoDocumento" required>
            <option value="">Selecciona un tipo de documento</option>
            <option value="CC">Cédula Cidadana</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="Carnet de identidad">Carnet de identidad</option>
        </select>

        <label for = "numeroDocumento">Número Documento: </label>
        <input type = "number" id = "numeroDocumento" required> 

        <label for = "ciudadResidencia">Ciudad Residencia: </label>
        <input type = "text" id = "ciudadResidencia" required> 

        <label for = "direccion">Direccion: </label>
        <input type = "text" id = "direccion" required> 

        <label for = "telefono">Telefono: </label>
        <input type = "number" id = "telefono" required> 

        <label for = "fechaNacimiento">Fecha de Nacimiento: </label>
        <input type = "date" id = "fechaNacimiento" required> 
               
        <label for = "sexo" >Sexo</label>
        <select type = "select" id = "Genero" required>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="No Binario">No Binario</option>
            <option value="LGBTQ">LGBTQ+</option>
            <option value="Otro">Otro</option>             
        </select> 

        <label for = "programaId">ID del Programa: </label>
        <input type = "text" id = "programaId" required> 

           


                
        <button type = "button" onclick = "crearAlumno()">Agregar Alumno</button>
        <button type = "button" onclick = "mostrarListadoAlumnos()">Mostrar Alumnos</button>
        

    </form>`
    ;
}