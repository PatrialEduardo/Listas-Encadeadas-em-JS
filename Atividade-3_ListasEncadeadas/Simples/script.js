class Node {
    constructor(element) {
        this.value = element;
        this.next = undefined;
    }
}

class Lista {
    constructor() {
        this.head = undefined;
        this.count = 0;
    }

    push(element) {
        const node = new Node(element);
        let current;

        if (this.head == null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }

    remove(element) {
        if (!this.head) {
            console.log(`Nó com valor ${element} não encontrado.`);
            return;
        }

        let current = this.head;
        let previous = null;
        let found = false;

        while (current != null) {
            if (current.value === element) {
                found = true;
                if (previous == null) {
                    this.head = current.next;
                } else {
                    previous.next = current.next;
                }
                this.count--;
                break;
            }
            previous = current;
            current = current.next;
        }

        if (!found) {
            console.log(`Nó com valor ${element} não encontrado.`);
        }
    }

    toArray() {
        const elements = [];
        let current = this.head;
        while (current != null) {
            elements.push(current);
            current = current.next;
        }
        return elements;
    }
}

const lista = new Lista();

function addElement() {
    const input = document.getElementById('elementInput');
    const value = input.value.trim();
    if (value !== "") {
        lista.push(value);
        input.value = "";
        renderList();
    }
}

function removeElement(element) {
    lista.remove(element);
    renderList();
}

function renderList() {
    const container = document.getElementById('listContainer');
    container.innerHTML = ""; // Limpa o conteúdo atual

    const elements = lista.toArray();
    elements.forEach((node, index) => {
        const nodeDiv = document.createElement('div');
        nodeDiv.className = 'node';
        nodeDiv.textContent = node.value;

        if (node.next) {
            nodeDiv.textContent += ` -> ${node.next.value}`;
        } else {
            nodeDiv.textContent += ' -> null';
        }

        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.onclick = () => removeElement(node.value);
        nodeDiv.appendChild(removeButton);

        container.appendChild(nodeDiv);
    });
}

document.addEventListener('DOMContentLoaded', renderList);
