class GenerateElements {

    generateElementById(tagName, id) {
        let element = document.createElement(tagName);
        document.getElementById(id).appendChild(element);
        return element;
    }

    generateElementText(tagName, text, id) {
        let tag = document.createElement(tagName);
        let textNode = document.createTextNode(text);
        tag.appendChild(textNode);
        this.generateOnLastChild(id, tag);
    }

    generateLinkImg(href, src, className, id) {
        let linkElem = document.createElement('a');
        let imgElem = this.generateImg(src, className);

        linkElem.href = href;
        linkElem.appendChild(imgElem);
        this.generateOnLastChild(id, linkElem);
    }

    generateImg(src,className) {
        let img = document.createElement('img');
        img.src = src;
        img.className = className;
        return img
    }

    generateOnLastChild(id, element) {
        let elem = document.getElementById(id).lastElementChild;
        elem.appendChild(element);
    }


    generateListButton(list, idDiv, id) {

        this.generateDiv(idDiv, id)

        list.forEach(data => {
            this.generateButton(data, idDiv);
        });
    }

    generateButton(text, id) {
        let btn = document.createElement('button');
        let btnText = document.createTextNode(text);
        btn.appendChild(btnText);
        document.getElementById(id).appendChild(btn);
    }

    generateDiv(idDiv, id) {
        let div = document.createElement('div');
        div.id = idDiv;

        this.generateOnLastChild(id, div);
    }
}