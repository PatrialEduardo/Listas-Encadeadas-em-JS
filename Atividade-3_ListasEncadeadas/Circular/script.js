class Node {
    constructor(dado) {
        this.dado = dado;
        this.next = null;
    }
}

class Circular {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Adiciona um novo nó ao final da lista. Em caso dela estiver vazia, inicializará
    // o nó como head e tail, fazendo como ele aponte para si mesmo
    append(dado) {
        const newNode = new Node(dado);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
            this.tail.next = this.head;
        }
    }

    // Percorre por toda a lista a partir da cabeça até voltar para a mesma
    toArray() {
        if (!this.head) {
            return [];
        }

        let current = this.head;
        const result = [];
        do {
            result.push(current.dado);
            current = current.next;
        } while (current !== this.head);

        return result;
    }

    // Remove o nó desejado da lista, e ajusta os ponteiros para manter a lista circular
    remove(dado) {
        if (!this.head) {
            console.log(`Nó com valor ${dado} não encontrado.`);
            return;
        }

        let current = this.head;
        let previous = this.tail;
        let encontrado = false;

        do {
            if (current.dado === dado) {
                encontrado = true;
                if (current === this.head && current === this.tail) {
                    this.head = null;
                    this.tail = null;
                } else if (current === this.head) {
                    this.head = this.head.next;
                    this.tail.next = this.head;
                } else if (current === this.tail) {
                    this.tail = previous;
                    this.tail.next = this.head;
                } else {
                    previous.next = current.next;
                }
                break;
            }
            previous = current;
            current = current.next;
        } while (current !== this.head);

        if (!encontrado) {
            console.log(`Nó com valor ${dado} não encontrado.`);
        }
    }
}

const lista = new Circular();

function addElement() {
    const input = document.getElementById('elementInput');
    const value = input.value.trim();
    if (value !== "") {
        lista.append(value);
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
    elements.forEach((element, index) => {
        const nodeDiv = document.createElement('div');
        nodeDiv.className = 'node';
        nodeDiv.textContent = element;

        if (index === 0) {
            nodeDiv.classList.add('head');
            nodeDiv.textContent += ' (Head)';
        }
        if (index === elements.length - 1 && lista.tail !== lista.head) {
            nodeDiv.classList.add('tail');
            nodeDiv.textContent += ' (Tail)';
        }

        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.onclick = () => removeElement(element);
        nodeDiv.appendChild(removeButton);

        container.appendChild(nodeDiv);
    });

    // Adjust nodes to form a circle if there are more than one element
    if (elements.length > 1) {
        container.style.display = 'grid';
        const gridSide = Math.ceil(Math.sqrt(elements.length));
        container.style.gridTemplateColumns = `repeat(${gridSide}, 1fr)`;
        container.style.gridGap = '20px';
        container.style.justifyItems = 'center';
        container.style.alignItems = 'center';
    } else {
        container.style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', renderList);
