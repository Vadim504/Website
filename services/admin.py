# services/admin.py
from django.contrib import admin
from .models import (
    Service, 
    EquipmentType, 
    Equipment, 
    EquipmentImage,
    Project,
    ProjectSection,
    SectionImage
)

# =============== УСЛУГИ ===============
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}  # автозаполнение slug
    fields = ('title', 'slug', 'description')


# =============== ТИПЫ ТЕХНИКИ ===============
@admin.register(EquipmentType)
class EquipmentTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


# =============== ИЗОБРАЖЕНИЯ ТЕХНИКИ (встроенные) ===============
class EquipmentImageInline(admin.TabularInline):
    model = EquipmentImage
    extra = 3
    fields = ('image', 'caption')


# =============== ТЕХНИКА ===============
@admin.register(Equipment)
class EquipmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'equipment_type', 'capacity', 'hourly_rate')
    list_filter = ('equipment_type',)
    search_fields = ('name', 'description')
    inlines = [EquipmentImageInline]
    fieldsets = (
        ('Основное', {
            'fields': ('name', 'equipment_type', 'description')
        }),
        ('Характеристики', {
            'fields': ('capacity', 'hourly_rate', 'specs'),
            'classes': ('collapse',)
        }),
        ('Главное изображение', {
            'fields': ('image',),
            'classes': ('collapse',)
        }),
    )


# =============== ИЗОБРАЖЕНИЯ СЕКЦИЙ ПРОЕКТОВ (встроенные) ===============
class SectionImageInline(admin.TabularInline):
    model = SectionImage
    extra = 3
    fields = ('image', 'order')


# =============== СЕКЦИИ ПРОЕКТОВ (встроенные) ===============
class ProjectSectionInline(admin.TabularInline):
    model = ProjectSection
    extra = 1
    fields = ('title', 'description', 'order')
    show_change_link = True  # кнопка "Изменить" для редактирования секции отдельно


# =============== ПРОЕКТЫ ===============
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'area_total', 'price', 'created_at')
    list_filter = ('location', 'style', 'created_at')
    search_fields = ('title', 'description', 'location')
    inlines = [ProjectSectionInline]
    fieldsets = (
        ('Основное', {
            'fields': ('title', 'description', 'style')
        }),
        ('Детали проекта', {
            'fields': ('area_total', 'location', 'duration', 'price'),
            'classes': ('collapse',)
        }),
        ('Изображения', {
            'fields': ('main_image',),
            'classes': ('collapse',)
        }),
    )


# =============== СЕКЦИИ ПРОЕКТОВ (отдельная регистрация) ===============
@admin.register(ProjectSection)
class ProjectSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'project', 'order')
    list_filter = ('project',)
    search_fields = ('title', 'description')
    inlines = [SectionImageInline]
    fields = ('project', 'title', 'description', 'order')