from django.db import models


class School(models.Model):
    name = models.CharField(max_length=32)
    vote_num = models.IntegerField()
    population = models.IntegerField()

    class Meta:
        ordering = ['name']

    def __str__(self):
        return "{name} - {vote_num}/{population}".format(
            name=self.name, vote_num=self.vote_num, population=self.population)


def user_directory_path(instance, filename):
    return 'user_{user_id}/{filename}'.format(user_id=instance.user_id, filename=filename)


class Vote(models.Model):
    user_id = models.BigIntegerField(unique=True)
    user_name = models.CharField(max_length=64)
    school = models.ForeignKey(School)
    image = models.ImageField(upload_to=user_directory_path)
    comment = models.TextField(blank=True)
    pub_date = models.DateTimeField(auto_now_add=True)
    ip_addr = models.GenericIPAddressField(null=True)

    class Meta:
        ordering = ['-pub_date']

    def __str__(self):
        return "{user_name} - {ip_addr} - {pub_date}".format(
            user_name=self.user_name, ip_addr=self.ip_addr, pub_date=self.pub_date)
