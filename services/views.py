# services/views.py
from django.shortcuts import render, get_object_or_404
from .models import Service  # предполагается, что у вас есть модель Service

def service_detail(request, service_slug):
    service = get_object_or_404(Service, slug=service_slug)
    return render(request, 'services/detail.html', {'service': service})