// const parallax = document.getElementById('parallax');
// const parallaxChildren = parallax.children;
// const layers = Array.from(parallaxChildren);

// const depths = layers.map((node) => (
//     Number(node.dataset.depth)
// ));

// const topParallax = parallax.offsetTop;
// const leftParallax = parallax.offsetLeft;
// const info = parallax.getBoundingClientRect();

// let inputX = 0;
// let inputY = 0;
// let positionX = 0;
// let positionY = 0;

// let offsetX = 0;
// let offsetY = 0;

// const halfWidth = info.width / 2;
// const halfHeight = info.height / 2;

// parallax.addEventListener('mousemove', (event) => {
//     const clientX = event.clientX - leftParallax;
//     const clientY = event.clientY;

//     inputX = (clientX - halfWidth) / halfWidth;
//     inputY = (clientY - halfHeight) / halfHeight;
// });

// window.requestAnimationFrame(animation);

// function animation() {
//     positionX = inputX * info.width / 10;
//     positionY = inputY * info.height / 10;

//     offsetX += (positionX - offsetX) * 0.1;
//     offsetY += (positionY - offsetY) * 0.1;

//     for (let i = 0; i < layers.length; i++) {
//         const currentDepth = depths[i] || 0;
//         const x = currentDepth * offsetX * -1;
//         const y = currentDepth * offsetY * -1;

//         setStyles(layers[i], x, y);
//     }

//     window.requestAnimationFrame(animation);
// }

// function setStyles(node, x, y) {
//     node.style.transform = `translate3d(${x}px, ${y}px, 0)`
// }

