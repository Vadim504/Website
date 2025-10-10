from django.db import models

class ContactRequest(models.Model):
    first_name = models.CharField(max_length=50, verbose_name='Имя')
    last_name = models.CharField(max_length=50, verbose_name='Фамилия')
    email = models.EmailField(verbose_name='Эл. почта')
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name='Телефон')
    address = models.CharField(max_length=200, blank=True, null=True, verbose_name='Адрес')
    subject = models.CharField(max_length=200, blank=True, null=True, verbose_name='Тема')
    message = models.TextField(verbose_name='Сообщение')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    
    class Meta:
        verbose_name = 'Запрос обратной связи'
        verbose_name_plural = 'Запросы обратной связи'
        ordering = ['-created_at']
    
    def __str__(self):
        return f'{self.first_name} {self.last_name} - {self.email}'

