from rest_framework import serializers
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from ipware.ip import get_real_ip

from .models import School, Vote


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'


class SchoolList(ListAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        exclude = ('pub_date',)
        extra_kwargs = {'ip_addr': {'write_only': True}}

    def save(self, **kwargs):
        vote = super().save(**kwargs)
        vote.school.vote_num += 1
        vote.school.save()
        return vote


class VoteList(ListAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class VoteDetail(RetrieveAPIView, CreateAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    lookup_field = 'user_id'

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def perform_create(self, serializer):
        ip_addr = get_real_ip(self.request)
        serializer.save(ip_addr=ip_addr)
