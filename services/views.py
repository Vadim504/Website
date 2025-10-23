# services/views.py
from django.shortcuts import render, get_object_or_404
from .models import Service, Equipment, EquipmentType, Project

def equipment_detail(request, pk):
    equipment = get_object_or_404(Equipment, pk=pk)
    return render(request, 'services/equipment_detail.html', {'equipment': equipment})

def interior_design_list(request):
    """Страница со списком всех проектов."""
    projects = Project.objects.all()
    return render(request, 'services/interior_design_list.html', {'projects': projects})

def interior_design(request, pk):
    """Детальная страница одного проекта."""
    project = get_object_or_404(Project, pk=pk)
    return render(request, 'services/interior_design_detail.html', {'project': project})

def landscape_design(request):
    return render(request, 'services/landscape_design.html')

def rent_view(request):
    equipments = Equipment.objects.all()
    types = EquipmentType.objects.all()
    return render(request, 'services/rent.html', {
        'equipments': equipments,
        'types': types,
    })

def geodetic_survey(request):
    return render(request, 'services/geodetic_survey.html')

def well_drilling(request):
    return render(request, 'services/well_drilling.html')

def utilities_installation(request):
    return render(request, 'services/utilities_installation.html')
