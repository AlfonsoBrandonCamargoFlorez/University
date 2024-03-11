document.addEventListener("DOMContentLoaded",async()=>{
    await loadCursos();
    mostrarListadoCursos();
    cargarFormularioCursos();

    await loadPeriodos();
    mostrarListadoPeriodos();

    await loadProgramas();
    mostrarListadoProgramas();

    await loadTarifas();
    mostrarListadoTarifas();

    await loadDepartamentos();
    mostrarListadoDepartamentos();

    await loadProfesores();
    mostrarListadoProfesores();
    cargarFormularioProfesores();

    await loadAlumnos();
    mostrarListadoAlumnos();
    cargarFormularioAlumnos();

    await loadSalones();
    mostrarListadoSalones();

    await loadAsignaturas();
    mostrarListadoAsignaturas();
    cargarFormularioAsignaturas();

    await loadMatriculas();
    mostrarListadoMatriculas();
    cargarFormularioMatriculas();


})