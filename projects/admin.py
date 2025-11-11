from django.contrib import admin
from .models import HouseProject, Material, Feature, ProjectImage, ProjectPlan, ConstructionStage

class ConstructionStageAdmin(admin.ModelAdmin):
    list_display = ('title', 'project', 'order', 'is_required_display',  'cost_per_sqm')
    list_filter = ('project', 'is_required')
    search_fields = ('title', 'project__title')

    def is_required_display(self, obj):
        return 'Да' if obj.is_required else 'Нет'
    is_required_display.short_description = 'Обязательный'

admin.site.register(ConstructionStage, ConstructionStageAdmin)
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