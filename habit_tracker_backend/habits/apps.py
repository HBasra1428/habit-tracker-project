from django.apps import AppConfig

class HabitsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'habits'

    def ready(self):
        from .utils import create_default_admin
        create_default_admin()