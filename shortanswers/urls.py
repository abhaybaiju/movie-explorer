"""shortanswers URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),

      # apiclient on client-side will request this address later
    path("graphql", csrf_exempt(GraphQLView.as_view(graphiql=True))),
    
    # index.html file will be our root template. When a user opens our webste,
    # this file will be sent by server at first. After then, api requests
    # will directed above address.
    # (it points to ~/Blog/djr/templates/index.html)
    # (currently there is no file, webpack production bundle will come here )
    path("", TemplateView.as_view(template_name="index.html")),
]
