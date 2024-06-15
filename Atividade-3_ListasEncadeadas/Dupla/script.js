class TaskNode {
    constructor(titulo, descricao) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.next = null;
        this.prev = null;
    }
}

class TaskList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    addTask(titulo, descricao) {
        const newTask = new TaskNode(titulo, descricao);
        if (this.head === null) {
            this.head = this.tail = newTask;
        } else {
            this.tail.next = newTask;
            newTask.prev = this.tail;
            this.tail = newTask;
        }
    }

    removeTask(titulo) {
        if (this.head === null) {
            return;
        }

        let current = this.head;
        while (current !== null && current.titulo !== titulo) {
            current = current.next;
        }
        if (current === null) {
            return;
        }
        if (current === this.head) {
            this.head = current.next;
            if (this.head !== null) {
                this.head.prev = null;
            } else {
                this.tail = null;
            }
        } else if (current === this.tail) {
            this.tail = current.prev;
            this.tail.next = null;
        } else {
            current.prev.next = current.next;
            current.next.prev = current.prev;
        }
    }

    toArray() {
        const tasks = [];
        let current = this.head;
        while (current !== null) {
            tasks.push(current);
            current = current.next;
        }
        return tasks;
    }
}

const taskList = new TaskList();

function addTask() {
    const tituloInput = document.getElementById('tituloInput');
    const descricaoInput = document.getElementById('descricaoInput');
    const titulo = tituloInput.value.trim();
    const descricao = descricaoInput.value.trim();

    if (titulo !== "" && descricao !== "") {
        taskList.addTask(titulo, descricao);
        tituloInput.value = "";
        descricaoInput.value = "";
        renderList();
    }
}

function removeTask(titulo) {
    taskList.removeTask(titulo);
    renderList();
}

function renderList() {
    const container = document.getElementById('listContainer');
    container.innerHTML = ""; // Limpa o conteúdo atual

    const tasks = taskList.toArray();
    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.textContent = `Título: ${task.titulo}, Descrição: ${task.descricao}`;

        if (task.prev) {
            taskDiv.textContent += `, Anterior: ${task.prev.titulo}`;
        } else {
            taskDiv.textContent += `, Anterior: null`;
        }

        if (task.next) {
            taskDiv.textContent += `, Próximo: ${task.next.titulo}`;
        } else {
            taskDiv.textContent += `, Próximo: null`;
        }

        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.onclick = () => removeTask(task.titulo);
        taskDiv.appendChild(removeButton);

        container.appendChild(taskDiv);
    });
}

document.addEventListener('DOMContentLoaded', renderList);
