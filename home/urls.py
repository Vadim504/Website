from django.urls import path
from . import views

urlpatterns = [
    path('', views.index_view, name='home'),
    path('about/', views.about_view, name='about'),
    path('contacts/', views.contacts, name='contacts'),  
    
]