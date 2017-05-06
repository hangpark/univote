"""univote URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.views.generic.base import TemplateView

from .views import SchoolList, SchoolVoteList, VoteList, VoteListRandom, VoteDetail
from .bots import PreRenderVoteDetail

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/schools/$', SchoolList.as_view()),
    url(r'^api/schools/(?P<id>[0-9]+)/$', SchoolVoteList.as_view()),
    url(r'^api/votes/$', VoteList.as_view()),
    url(r'^api/votes/random/$', VoteListRandom.as_view()),
    url(r'^api/votes/(?P<user_id>[0-9]+)/$', VoteDetail.as_view()),
    url(r'^bot/$', TemplateView.as_view(template_name='univote/pre_render_main.html')),
    url(r'^bot/(?P<user_id>[0-9]+)/$', PreRenderVoteDetail.as_view()),
]
