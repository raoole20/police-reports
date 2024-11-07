from rest_framework import routers
from .api import PoliceViewSet

router = routers.DefaultRouter()
router.register('api/polices', PoliceViewSet, 'police')

urlpatterns = router.urls