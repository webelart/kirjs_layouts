;(function () {
    const svgNodes = document.querySelectorAll('svg'); 

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initSvgAnimation();
            } else {
                svgNodes.forEach((svgNode) => {
                    svgNode.classList.remove('svgStartAnimation');
                });
            }
        });
    }, {
        root: null
    });

    observer.observe(document.querySelector('#icons'));

    // window.addEventListener('load', () => {
    //     initSvgAnimation();
    // });

    function initSvgAnimation() {
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

        svgNode.classList.add('svgStartAnimation');
    }

    function setPosition(element, length) {
        element.style.strokeDasharray = `${length}px`;
        element.style.strokeDashoffset = `${length}px`;
    }
}());
