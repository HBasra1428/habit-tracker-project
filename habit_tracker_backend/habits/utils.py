
def create_default_admin():
    from django.contrib.auth.models import User  # import inside function!

    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser(
            username='admin',
            email='admin@gmail.com',
            password='admin1234'
        )
