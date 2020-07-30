from django.db import models

# Create your models here.
class Question(models.Model):
    id = models.IntegerField(primary_key=True)
    user_name = models.CharField(max_length=100)
    date = models.DateTimeField(null=True)
    body = models.TextField(max_length=5000,null=True)
    user_image_url = models.URLField(blank=True, null=True)
    slug = models.SlugField(
                max_length=50, null=True,blank =True, unique=True)
    class Meta:
        ordering = ["-date"]
    def __str__(self):
        return self.body