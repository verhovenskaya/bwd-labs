document.addEventListener('DOMContentLoaded', () => {
    const openDialogButton = document.getElementById('openDialogButton');
    const closeDialogButton = document.getElementById('closeDialogButton');
    const dialog = document.getElementById('myDialog');
    const taskInput = document.getElementById('task-input');
    const toDoList = document.getElementById('toDoList');
    const inProgressList = document.getElementById('inProgressList');
    const completedList = document.getElementById('completedList');
    const overlay = document.createElement('div');


    // Загрузка задач из localStorage
    loadTasks();

    openDialogButton.addEventListener('click', () => {
        dialog.showModal();
    });

    closeDialogButton.addEventListener('click', () => {
        dialog.close();
    });

    document.getElementById('add-task-form').addEventListener('submit', (event) => {
        event.preventDefault();
        if (taskInput.value.trim()) { // Проверяем, что ввод не пустой
            addTask(taskInput.value);
            taskInput.value = '';
            dialog.close();
        }
    });

    function addTask(taskText) {
        const taskItem = createTaskItem(taskText); // Создаем новую задачу
        toDoList.appendChild(taskItem);
        saveTasks(); // Сохраняем изменения
    }

    function createTaskItem(taskText) {
        const li = document.createElement('li');
        li.className = 'task-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        checkbox.addEventListener('change', () => {
            if (inProgressList.contains(li)) {
                moveTask(li, completedList); // Перемещаем в "Выполненные"
            } else if (toDoList.contains(li)) {
                moveTask(li, inProgressList); // Перемещаем в "В процессе"
            } else if (completedList.contains(li)) {
                moveTask(li, toDoList); // Перемещаем обратно в "К выполнению"
            }
            saveTasks(); // Сохраняем изменения после изменения состояния чекбокса
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';
        editButton.className = 'edit-button';

        editButton.addEventListener('click', () => {
            const newText = prompt("Введите новый текст задачи:", taskText);
            if (newText !== null && newText.trim() !== "") {
                taskText = newText; // Обновляем текст задачи
                li.childNodes[1].textContent = taskText; // Обновляем текст в DOM
                saveTasks(); // Сохраняем изменения после редактирования
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.className = 'delete-button';

        deleteButton.addEventListener('click', () => {
            li.remove(); // Удаляем элемент из DOM
            saveTasks(); // Сохраняем изменения после удаления
        });

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(taskText));
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        return li;
    }

    function moveTask(taskItem, targetList) {
        // Удаляем задачу из текущего списка
        taskItem.remove();

        // Добавляем задачу в новый список
        targetList.appendChild(taskItem);

        // Обновляем состояние чекбокса
        const checkbox = taskItem.querySelector('input[type="checkbox"]');
        checkbox.checked = false; // Сбрасываем чекбокс при перемещении
    }

    function saveTasks() {
        const tasks = {
            toDo: Array.from(toDoList.children).map(item => ({
                text: item.childNodes[1].textContent,
            })),
            inProgress: Array.from(inProgressList.children).map(item => ({
                text: item.childNodes[1].textContent,
            })),
            completed: Array.from(completedList.children).map(item => ({
                text: item.childNodes[1].textContent,
            })),
        };

        localStorage.setItem('tasks', JSON.stringify(tasks)); // Сохраняем задачи в localStorage
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || { toDo: [], inProgress: [], completed: [] };

        tasks.toDo.forEach(task => {
            toDoList.appendChild(createTaskItem(task.text));
        });

        tasks.inProgress.forEach(task => {
            inProgressList.appendChild(createTaskItem(task.text));
        });

        tasks.completed.forEach(task => {
            completedList.appendChild(createTaskItem(task.text));
        });
    }
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    openDialogButton.addEventListener('click', () => {
        myDialog.showModal();
        overlay.classList.add('active'); // Добавляем активный класс для затемнения
    });

    closeDialogButton.addEventListener('click', () => {
        myDialog.close();
        overlay.classList.remove('active'); // Убираем активный класс при закрытии
    });

    window.addEventListener('click', function (event) {
        if (event.target === myDialog) {
            myDialog.close();
            overlay.classList.remove('active'); // Убираем активный класс при клике вне диалога
        }
    });
    myDialog.addEventListener('click', () => {
        myDialog.close();
        overlay.classList.remove('active'); // Убираем активный класс при закрытии
    });

});

