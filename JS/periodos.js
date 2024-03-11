const listaPeriodos = [];

const loadPeriodos= async()=>{
   
    try{
        listaPeriodos.length=0;
        const respuesta=await fetch('http://localhost:3000/periodos');

        if(!respuesta.ok){
           throw new Error('Error al cargar Periodos. Estado: ',respuesta.status);
        }
        const Periodos=await respuesta.json();
        listaPeriodos.push(...Periodos);

    }catch(error){
        console.error("Error al cargar Periodos",error.message);
    }
}

const mostrarListadoPeriodos= async ()=>{
    await loadPeriodos();
    const listadoPeriodos = document.getElementById('todosPeriodos');
    listadoPeriodos.innerHTML=""

        
    
    const ul=document.createElement('ul');

    for(const periodo of listaPeriodos){
        const li=document.createElement('li');
        li.textContent= `ID: ${periodo.id}, Codigo: ${periodo.codigo}, Anno: ${periodo.ano}, Semestre: ${periodo.semestre}`;
        ul.appendChild(li);
    }

    listadoPeriodos.appendChild(ul);

   
}