from django.urls import path
from . import views

app_name = 'services'

urlpatterns = [
    path('interior_design/', views.interior_design_list, name='interior_design_list'),
    path('interior_design/<int:pk>/', views.interior_design, name='interior_design'),
    path('landscape_design/', views.landscape_design, name='landscape_design'),
    path('rent/', views.rent_view, name='rent'),
    path('geodetic_survey/', views.geodetic_survey, name='geodetic_survey'),
    path('well_drilling/', views.well_drilling, name='well_drilling'),
    path('utilities_installation/', views.utilities_installation, name='utilities_installation'),
    path('equipment/<int:pk>/', views.equipment_detail, name='equipment_detail'),
]