const formulario = document.getElementById("formularioSolicitud");
const mensajeEstado = document.getElementById("mensajeEstado");
const resultado = document.getElementById("resultado");

const campos = {
    nombre: document.getElementById("nombre"),
    correo: document.getElementById("correo"),
    cargo: document.getElementById("cargo"),
    mensaje: document.getElementById("mensaje"),
    curriculum: document.getElementById("curriculum")
};

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    limpiarAvisos();

    const datos = obtenerDatos();
    const camposVacios = validarCampos(datos);

    if (camposVacios.length > 0) {
        mostrarMensaje("Por favor completa todos los campos antes de registrar.", "error");
        marcarCampos(camposVacios);
        return;
    }

    if (!correoValido(datos.correo)) {
        mostrarMensaje("Ingresa un correo electrónico válido.", "error");
        campos.correo.classList.add("error-campo");
        campos.correo.focus();
        return;
    }

    mostrarResultado(datos);
    mostrarMensaje("Solicitud registrada con éxito.", "exito");
    formulario.reset();
});

function obtenerDatos() {
    return {
        nombre: campos.nombre.value.trim(),
        correo: campos.correo.value.trim(),
        cargo: campos.cargo.value,
        mensaje: campos.mensaje.value.trim(),
        curriculum: campos.curriculum.files[0] ? campos.curriculum.files[0].name : ""
    };
}

function validarCampos(datos) {
    return Object.keys(datos).filter(function (campo) {
        return datos[campo] === "";
    });
}

function marcarCampos(listaCampos) {
    listaCampos.forEach(function (campo) {
        campos[campo].classList.add("error-campo");
    });

    campos[listaCampos[0]].focus();
}

function correoValido(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function mostrarMensaje(texto, tipo) {
    mensajeEstado.textContent = texto;
    mensajeEstado.className = "mensaje " + tipo;
}

function limpiarAvisos() {
    mensajeEstado.textContent = "";
    mensajeEstado.className = "mensaje";

    Object.values(campos).forEach(function (campo) {
        campo.classList.remove("error-campo");
    });
}

function mostrarResultado(datos) {
    resultado.innerHTML = `
        <h2>Solicitud registrada</h2>
        <dl>
            <dt>Nombre completo</dt>
            <dd>${escaparHTML(datos.nombre)}</dd>

            <dt>Correo electrónico</dt>
            <dd>${escaparHTML(datos.correo)}</dd>

            <dt>Cargo al que aplica</dt>
            <dd>${escaparHTML(datos.cargo)}</dd>

            <dt>Mensaje</dt>
            <dd>${escaparHTML(datos.mensaje)}</dd>

            <dt>Currículum adjunto</dt>
            <dd>${escaparHTML(datos.curriculum)}</dd>
        </dl>
    `;
}

function escaparHTML(texto) {
    const elemento = document.createElement("div");
    elemento.textContent = texto;
    return elemento.innerHTML;
}
