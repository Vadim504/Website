# services/views.py
from django.shortcuts import render, get_object_or_404
from .models import Service, Equipment, EquipmentType, Project, SectionImage

def equipment_detail(request, pk):
    equipment = get_object_or_404(Equipment, pk=pk)
    return render(request, 'services/equipment_detail.html', {'equipment': equipment})

def interior_design_list(request):
    """Страница со списком проектов интерьерного дизайна."""
    projects = Project.objects.filter(service_type='interior')  # ✅ Только интерьерные
    return render(request, 'services/interior_design_list.html', {'projects': projects})

# projects/views.py
# projects/views.py
def interior_design(request, pk):
    project = get_object_or_404(Project, pk=pk, service_type='interior')  # ← Используй Project, не SectionImage!

    # Собираем все секции с изображениями
    sections_with_images = []
    for section in project.sections.all():
        images = list(section.images.all())
        if images:
            sections_with_images.append({
                'section': section,
                'images': images
            })

    return render(request, 'services/interior_design_detail.html', {
        'project': project,
        'sections_with_images': sections_with_images,
    })

def landscape_design_list(request):
    """Страница со списком проектов ландшафтного дизайна."""
    projects = Project.objects.filter(service_type='landscape').prefetch_related('sections')  # ✅
    return render(request, 'services/landscape_design_list.html', {'projects': projects})  # ✅

def landscape_design(request, pk):
    project = get_object_or_404(
        Project.objects.prefetch_related('sections__images'),
        pk=pk,
        service_type='landscape'
    )
    return render(request, 'services/landscape_design_detail.html', {'project': project})

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
