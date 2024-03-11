const listaProductos = [];


const loadProductos= async()=>{
    try{

        listaProductos.length=0;
        const respuesta=await fetch('http://localhost:3000/productos');

        if(!respuesta.ok){
           throw new Error('Error al cargar clientes. Estado: ',respuesta.status);
        }
        const productos=await respuesta.json();
        listaProductos.push(...productos);

    }catch(error){
        console.error("Error al cargar clientes",error.message);
    }
}

const guardarProducto= async(nuevoProducto)=>{
    try{

        const respuesta=await fetch('http://localhost:3000/productos',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(nuevoProducto),
        });

        if(!respuesta.ok){
           throw new Error('Error al crear el cliente. Estado: ',respuesta.status);
        }
        const productoCreado=await respuesta.json();
        
        console.log('Producto creado:', productoCreado);

    }catch(error){
        console.error("Error al cargar productos",error.message);
    }
}

const cargarFormularioProductos=()=>{
    const productosForm = document.getElementById('productos-form');
    productosForm.innerHTML = `
        <form>
            <label for="codigoProducto">Código del Producto:</label>
            <input type="text" id="codigoProducto" required>
            <label for="descripcionProducto">Descripción del Producto:</label>
            <input type="text" id="descripcionProducto" required>
            <label for="precioProducto">Precio del Producto:</label>
            <input type="number" id="precioProducto" required>
            <button type="button" onclick="crearProducto()">Crear Producto</button>
            <button type="button" onclick="mostrarListadoProductos()">Ver Listado de Productos</button>
            <!-- Aquí se puede añadir más funcionalidad, como modificar y eliminar productos -->
        </form>
    `;

    const listadoProductos = document.getElementById('listado-productos');
    listadoProductos.style.display = 'none';
}

const crearProducto=async ()=>{
    const codigoInput = document.getElementById('codigoProducto');
    const descripcionInput = document.getElementById('descripcionProducto');
    const precioInput = document.getElementById('precioProducto');

    const codigo = codigoInput.value;
    const descripcion = descripcionInput.value;
    const precio = precioInput.value;

    if (!codigo || !descripcion || !precio) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const nuevoProducto = {
        id:listaProductos.length+1,
        codigo: codigo,
        descripcion: descripcion,
        precio: precio
    };

    
    await guardarProducto(nuevoProducto);
    await loadProductos();
    console.log('Producto creado:', nuevoProducto);
    console.log('Lista de productos:', listaProductos);

    // Limpiar campos del formulario
    codigoInput.value = '';
    descripcionInput.value = '';
    precioInput.value = '';

    // Mostrar mensaje de éxito
    alert('Producto creado con éxito!');
    actulizarProductosEnFacturas();
    

    return nuevoProducto;

}

const mostrarListadoProductos=async ()=>{
    await loadProductos();
    const productosForm = document.getElementById('productos-form');
    const listadoProductos = document.getElementById('listado-productos');

    // Ocultar formulario de clientes
    document.getElementById('productos-form').style.display = 'none';

    // Mostrar listado de productos
    listadoProductos.style.display = 'block';

    // Crear una lista (ul) para mostrar los productos
    const ul = document.createElement('ul');

    // Recorrer la lista de productos y agregar cada producto como un elemento de lista (li)
    for (const producto of listaProductos) {
        const li = document.createElement('li');
        li.textContent = `Código: ${producto.codigo}, Descripción: ${producto.descripcion}, Precio: ${producto.precio}`;
        ul.appendChild(li);
    }

    // Limpiar el contenido anterior del contenedor de listado de productos
    listadoProductos.innerHTML = '';

    // Agregar la lista al contenedor
    listadoProductos.appendChild(ul);

    // Agregar botón para volver al formulario de productos
    const volverButton = document.createElement('button');
    volverButton.textContent = 'Volver al Formulario de Productos';
    volverButton.addEventListener('click', volverAlFormularioProductos);
    listadoProductos.appendChild(volverButton);
}

const volverAlFormularioProductos=()=>{
    const productosForm = document.getElementById('productos-form');
    const listadoProductos = document.getElementById('listado-productos');

    // Ocultar listado de productos
    listadoProductos.style.display = 'none';

    // Mostrar formulario de productos
    productosForm.style.display = 'block';
}

