class MouseListener
{
    inWindow : boolean;
    position : Vector;
    buttonDown : boolean;

    constructor() {
        this.position = new Vector();
        this.inWindow = true;
        window.addEventListener("mousedown", this.mouseDown);
        window.addEventListener("mouseup", this.mouseUp);
        window.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("mouseenter", this.mouseEnter);
        document.addEventListener("mouseleave", this.mouseLeave);
    }

    mouseDown = (ev: MouseEvent) => {
        this.buttonDown = true;
    }

    mouseUp = (ev: MouseEvent) => {
        this.buttonDown = false;
    }

    mouseMove = (ev: MouseEvent) => {
       	this.position = new Vector(ev.clientX, ev.clientY);
    }

    mouseEnter = (ev: MouseEvent) => {
        this.inWindow = true;
    }

    mouseLeave = (ev: MouseEvent) => {
        this.inWindow = true;
    }

}