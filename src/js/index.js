const marca_input = document.querySelector("#marca");
const modelo_input = document.querySelector("#modelo");
const alm_input = document.querySelector("#alm");
const ram_input = document.querySelector("#ram");
const procesador_input = document.querySelector("#procesador");
const mgpx_input = document.querySelector("#mgpx");

const add_button = document.querySelector("#add");
const add_submit = document.querySelector("#add_submit");
const delete_button = document.getElementById("delete-all")

const content_div = document.getElementById("content");

document.addEventListener('DOMContentLoaded', () => {// Espera a que cargue nuestro contenido html ...

    // Mostrar en vista todo mi contenido de localStorage ...
    
    // 1.- Obtener de localStorage ...
    const celulares = JSON.parse( localStorage.getItem("celulares") );

    console.log(celulares)

    if (celulares === null) {
        const parrafo = document.createElement("p");
        const text_parrafo = document.createTextNode("No hay elementos para mostrar.")

        parrafo.appendChild(text_parrafo);

        content_div.append(parrafo);
    } else {
        for(let i = 0; i < celulares.length; i++) {
            // Crear elemento div ...
            const div_celular = document.createElement("div");
            const text_marca_modelo = document.createTextNode(`${celulares[i].marca}-${celulares[i].modelo}`);

            // crear boton eliminar ..
            const button_delete = document.createElement("button");
            const text_button_delete = document.createTextNode("Eliminar");
            button_delete.appendChild(text_button_delete);

            // Agregar textos y buton ...
            div_celular.appendChild(text_marca_modelo);
            div_celular.appendChild(button_delete);

            content_div.appendChild(div_celular);
        }
    }

    delete_button.addEventListener('click', () => {
        localStorage.setItem("celulares", JSON.stringify([]));
        content_div.innerHTML = '';

        const parrafo = document.createElement("p");
        const text_parrafo = document.createTextNode("No hay elementos para mostrar.")

        parrafo.appendChild(text_parrafo);

        content_div.append(parrafo);
    })

    /*add_submit.addEventListener("click", (e) => {
        e.preventDefault();
        // Todo: Agregar codigo
    })*/

})
