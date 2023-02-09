const marca_input = document.querySelector("#marca");
const modelo_input = document.querySelector("#modelo");
const alm_input = document.querySelector("#alm");
const ram_input = document.querySelector("#ram");
const procesador_input = document.querySelector("#procesador");
const mgpx_input = document.querySelector("#mgpx");

const add_button = document.querySelector("#add");
const add_submit = document.querySelector("#add_submit");
const delete_button = document.getElementById("delete-all");

const form = document.querySelector('form');

const content_div = document.getElementById("content");
const content_table = document.getElementById("content-table")

document.addEventListener('DOMContentLoaded', () => {// Espera a que cargue nuestro contenido html ...

    // Mostrar en vista todo mi contenido de localStorage ...
    
    // 1.- Obtener de localStorage ...
    const celulares = JSON.parse( localStorage.getItem("celulares") );

    if (celulares === null) {
        const parrafo = document.createElement("p");
        const text_parrafo = document.createTextNode("No hay elementos para mostrar.")

        parrafo.appendChild(text_parrafo);

        content_div.append(parrafo);
    } else {
        render(celulares)
    }

    add_button.addEventListener('click', (e) => {
        
        e.preventDefault();
        // Agregar funcion de agregar elementos ...
        const celulares = JSON.parse( localStorage.getItem("celulares") ) || [];

        const marca = marca_input.value;
        const alm = alm_input.value;
        const modelo = modelo_input.value;
        const ram = ram_input.value;
        const procesador = procesador_input.value;
        const mgpx = mgpx_input.value;

        const celular = { // JSON
        //  key     : value
            marca,
            "alm": alm,
            "modelo": modelo,
            "ram": ram,
            "procesador": procesador,
            "mgpx": mgpx
        }

        celulares.push(celular);

        localStorage.setItem('celulares', JSON.stringify(celulares));

        content_div.innerHTML = ''; // Limpia el contenido de un div ...

        // llena el contenido del div ..
        render(celulares)
    })

    delete_button.addEventListener('click', () => {
        localStorage.setItem("celulares", JSON.stringify([]));
        content_div.innerHTML = ''; // Limpia el contenido de un div ...

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

function render(celulares) {
    for(let i = 0; i < celulares.length; i++) {
        // Div del conenido ......

            // Crear elemento div ...
            const div_celular = document.createElement("div");
            const text_marca_modelo = document.createTextNode(`${celulares[i].marca}-${celulares[i].modelo}`);

            // crear boton eliminar ..
            const button_delete = document.createElement("button");
            const text_button_delete = document.createTextNode("Eliminar");
            button_delete.appendChild(text_button_delete);

            // nueva seccion
            const button_update = document.createElement('button');
            const text_button_update = document.createTextNode('Actualizar');
            button_update.appendChild(text_button_update);

            button_delete.onclick = () => {
                deleteLocalStorage(i, celulares)
            }

            // 
            button_update.onclick = () => {
                // cargar elementos en el formulario ...
                marca_input.value = celulares[i].marca;
                modelo_input.value = celulares[i].modelo;
                alm_input.value = celulares[i].alm;
                ram_input.value = celulares[i].ram;
                mgpx_input.value = celulares[i].mgpx;
                procesador_input.value = celulares[i].procesador;

                // desabilitamos boton agregar
                add_button.disabled = true;

                // agregamos el boton guardar en el formulario ...
                const button_save = document.createElement('button');
                const text_button_save = document.createTextNode('Guardar');

                button_save.appendChild(text_button_save);

                button_save.id = i;

                button_save.onclick = (e) => {
                    e.preventDefault()
                    // actualizar informacion ..
                    const celular = {
                        "marca":marca_input.value,
                        "modelo":modelo_input.value, 
                        "alm":alm_input.value,
                        "ram":ram_input.value,
                        "mgpx":mgpx_input.value,
                        "procesador":procesador_input.value
                    }

                    celulares.splice(i, 1, celular); // actualizacion ...

                    localStorage.setItem('celulares', JSON.stringify(celulares));

                    content_div.innerHTML = "";
                    render(celulares);

                    button_save.hidden = true;
                    add_button.disabled = false;
                }

                form.appendChild(button_save);
            }

            // Agregar textos y buton ...
            div_celular.appendChild(text_marca_modelo);
            div_celular.appendChild(button_update);
            div_celular.appendChild(button_delete);

            content_div.appendChild(div_celular);

        // Tabla contenido ...
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input value="${celulares[i].marca}" id="marca-${i}" /></td>
            <td><input value="${celulares[i].modelo}" id="modelo-${i}" /></td>
            <td><input value="${celulares[i].alm}" id="alm-${i}"/></td>
            <td><input value="${celulares[i].ram}" id="ram-${i}" /></td>
            <td><input value="${celulares[i].procesador}" id="procesador-${i}"/></td>
            <td><input value="${celulares[i].mgpx}" id="mgpx-${i}" /></td>
            <td>
                <button onclick="saveTable(${i})">Guardar</button>
                <button>Eliminar</button>
            </td>
        `;
        document.querySelector("tbody").appendChild(row);
    }
}

function deleteLocalStorage(i, celulares) {
    celulares.splice(i, 1);

    localStorage.setItem('celulares', JSON.stringify(celulares));

    content_div.innerHTML = '';

    render(celulares)
}

function saveTable(i) {
    const input_table_marca = document.querySelector(`#marca-${i}`);
    const input_table_modelo = document.querySelector(`#modelo-${i}`);
    const input_table_alm = document.querySelector(`#alm-${i}`);
    const input_table_ram = document.querySelector(`#ram-${i}`);
    const input_table_procesador = document.querySelector(`#procesador-${i}`);
    const input_table_mgpx = document.querySelector(`#mgpx-${i}`);

    const celulares = JSON.parse(localStorage.getItem("celulares")) || [];

    celulares.splice(i, 1, {
        "marca": input_table_marca.value,
        "modelo": input_table_modelo.value,
        "alm": input_table_alm.value,
        "ram": input_table_ram.value,
        "procesador": input_table_procesador.value,
        "mgpx": input_table_mgpx.value
    })

    localStorage.setItem("celulares", JSON.stringify(celulares));


    content_div.innerHTML = '';
    document.querySelector("tbody").innerHTML = ''
    render(celulares);

}
