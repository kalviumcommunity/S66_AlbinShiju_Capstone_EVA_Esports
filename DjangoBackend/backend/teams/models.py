from django.db import models
from auth.models import User

class Team(models.Model):
    name = models.CharField(max_length=100)
    members = models.ManyToManyField(User, related_name='teams')
    tournaments = models.ManyToManyField('tournaments.Tournament', related_name='teams', blank=True)

    def __str__(self):
        return self.name
