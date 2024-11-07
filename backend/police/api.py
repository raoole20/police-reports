from rest_framework import viewsets, permissions
from .models import Police
from .serializer import PoliceSerializer

class PoliceViewSet(viewsets.ModelViewSet):
    queryset = Police.objects.all()
    serializer_class = PoliceSerializer
    permission_classes = [permissions.AllowAny]