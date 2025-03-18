const amigosSecretos = [];
let sorteoRealizado = false;
let asignaciones = [];

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombreSecreto = input.value.trim();

    if (nombreSecreto === "") {
        alert("Por favor, ingrese un nombre.");
        return;
    }

    if (amigosSecretos.includes(nombreSecreto)) {
        alert("Este nombre ya fue agregado.");
        return;
    }

    amigosSecretos.push(nombreSecreto);
    sorteoRealizado = false;
    actualizarLista();
    input.value = "";
}

function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigosSecretos.forEach((nombreSecreto) => {
        const li = document.createElement("li");
        li.textContent = nombreSecreto;
        lista.appendChild(li);
    });

    document.getElementById("resultado").innerHTML = "";
}

function sortearAmigo() {
    if (amigosSecretos.length < 4) {
        alert("Debes ingresar al menos 4 amigos para sortear.");
        return;
    }
     
    if (amigosSecretos.length % 2 !== 0) {
        alert("El número de participantes es impar. Agrega otro amigo para realizar el sorteo.");
        return;
    }



    let disponibles = [...amigosSecretos]; 
    let asignados = new Set();
    asignaciones = [];

    // Mezcla la lista para asegurar aleatoriedad
    disponibles = disponibles.sort(() => Math.random() - 0.5);

    for (let i = 0; i < amigosSecretos.length; i++) {
        let nombre = amigosSecretos[i];
        let posibles = disponibles.filter(a => a !== nombre && !asignados.has(a));

        if (posibles.length === 0) {
            alert("No hay mas asignaciones. Se reiniciará el proceso.");
            return sortearAmigo();
        }

        let elegido = posibles[0]; 
        asignaciones.push({ amigo: nombre, asignado: elegido });
        asignados.add(elegido);
        disponibles = disponibles.filter(a => a !== elegido);
    }

    mostrarResultado();
    sorteoRealizado = true;
}

function mostrarResultado() {
    const listaAmigos = document.getElementById("resultado");
    listaAmigos.innerHTML = "";

    asignaciones.forEach(par => {
        const li = document.createElement("li");
        li.textContent = `${par.amigo} → ${par.asignado}`;
        listaAmigos.appendChild(li);
    });
}
