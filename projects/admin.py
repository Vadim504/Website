from django.contrib import admin
from .models import HouseProject, Material, Feature, ProjectImage

class ProjectImageInline(admin.StackedInline):
    model = ProjectImage
    extra = 3
    fields = ('image', 'is_main')
    verbose_name = "Изображение"
    verbose_name_plural = "Галерея изображений"

@admin.register(HouseProject)
class HouseProjectAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    list_display = ('title', 'price', 'area_total', 'bedrooms', 'bathrooms')
    search_fields = ('title', 'description')
    list_filter = ('materials', 'features')
    filter_horizontal = ('materials', 'features')
    inlines = [ProjectImageInline]

@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)