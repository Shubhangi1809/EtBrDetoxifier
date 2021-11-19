from django.urls import path
from . import views

urlpatterns = [
    path('', views.login, name='EtBr-login'),
    path('t/<str:pk>/', views.Input),
    path('register/', views.register, name='EtBr-register'),
    path('index/', views.index, name='EtBr-index'),
    path('maps/', views.maps, name='EtBr-maps'),
    path('profile/', views.profile, name='EtBr-profile'),
    path('reports/', views.reports, name='EtBr-reports'),
    path('help/', views.help, name='EtBr-help'),
    ]