from django.db import models
import uuid


class Test(models.Model):
    ID = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, primary_key=True)
    Key = models.CharField(max_length=200)
    MAC_ID = models.CharField(max_length=200, null=True, blank=True)
    Device = models.CharField(max_length=200, null=True, blank=True)
    Username = models.CharField(max_length=200, null=True, blank=True)
    UsageDateAndTime = models.CharField(max_length=200, null=True, blank=True)
    Temperature = models.CharField(max_length=200, null=True, blank=True)
    pHin = models.CharField(max_length=200, null=True, blank=True)
    TDSin = models.CharField(max_length=200, null=True, blank=True)
    pHout = models.CharField(max_length=200, null=True, blank=True)
    TDSout = models.CharField(max_length=200, null=True, blank=True)
    MotorONInSeconds = models.CharField(max_length=200, null=True, blank=True)
    VolumeSampled = models.CharField(max_length=200, null=True, blank=True)
    NoOfHourUsed = models.CharField(max_length=200, null=True, blank=True)
    CartridgeLifeLeft = models.CharField(max_length=200, null=True, blank=True)
    OperationStatus = models.CharField(max_length=200, null=True, blank=True)
    CreatedAt = models.DateTimeField(auto_now_add=True)


class Project(models.Model):
    FullName = models.CharField(max_length=200)
    Email = models.EmailField(max_length=254)
    Country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    State = models.CharField(max_length=100)
    Username = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)





