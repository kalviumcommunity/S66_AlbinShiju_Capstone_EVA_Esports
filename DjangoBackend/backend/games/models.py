from django.db import models

class Game(models.Model):
    name = models.CharField(max_length=100, unique=True)
    genre = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name
