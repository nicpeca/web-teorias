let teorias = [
    { id: 1, nombre: "Enfoque conductista", autor: "", src: "img/conductismo.jpg"},
    { id: 2, nombre: "Teoría constructiva", autor: "Jean Piaget", src: "img/jean-piaget.jpg" },
    { id: 3, nombre: "Teoría constructiva", autor: "Lev Vygotsky", src: "img/lev-vygotsky.jpg" },
    { id: 4, nombre: "Teoría psicosexual", autor: "Sigmund Freud", src: "img/sigmund-freud.jpg" },
    { id: 5, nombre: "Teoría psicosocial", autor: "Erik Erikson", src: "img/erik-erikson.jpg" },
    { id: 6, nombre: "Teoría del apego", autor: "John Bowlby", src: "img/jhon-bowlby.jpg" },
    { id: 7, nombre: "Teoría del aprendizaje social", autor: "Albert Bandura", src: "img/albert-bandura.jpg" },
    { id: 8, nombre: "Teoría de la satisfacción de las necesidades", autor: "Manfred Max Neef", src: "img/manfred-max-neef.jpg" },
    { id: 9, nombre: "Teoría humanista", autor: "Carl Rogers y Abraham Maslow", src: "img/carl-abraham.png" },
    { id: 10, nombre: "Neurociencia cognitiva", autor: "", src: "img/neurociencia.jpg" }
];

var html = "";
teorias.forEach(e => {

    html += `<div class="container" ><img src="img/circle.svg" alt=""> <img><div class="text-box" id="${e.id}-text-box"> <h2>${e.nombre}</h2> <p>${e.autor}</p> <span class="container-arrow"></span></div> </div>`
})
timeline.innerHTML = html;

var bio_text = document.querySelector('.bio-text');
var bio_title = document.querySelector('.bio-title');
var bio = document.querySelector('.bio');
var parallaxContainer = document.getElementById('parallaxContainer');

var elemento = document.getElementById("logo");

// Realiza un desplazamiento suave al elemento

document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todos los elementos con la clase "text-box"
    var textBoxElements = document.querySelectorAll('.text-box');

    // Agrega el evento de clic a cada elemento
    textBoxElements.forEach(function (textBoxElement) {
        textBoxElement.addEventListener('click', function (event) {

            let containerId = textBoxElement.id

            fetch(`data/${containerId}.txt`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error al cargar el archivo para el contenedor con ID ${containerId}`);
                    }
                    return response.text();
                })
                .then(function (datos) {
                    // Muestra los datos en el div de clase "bio"
                    let numero = parseInt(containerId.match(/\d+/)[0]);
                    let teoriaEncontrada = teorias.find(teoria => teoria.id === numero);


                    bio.classList.remove('loaded');
                    bio.classList.add('unload');
                   
                    setTimeout(function () {
                        bio.classList.remove('unload');
                        bio.classList.add('loaded');

                        bio_title.innerHTML = teoriaEncontrada.nombre + "<p>" + teoriaEncontrada.autor +"</p>";
                    
                        bio_text.innerHTML = `${datos}`;

                        parallaxContainer.src = teoriaEncontrada.src;

                        elemento.scrollIntoView({ behavior: 'smooth' });

                    }, 300); // Ajusta el tiempo según tus necesidades
                    
                })
                .catch(function (error) {
                    console.error(error);
                });

        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var parallaxContainer = document.getElementById('parallaxContainer');

    // Agrega un evento de desplazamiento
    window.addEventListener('scroll', function () {
        var scrollPosition = window.scrollY;
        // Mueve la imagen en función del desplazamiento para crear el efecto parallax
        parallaxContainer.style.transform = 'translate3d(0,' + scrollPosition * 0.2 + 'px, 0)';
    });
});