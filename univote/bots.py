from django.core.exceptions import SuspiciousOperation
from django.http import Http404
from django.views.generic.base import TemplateView

from .models import School, Vote


class PreRenderVoteDetail(TemplateView):

    template_name = 'univote/pre_render_vote_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        user_id = kwargs.get('user_id', None)
        if not user_id:
            raise SuspiciousOperation

        vote = Vote.objects.filter(user_id=user_id).first()
        if not vote:
            raise Http404

        context['vote'] = vote
        return context
