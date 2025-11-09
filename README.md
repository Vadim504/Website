# Создать виртуальное окружение
python -m venv venv

# Активировать его (Windows)
venv\Scripts\activate

# Активировать его (macOS / Linux)
source venv/bin/activate

# Установить необходимые библиотеки
pip install -r requirements.txt

# Выполнить миграции
python manage.py migrate

# Создать суперюзера
python manage.py createsuperuser

# Запустить сервер
python manage.py runserver

# Для загрузки информации на сервер перейти на страницу admin/ авторизироваться и добавить необходимую информацию