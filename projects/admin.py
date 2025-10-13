from django.contrib import admin
from .models import HouseProject, Material, Feature, ProjectImage, ProjectPlan

class ProjectImageInline(admin.StackedInline):
    model = ProjectImage
    extra = 3
    fields = ('image', 'is_main','image_type')
    verbose_name = "Изображение"
    verbose_name_plural = "Галерея изображений"

class ProjectPlanInline(admin.TabularInline):
    model = ProjectPlan
    extra = 1  # Сколько пустых форм добавлять
    fields = ('title', 'image', 'is_main', 'order')

@admin.register(HouseProject)
class HouseProjectAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    list_display = ('title', 'price', 'area_total', 'bedrooms', 'bathrooms')
    search_fields = ('title', 'description')
    list_filter = ('materials', 'features')
    filter_horizontal = ('materials', 'features')
    # === Добавлен ProjectPlanInline ===
    inlines = [ProjectImageInline, ProjectPlanInline]

@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(ProjectPlan)
class ProjectPlanAdmin(admin.ModelAdmin):
    list_display = ('project', 'title', 'is_main', 'order')
    list_filter = ('project', 'is_main')
    list_editable = ('is_main', 'order')