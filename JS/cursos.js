const listaCursos = [];

const loadCursos= async()=>{
   
    try{
        listaCursos.length=0;
        const respuesta=await fetch('http://localhost:3000/cursos');

        if(!respuesta.ok){
           throw new Error('Error al cargar Cursos. Estado: ',respuesta.status);
        }
        const Cursos=await respuesta.json();
        listaCursos.push(...Cursos);

    }catch(error){
        console.error("Error al cargar Cursos",error.message);
    }
}

const mostrarListadoCursos= async ()=>{
    await loadCursos();
    const cursosForm = document.getElementById('cursos-form');
    const listadoCursos = document.getElementById('todosCursos');

    cursosForm.style.display = "none";
    listadoCursos.style.display ="block";

    listadoCursos.innerHTML=""
        
    
    const ul=document.createElement('ul');

    for(const curso of listaCursos){
        const li=document.createElement('li');
        li.textContent= `ID: ${curso.id}, Nombre: ${curso.nombre}, Codigo: ${curso.codigo}, guiaCatedra: ${curso.guia_catedra}`;
        ul.appendChild(li);
    }

    listadoCursos.appendChild(ul);

    const volverButton=document.createElement('button');
    volverButton.textContent='Volver a los Cursos';
    volverButton.addEventListener('click',volverAlFormularioCursos);
    listadoCursos.appendChild(volverButton);   
}

//volver a ver el formulario
const volverAlFormularioCursos = () =>{

    const cursosForm = document.getElementById('cursos-form');
    const listadoCursos = document.getElementById('todosCursos');

    cursosForm.style.display = "block";
    listadoCursos.style.display = "none";
}

//Aui pa bajo es para crear matriculas
//async = oara que sea una funcion ascincrona

const crearCurso = async ()=>{
    const inputNombre = document.getElementById("nombre");
    const inputCodigo = document.getElementById("codigo");
    const inputGuiaCatedra = document.getElementById("guiaCatedra");

    const nombre = inputNombre.value;
    const codigo = inputCodigo.value;
    const guiaCatedra = inputGuiaCatedra.value;

    const newCurso ={        
        id: listaCursos.length+1,
        nombre: nombre,
        codigo: codigo,
        guia_catedra: guiaCatedra,
        
    }

    await guardarCursoJson(newCurso);
    await loadCursos();

    inputNombre.value = "";
    inputCodigo.value = "";
    inputGuiaCatedra.value = "",
    alert ("Creacion de nuevo Curso exitoso")
    return newCurso
}
//guardar informacion en el jason
const guardarCursoJson = async (newCurso) =>{

    try {
        const respuesta = await fetch('http://localhost:3000/cursos',{
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify(newCurso),
        });

        if (!respuesta.ok){
            throw new Error('Error al registrar el nuevo Curso. Estado:', respuesta.status);
        }
        const cursoCreado = await respuesta.jason();

        console.log('Curso Registrado', cursoCreado);

    }catch (error){
        console.log("Error al cargar los Cursos", error.message)
    }
}

const cargarFormularioCursos = async () => {

    await loadCursos();

    const cursosForm = document.getElementById('cursos-form');
    cursosForm.innerHTML =
    `<form>

    <label for = "nombre">Nombre: </label>
    <input type = "text" id = "nombre" required> 

    <label for = "codigo">Codigo: </label>
    <input type = "text" id = "codigo" required> 

    <select type = "select" id = "Guia Catedra" required>
            <option value="">URL_Guia_Catedra.pdf</option>            
        </select> 

    <button type = "button" onclick = "crearCurso()">Agregar Curso</button>
    <button type = "button" onclick = "mostrarListadoCursos()">Mostrar Cursos</button>

    </form>`
    ;
}

// funcion para obtener un curso especifio por Id
function findCursoById(id){
    return listaCursos.find(curso => curso.id == id)
 }