from django.shortcuts import render, get_object_or_404
from .models import HouseProject, Stage
from django.db.models import Sum

# views.py
def project_detail(request, slug):
    project = get_object_or_404(HouseProject, slug=slug)
    
    # project.price уже включает обязательные параметры и технологию строительства "каркас"
    # Это стартовая базовая цена, которую нужно использовать напрямую
    # Используем Decimal для точности, но преобразуем в int для передачи в шаблон
    from decimal import Decimal
    base_price_with_required = int(Decimal(str(project.price)))

    return render(request, 'projects/project_detail.html', {
        'project': project,
        'stages': Stage.objects.all(),
        'base_price_with_required': base_price_with_required,  # Базовая цена с обязательными этапами и технологией "каркас"
    })

def project_list(request):
    # Начинаем с всех проектов
    projects = HouseProject.objects.all()

    # Получаем параметры из GET-запроса
    q = request.GET.get('q', '').strip()  # Поиск по названию
    min_price = request.GET.get('min_price', '')
    max_price = request.GET.get('max_price', '')
    min_area = request.GET.get('min_area', '')
    max_area = request.GET.get('max_area', '')
    floors = request.GET.get('floors', '')
    bedrooms = request.GET.get('bedrooms', '')
    bathrooms = request.GET.get('bathrooms', '')

    # Применяем фильтры только если они заданы
    if q:
        projects = projects.filter(title__icontains=q)
    if min_price and min_price != '0':
        projects = projects.filter(price__gte=min_price)
    if max_price and max_price != '100000000':
        projects = projects.filter(price__lte=max_price)
    if min_area and min_area != '1':
        projects = projects.filter(area_total__gte=min_area)
    if max_area and max_area != '500':
        projects = projects.filter(area_total__lte=max_area)
    if floors:
        # Для этажности пока оставим как есть, можно добавить поле floors в модель позже
        pass
    if bedrooms:
        projects = projects.filter(bedrooms=bedrooms)
    if bathrooms:
        projects = projects.filter(bathrooms=bathrooms)

    # Передаём параметры обратно в шаблон, чтобы форма сохранила значения
    context = {
        'projects': projects,
        'q': q,
        'min_price': min_price,
        'max_price': max_price,
        'min_area': min_area,
        'max_area': max_area,
        'floors': floors,
        'bedrooms': bedrooms,
        'bathrooms': bathrooms,
    }

    return render(request, 'projects/project_list.html', context)

