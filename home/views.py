from django.shortcuts import render, redirect
from django.contrib import messages
from .models import ContactRequest
from projects.models import HouseProject

# Create your views here.
def index_view(request):
    return render(request, 'home/index.html')  

def about_view(request):
    projects = HouseProject.objects.all()
    return render(request, 'home/about.html', {'projects': projects})


def contacts(request):
    if request.method == 'POST':
        try:
            # Создаем запись в базе данных
            contact = ContactRequest(
                first_name=request.POST.get('firstName'),
                last_name=request.POST.get('lastName'),
                email=request.POST.get('email'),
                phone=request.POST.get('phone'),
                address=request.POST.get('address'),
                subject=request.POST.get('subject'),
                message=request.POST.get('message')
            )
            contact.save()
            
            messages.success(request, 'Сообщение отправлено! Мы свяжемся с вами в ближайшее время.')
            return redirect('contacts')
            
        except Exception as e:
            messages.error(request, 'Произошла ошибка при отправке сообщения. Попробуйте еще раз.')
    
    return render(request, 'home/contacts.html')

