from django.db import models
from games.models import Game
from teams.models import Team

class Tournament(models.Model):
    title = models.CharField(max_length=200)
    prize_pool = models.DecimalField(max_digits=10, decimal_places=2)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    date = models.DateTimeField()
    max_teams = models.PositiveIntegerField(default=16)
    registration_deadline = models.DateTimeField()
    is_registration_open = models.BooleanField(default=True)
    teams = models.ManyToManyField(Team, related_name='tournaments_participating', blank=True)
    registered_teams = models.ManyToManyField(Team, related_name='tournaments_registered', blank=True)

    def __str__(self):
        return self.title
