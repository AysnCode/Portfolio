const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if(scrollPos > 10){
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const lerp = (current, target, factor) => {
   return current * (1-factor) + target * factor;
};

let mousePosition = {x: 0, y: 0};
window.addEventListener('mousemove', (e) => {
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;  
});

const calculateDistance = (x1,y1,x2,y2) => {
    return Math.hypot(x1-x2, y1-y2);
};

class MagneticObject{
    constructor(domElement){
        this.domElement = domElement;
        this.boundingClientRect = this.domElement.getBoundingClientRect();
        this.triggerArea = 500;
        this.interpolationFactor = 0.8;
        this.lerpingData = {
            x:{current: 0, target: 0},
            y:{current: 0, target: 0},
        };
        this.resize();
        this.render();
    }

    resize(){
        window.addEventListener("resize", (e) => {
            this.boundingClientRect = this.domElement.getBoundingClientRect();
        })
    }

    render(){
        const distanceFromMouseToCenter = calculateDistance(
            mousePosition.x,

            mousePosition.y,

            this.boundingClientRect.left + this.boundingClientRect.width / 2,

            this.boundingClientRect.top + this.boundingClientRect.height / 2
        );
        let targetHolder = { x: 0, y: 0 }; 
        if(distanceFromMouseToCenter<this.triggerArea){
            
            this.domElement.classList.add("focus");

            targetHolder.x = (mousePosition.x - (this.boundingClientRect.left + this.boundingClientRect.width / 2)) * 0.3;

            targetHolder.y = (mousePosition.y - (this.boundingClientRect.top + this.boundingClientRect.height / 2)) * 0.3;
        } else {
            this.domElement.classList.remove("focus");
        }
        this.lerpingData["x"].target = targetHolder.x;
        this.lerpingData["y"].target = targetHolder.y;

        for(const item in this.lerpingData) {
            this.lerpingData[item].current = lerp(
                this.lerpingData[item].current, 
                this.lerpingData[item].target, 
                this.interpolationFactor
            );
        }

        this.domElement.style.transform = `translate(${this.lerpingData["x"].current}px, ${this.lerpingData["y"].current}px)`

        window.requestAnimationFrame(() => this.render());
    }
}

const img = document.querySelector('.about__image');
new MagneticObject(img);


//Accordion 

const accordion = document.getElementsByClassName('container');

for (i=0; i<accordion.length; i++) {
  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active')
  })
}
