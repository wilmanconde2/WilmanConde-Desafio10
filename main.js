import './css/style.css';

// ! -------------------- Ejercicio 1 ------------------------

const botonChiste = document.getElementById('chiste');

botonChiste.addEventListener('click', () => {
  console.log('Hicieron click... nuevo chiste');
  async function obtenerChiste() {
    try {
      const url = 'https://icanhazdadjoke.com/';
      const respuesta = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });
      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}`);
      }
      const chiste = await respuesta.json();
      const joke = JSON.stringify(chiste.joke);
      const contenedor = document.querySelector('.contenedor');
      contenedor.innerHTML = joke;
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  obtenerChiste();
});

// ! -------------------- Ejercicio 2 ------------------------

const botonPublicacion = document.querySelector('#publicacion');
// console.log(botonPublicacion)

botonPublicacion.addEventListener('click', () => {
  console.log('hicieron click nueva publicación');

  async function obtenerPublicacion() {
    try {
      const url = 'https://jsonplaceholder.typicode.com/posts/';
      const respuesta = await fetch(url);
      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}`);
      }
      const publicacion = await respuesta.json();
      console.log(publicacion);

      let i = 1;

      publicacion.forEach((element) => {
        const titulo = element.title;
        const body = element.body;
        const urlpost = 'https://jsonplaceholder.typicode.com/posts/' + i;
        const contenedor = document.querySelector('.contenedorPublicacion');
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = urlpost;
        i++;
        li.innerHTML = [`Titulo =>> ${titulo}. Publicacion =>> ${body}. URL =>> ${a}`];
        contenedor.appendChild(li);
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  obtenerPublicacion();
});

// ! -------------------- Ejercicio 3 ------------------------


// ! -------------------- Ejercicio 4 ------------------------

// url = 'https://api.unsplash.com/search/photos';

// ?query=dog&client_id=

document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('search');
  // console.log(search);
  const form = document.getElementById('form');
  // console.log(form);
  const mostrarMas = document.getElementById('mostrarMas');
  // console.log(mostrarMas);

  form.addEventListener('submit', (objEvento) => {
    objEvento.preventDefault();
    const busqueda = search.value.trim();
    let url = `https://api.unsplash.com/search/photos?query=${busqueda}&client_id=${
      import.meta.env.VITE_API_KEY
    }&per_page=20`;

    console.log(url);
    if (busqueda) {
      obtenerFotos();
      async function obtenerFotos() {
        try {
          const respuesta = await fetch(url);
          if (!respuesta.ok) {
            throw new Error(`Error ${respuesta.status}`);
          }
          const fotos = await respuesta.json();
          const contenedor = document.querySelector('.contenedorFotos');
          contenedor.innerHTML = '';

          fotos.results.forEach((foto) => {
            const img = document.createElement('img');
            img.src = foto.urls.thumb;
            img.alt = 'Foto de' + foto.user.username;
            contenedor.appendChild(img);
          });
        } catch (error) {
          console.error('Error:', error.message);
        }
      }
    } else {
      alert('Ingrese dato de búsqueda');
    }
    search.value = '';
  });
});
