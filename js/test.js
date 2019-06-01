window.addEventListener('DOMContentLoaded', function () {

    class Options {

        constructor(text, height = 300, width = 600, bg = '#cccccc', fontSize = 16, textAlign = 'center', margin = '0 auto') {
            this.text = text;
            this.height = height;
            this.width = width;
            this.bg = bg;
            this.fontSize = fontSize;
            this.textAlign = textAlign;
            this.margin = margin;
        }

        createDiv() {
            let div = document.createElement('div');
            div.className = 'options';
            div.style.cssText = `
                height: ${this.height}px;
                width: ${this.width}px;
                background-color: ${this.bg};
                font-size: ${this.fontSize}px;
                text-align: ${this.textAlign};
                margin: ${this.margin};
            `;
            div.textContent = this.text;
            document.body.appendChild(div);
        }
    }

    new Options('Новый div', 400, 700, 'dodgerblue').createDiv();
});