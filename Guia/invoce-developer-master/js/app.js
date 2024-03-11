document.addEventListener('DOMContentLoaded',async ()=>{
    await loadClientes();
    cargarFormularioClientes();
    await loadProductos();
    cargarFormularioProductos();
    await loadFacturas();
    cargarFormularioFacturas();


})