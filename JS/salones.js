const listaSalones = [];

const loadSalones= async()=>{
   
    try{
        listaSalones.length=0;
        const respuesta=await fetch('http://localhost:3000/salones');

        if(!respuesta.ok){
           throw new Error('Error al cargar Salones. Estado: ',respuesta.status);
        }
        const Salones=await respuesta.json();
        listaSalones.push(...Salones);

    }catch(error){
        console.error("Error al cargar Salones",error.message);
    }
}

const mostrarListadoSalones= async ()=>{
    await loadSalones();
    const listadoSalones = document.getElementById('todosSalones');
    listadoSalones.innerHTML=""

        
    
    const ul=document.createElement('ul');

    for(const salon of listaSalones){
        const li=document.createElement('li');
        li.textContent= `ID: ${salon.id}, Capacidad ${salon.capacidad_alumnos}, ${salon.edificio}, Piso ${salon.piso}, Numero Salon: ${salon.numero_identificacion}`;
        ul.appendChild(li);
    }

    listadoSalones.appendChild(ul);
}

function findSalonById(id){
   return listaSalones.find(salon => salon.id == id)
}