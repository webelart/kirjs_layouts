;(function () {
    const animatablesNodes = document.querySelectorAll('.jsAnimatable');

    const animatableClass = 'jsAnimatable';
    const animatedClass = 'jsAnimated';

    const animatables = [];
    const throttledDoAnimation = throttle(doAnimations);

    function setOffsets() {
        animatablesNodes.forEach((node) => {
            // if(node.classList.contains(animatedClass)) {
            //     node.classList.remove(animatableClass);
            // }

            const info = node.getBoundingClientRect();
            animatables.push({
                node,
                offset: info.top
            });
        }); 
    }

    function doAnimations() {
        const currentOffset = window.scrollY + window.innerHeight;

        for(let i = 0; i < animatables.length; i++) {
            const animatableNode = animatables[i].node;
            const offsetNode = animatables[i].offset;

            if (
                offsetNode < currentOffset &&
                animatableNode.classList.contains(animatableClass)
            ) {
                animatableNode.classList.remove(animatableClass);
                animatableNode.classList.add(animatedClass);

                animatables.splice(i, 1);
                i -= 1;
            } 
        }

        if(animatables.length === 0 ) {
            window.removeEventListener('scroll', throttledDoAnimation);
            window.removeEventListener('resize', setOffsets);
        }
    }

    window.addEventListener('load', () => {
        setOffsets();
        window.addEventListener('resize', setOffsets);

        doAnimations();
        window.addEventListener('scroll', throttledDoAnimation);
    });
} ());

function throttle(callback, delay) {
    let isWaiting = false;
    let savedArgs = null;
    let savedThis = null;

    return function wrapper(...args) {
        if (isWaiting) {
            savedArgs = args;
            savedThis = this;
            return;
        }

        callback.apply(this, args);

        isWaiting = true;
        setTimeout(() => {
            isWaiting = false;
            if (savedThis) {
                wrapper.apply(savedThis, savedArgs);
                savedThis = null;
                savedArgs = null;
            }
        }, delay);
    }
}