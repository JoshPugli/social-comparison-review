from django.apps import AppConfig

class AppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "app"
    
    def ready(self):
        from .utils import load_model_into_cache
        load_model_into_cache()
        print("Model loaded into cache")
        from .utils import load_data_into_cache
        load_data_into_cache()
        print("Data loaded into cache")
