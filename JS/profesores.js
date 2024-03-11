const listaProfesores = [];

const loadProfesores= async()=>{
   
    try{
        listaProfesores.length=0;
        const respuesta=await fetch('http://localhost:3000/profesores');

        if(!respuesta.ok){
           throw new Error('Error al cargar Profesores. Estado: ',respuesta.status);
        }
        const Profesores=await respuesta.json();
        listaProfesores.push(...Profesores);

    }catch(error){
        console.error("Error al cargar Profesores",error.message);
    }
}

const mostrarListadoProfesores= async ()=>{
    await loadProfesores();
    const profesoresForm = document.getElementById('profesores-form');
    const listadoProfesores = document.getElementById('todosProfesores');

    profesoresForm.style.display = "none";
    listadoProfesores.style.display ="block";

    listadoProfesores.innerHTML="";

    
    const ul=document.createElement('ul');

    for(const profesor of listaProfesores){
        const li=document.createElement('li');
        li.textContent= `ID: ${profesor.id}, Nombre: ${profesor.nombre} ${profesor.apellido},  ${profesor.tipo_documento} ${profesor.numero_documetno}, Departamento ID: ${profesor.departamento_id} `;
        ul.appendChild(li);
    }

    listadoProfesores.appendChild(ul);

    const volverButton=document.createElement('button');
    volverButton.textContent='Volver al Formulario';
    volverButton.addEventListener('click',volverAlFormularioProfesores);
    listadoProfesores.appendChild(volverButton);
}

//volver a ver el formulario
const volverAlFormularioProfesores = () => {

    const profesoresForm = document.getElementById('profesores-form');
    const listadoProfesores = document.getElementById('todosProfesores');

    profesoresForm.style.display = "block";
    listadoProfesores.style.display = "none";

}

// Aqui pa bajo es para crear profesores
//async = para que sea una funcion asincrona
const crearProfesor = async ()=>{
    const inputTipoDocumento = document.getElementById("tipoDocumento")
    const inputNumeroDocumento = document.getElementById("numeroDocumento")
    const inputNombreProfesor = document.getElementById("nombreProfesor")
    const inputApellidoProfesor = document.getElementById("apellidoProfesor")
    const inputDepartamentoProfesores = document.getElementById("departamentoProfesor")

    const tipoDocumento = inputTipoDocumento.value;
    const numeroDocumento = inputNumeroDocumento.value;
    const nombreProfesor  = inputNombreProfesor.value;
    const apellidoProfesor = inputApellidoProfesor.value;
    const departamentoProfesores = inputDepartamentoProfesores.value;
    

    const newProfesor ={
        id: listaProfesores.length+1,
        tipo_documento: tipoDocumento,
        numero_documetno: numeroDocumento,
        nombre: nombreProfesor,
        apellido: apellidoProfesor,
        departamento_id: departamentoProfesores,
        
    }

    await guardarProfesorJson(newProfesor);
    await loadProfesores();

    inputTipoDocumento.value = "";
    inputNumeroDocumento.value = "";
    inputNombreProfesor.value = "";
    inputApellidoProfesor.value = "";
    alert ("Creacion del nuevo docente exitosa.")
    return newProfesor

}
//guardar informacion en el jason
const guardarProfesorJson = async (newProfesor) => {

    try {
        const respuesta = await fetch('http://localhost:3000/profesores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProfesor),
        });

        if (!respuesta.ok) {
            throw new Error('Error al registrar el profesor. Estado: ', respuesta.status);
        }
        const profesorCreado = await respuesta.json();

        console.log('Profesor registrado:', profesorCreado);


    } catch (error) {
        console.log("Error al cargar Profesores", error.meesage)

    }



}

//departamento profesores
const departamentoProfesores = () => {
    let opcionesDepartamento = '';
    for(const departamento of listaDepartamentos){
        opcionesDepartamento += ` <option value = ${departamento.id}>${departamento.nombre}</options>`
    }

    return opcionesDepartamento
}


const cargarFormularioProfesores = async () => {

    await loadDepartamentos();

    const profesoresForm = document.getElementById('profesores-form');
    profesoresForm.innerHTML = 
    `<form>

        <label for = "tipoDocumento" >Tipo Documento: </label>
        <select type = "select" id = "tipoDocumento" required>
            <option value="">Selecciona un tipo de documento</option>
            <option value="CC">Cédula Cidadana</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="Carnet de identidad">Carnet de identidad</option>
        </select>

        <label for = "numeroDocumento">Número Documento: </label>
        <input type = "number" id = "numeroDocumento" required> 

        <label for = "nombreProfesor">Nombres: </label>
        <input type = "text" id = "nombreProfesor" required> 

        <label for = "apellidosProfesor">Apellidos: </label>
        <input type = "text" id = "apellidoProfesor" required> 



        <label for = "departamentoProfesor" >Departamento del Profesor: </label>
        <select id = "departamentoProfesor" required>
            ${departamentoProfesores()}
        </select>
        
        <button type = "button" onclick = "crearProfesor()">Agregar Docente</button>
        <button type = "button" onclick = "mostrarListadoProfesores()">Mostrar Docentes</button>

    </form>`
    ;
}

