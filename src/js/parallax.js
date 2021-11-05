;(function () {
    const parallax = document.getElementById('parallax');
    const parallaxChildren = parallax.children;
    const layers = Array.from(parallaxChildren);

    const depths = layers.map((node) => (
        Number(node.dataset.depth)
    ));

    let inputX = 0;
    let inputY = 0;

    let offsetX = 0;
    let offsetY = 0;

    updateDimensions();
    startAnimation();

    function updateDimensions() {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        windowCenterX = windowWidth / 2;
        windowCenterY = windowHeight / 2;
    }

    function startAnimation() {
        window.addEventListener('resize', updateDimensions);
        parallax.addEventListener('mousemove', onMouseMove);
        window.addEventListener('scroll', onScroll);
        window.requestAnimationFrame(onAnimationFrame);
    }

    function onMouseMove(event) {
        const clientX = event.clientX;
        const clientY = event.clientY;

        if(windowCenterX && windowCenterY) {
            inputX = (clientX - windowCenterX) / windowCenterX;
            inputY = (clientY - windowCenterY) / windowCenterY;
        }
    }

    function onScroll() {
        inputY = window.scrollY / windowCenterY * 1.5;
    }

    function onAnimationFrame() {
        const positionX = inputX * windowWidth / 10;
        const positionY = inputY * windowHeight / 10 + window.scrollY / windowCenterY * 1.5;
        
        offsetX += (positionX - offsetX) * 0.1;
        offsetY += (positionY - offsetY) * 0.1;

        for (let index = 0; index < layers.length; index++) {
            const layer = layers[index];
            const layerDepth = depths[index];
            const xOffset = offsetX * layerDepth * -1;
            const yOffset = offsetY * layerDepth * -1;

            setPosition(layer, xOffset, yOffset);
        }

        window.requestAnimationFrame(onAnimationFrame);
    }

    function setPosition(element, x, y) {
        element.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
    }
}());