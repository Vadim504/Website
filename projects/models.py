# project/models.py
from django.db import models

class Material(models.Model):
    name = models.CharField(max_length=50, verbose_name="Материал")

    class Meta:
        verbose_name = "Материал"
        verbose_name_plural = "Материалы"

    def __str__(self):
        return self.name


class Feature(models.Model):
    name = models.CharField(max_length=100, verbose_name="Особенность")

    class Meta:
        verbose_name = "Особенность"
        verbose_name_plural = "Особенности"

    def __str__(self):
        return self.name


class HouseProject(models.Model):
    title = models.CharField(max_length=200, verbose_name="Название проекта")
    slug = models.SlugField(max_length=200, unique=True, verbose_name="ЧПУ (URL)")
    price = models.DecimalField(max_digits=12, decimal_places=2, verbose_name="Цена (₽)")
    area_total = models.DecimalField(max_digits=6, decimal_places=2, verbose_name="Общая площадь, м²")
    area_garage = models.DecimalField(max_digits=6, decimal_places=2, verbose_name="Площадь навеса для авто, м²", blank=True, null=True)
    area_terrace = models.DecimalField(max_digits=6, decimal_places=2, verbose_name="Площадь крытой террасы, м²", blank=True, null=True)
    bedrooms = models.PositiveIntegerField(verbose_name="Спальни", default=1)
    bathrooms = models.PositiveIntegerField(verbose_name="Санузлы", default=1)
    description = models.TextField(verbose_name="Описание проекта", blank=True)
    materials = models.ManyToManyField(Material, verbose_name="Материалы", blank=True)
    features = models.ManyToManyField(Feature, verbose_name="Особенности", blank=True)
    main_image = models.ImageField(upload_to='projects/main/', verbose_name="Главное изображение")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Проект дома"
        verbose_name_plural = "Проекты домов"

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    project = models.ForeignKey(HouseProject, on_delete=models.CASCADE, related_name='images', verbose_name="Проект")
    image = models.ImageField(upload_to='projects/gallery/', verbose_name="Изображение")
    is_main = models.BooleanField(default=False, verbose_name="Основное изображение в галерее")

    class Meta:
        verbose_name = "Изображение проекта"
        verbose_name_plural = "Изображения проектов"

    def __str__(self):
        return f"{self.project.title} - {self.image.name}"