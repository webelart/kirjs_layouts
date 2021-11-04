;(function () {
    window.onload = function () {
        initSvgAnimation();
    }

    function initSvgAnimation() {
        const svgNodes = Array.from(document.querySelectorAll('svg')); 
        svgNodes.forEach((svgNode) => {
            startSvgAnimation(svgNode)
        });
    }

    function startSvgAnimation(svgNode) {
        const paths = svgNode.querySelectorAll('path');
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            const pathLength = Math.ceil(path.getTotalLength());
            setPosition(path, pathLength);
        }

        svgNode.classList.add('svgStartAnimation')
    }

    function setPosition(element, length) {
        element.style.strokeDasharray = `${length}px`;
        element.style.strokeDashoffset = `${length}px`;
    }
}());
