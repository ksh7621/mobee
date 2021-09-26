from django import forms
from .models import Movie, Review, UpMovie
from django.forms import ModelForm
from django.utils.translation import gettext_lazy as _


class MovieForm(forms.ModelForm):
    class Meta:
        model = Movie
        app_label = "default"
        fields = '__all__'


class UpMovieForm(forms.ModelForm):
    class Meta:
        model = UpMovie
        app_label = "upcoming"
        fields = '__all__'


class ReviewForm(ModelForm):
    class Meta:
        model = Review
        fields = ['comment', 'movie']
        labels = {
            'comment': _('코멘트'),
        }
        widgets = {
            'movie': forms.HiddenInput(),
        }
        help_texts = {
            'comment': _('코멘트를 입력해주세요.'),
        }
