from django.shortcuts import render

# Create your views here.
def index_view(request):
    return render(request, 'home/index.html')  

def about_view(request):
    return render(request, 'home/about.html')

def services_view(request):
    return render(request, 'home/about.html')

def projects_view(request):
    return render(request, 'home/about.html')

def contacts_view(request):
    return render(request, 'home/about.html')