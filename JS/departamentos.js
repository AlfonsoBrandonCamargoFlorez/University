const listaDepartamentos = [];

const loadDepartamentos= async()=>{
   
    try{
        listaDepartamentos.length=0;
        const respuesta=await fetch('http://localhost:3000/departamentos');

        if(!respuesta.ok){
           throw new Error('Error al cargar Departamentos. Estado: ',respuesta.status);
        }
        const Departamentos=await respuesta.json();
        listaDepartamentos.push(...Departamentos);

    }catch(error){
        console.error("Error al cargar Departamentos",error.message);
    }
}

const mostrarListadoDepartamentos= async ()=>{
    await loadDepartamentos();
    const listadoDepartamentos = document.getElementById('todosDepartamentos');
    listadoDepartamentos.innerHTML=""

        
    
    const ul=document.createElement('ul');

    for(const departamento of listaDepartamentos){
        const li=document.createElement('li');
        li.textContent= `ID: ${departamento.id}, Nombre: ${departamento.nombre}`;
        ul.appendChild(li);
    }

    listadoDepartamentos.appendChild(ul);

   
}