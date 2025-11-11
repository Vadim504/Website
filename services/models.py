# services/models.py
from django.db import models
from django.urls import reverse

class Service(models.Model):
    title = models.CharField('Название', max_length=200)
    slug = models.SlugField('Слаг', max_length=200, unique=True)
    description = models.TextField('Описание', blank=True)
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)

    class Meta:
        verbose_name = 'Услуга'
        verbose_name_plural = 'Услуги'
        ordering = ['title']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('services:service_detail', kwargs={'slug': self.slug})
    

class EquipmentType(models.Model):
    name = models.CharField("Название типа", max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Тип техники"
        verbose_name_plural = "Типы техники"


class Equipment(models.Model):
    name = models.CharField("Название техники", max_length=200)
    equipment_type = models.ForeignKey(EquipmentType, on_delete=models.CASCADE, verbose_name="Тип")
    capacity = models.FloatField("Грузоподъёмность/Мощность", help_text="в тоннах или л.с.")
    hourly_rate = models.DecimalField("Цена за час", max_digits=10, decimal_places=2)
    description = models.TextField("Описание")
    image = models.ImageField("Фото", upload_to='equipment/', blank=True, null=True)
    
    # Новое поле для дополнительных характеристик
    specs = models.JSONField(
        "Дополнительные характеристики",
        blank=True,
        null=True,
        help_text="Например: {\"Длина стрелы\": \"30 м\", \"Вылет стрелы\": \"25 м\"}"
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Единица техники"
        verbose_name_plural = "Техника"

# Новая модель для изображений
class EquipmentImage(models.Model):
    equipment = models.ForeignKey(
        Equipment,
        related_name='images',  # ← позволяет писать equipment.images.all()
        on_delete=models.CASCADE,
        verbose_name="Техника"
    )
    image = models.ImageField("Изображение", upload_to='equipment/')
    caption = models.CharField("Подпись", max_length=200, blank=True)

    def __str__(self):
        return f"Фото для {self.equipment.name}"

    class Meta:
        verbose_name = "Изображение техники"
        verbose_name_plural = "Изображения техники"


class Project(models.Model):
    SERVICE_CHOICES = [
        ('interior', 'Интерьерный дизайн'),
        ('landscape', 'Ландшафтный дизайн'),
    ]

    # Убираем дубли name и description
    title = models.CharField('Название проекта', max_length=200)
    description = models.TextField('Описание')
    area_total = models.DecimalField('Общая площадь', max_digits=6, decimal_places=2, blank=True, null=True)
    location = models.CharField('Город', max_length=100, blank=True)
    duration = models.IntegerField('Срок выполнения (месяцы)', blank=True, null=True)
    price = models.DecimalField('Цена', max_digits=10, decimal_places=0, blank=True, null=True)
    style = models.CharField('Стиль', max_length=100, blank=True)

    # Новое поле для типа услуги
    service_type = models.CharField(
        "Тип услуги",
        max_length=20,
        choices=SERVICE_CHOICES,
        default='interior'
    )

    main_image = models.ImageField('Главное изображение', upload_to='projects/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'


# НОВАЯ МОДЕЛЬ: Изображения проекта
class ProjectImage(models.Model):
    project = models.ForeignKey(
        Project,
        related_name='images',  # 👈 Это позволяет писать project.images.all()
        on_delete=models.CASCADE,
        verbose_name="Проект"
    )
    image = models.ImageField("Изображение", upload_to='projects/')
    caption = models.CharField("Подпись", max_length=200, blank=True)
    order = models.PositiveIntegerField('Порядок', default=0)

    def __str__(self):
        return f"Изображение {self.order} для {self.project.title}"

    class Meta:
        verbose_name = 'Изображение проекта'
        verbose_name_plural = 'Изображения проектов'
        ordering = ['order']

class ProjectSection(models.Model):
    project = models.ForeignKey(Project, related_name='sections', on_delete=models.CASCADE)
    title = models.CharField('Заголовок секции', max_length=200)
    description = models.TextField('Описание секции', blank=True)
    order = models.PositiveIntegerField('Порядок', default=0)

    def __str__(self):
        return f"{self.title} ({self.project.title})"

    class Meta:
        verbose_name = 'Секция проекта'
        verbose_name_plural = 'Секции проекта'
        ordering = ['order']


class SectionImage(models.Model):
    section = models.ForeignKey(ProjectSection, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField('Изображение', upload_to='projects/sections/')
    order = models.PositiveIntegerField('Порядок', default=0)

    def __str__(self):
        return f"Изображение {self.order} для {self.section.title}"

    class Meta:
        verbose_name = 'Изображение секции'
        verbose_name_plural = 'Изображения секций'
        ordering = ['order']