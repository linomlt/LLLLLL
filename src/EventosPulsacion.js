window.addEventListener('mousedown', mousedown);
window.addEventListener('mousemove', mousemove);
window.addEventListener('mouseup', mouseup);

window.addEventListener('touchstart', touchstart, false);
window.addEventListener('touchmove', touchmove, false);
window.addEventListener('touchend', eliminarTouch, false);
window.addEventListener('touchcancel', eliminarTouch, false);
window.addEventListener('touchleave', eliminarTouch, false);

function touchstart(event) {
    let touches = event.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        agregarPulsacion(touches[i].identifier,
            tipoPulsacion.inicio, touches[i]);
    }
}

function touchmove(event) {
    let touches = event.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        agregarPulsacion(touches[i].identifier,
            tipoPulsacion.mantener, touches[i]);
    }
}

function eliminarTouch(event) {
    let touches = event.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        eliminarPulsacion(touches[i].identifier);
    }
}

function mousedown(event) {
    agregarPulsacion(1, tipoPulsacion.inicio, event);
}

function mousemove(event) {
    // Si no hay ninguna, o si han pasado más de 10ms desde la anterior
    if (pulsaciones.length === 0 ||
        event.timeStamp - pulsaciones[0].timeStamp > 10) {
        agregarPulsacion(1, tipoPulsacion.mantener, event);
    }
}

function mouseup(event) {
    eliminarPulsacion(1);
}

function agregarPulsacion(id, tipoPulsacion, event) {
    entrada = entradas.pulsaciones;

    x = event.pageX - canvas.offsetLeft;
    y = event.pageY - canvas.offsetTop;

    let p = {
        x: x / escaladoMinimo,
        y: y / escaladoMinimo,
        id: id,
        tipo: tipoPulsacion,
        timeStamp: event.timeStamp
    };

    let pulsacionEncontrada = false;
    for (let i = 0; i < pulsaciones.length; i++) {
        if (pulsaciones[i].id === id) {
            pulsaciones[i] = p;
            pulsacionEncontrada = true;
        }
    }

    if (!pulsacionEncontrada) {
        pulsaciones.push(p);
    }

}

function eliminarPulsacion(id) {
    for (let i = 0; i < pulsaciones.length; i++) {
        if (pulsaciones[i].id === id) {
            pulsaciones.splice(i, 1);
        }
    }
}
