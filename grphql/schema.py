import graphene
from items.models import Question
from graphene_django.types import DjangoObjectType

class QuestionType(DjangoObjectType):
    id  = graphene.Int()
    user_name = graphene.String()
    date = graphene.DateTime()
    body = graphene.String()
    user_image_url = graphene.String()
    slug = graphene.String()

    class Meta:
        model = Question
    
    def resolve_id(self,info):
        return self.id
    
    def resolve_user_name(self,info):
        return self.user_name

    def resolve_date(self,info):
        return self.date
    
    def resolve_body(self,info):
        return self.body

    def resolve_user_image_url(self,info):
        return self.user_image_url

    def resolve_slug(self,info):
        return self.slug;

class Query(graphene.ObjectType):
    question_list = graphene.List(QuestionType)
    question = graphene.Field(QuestionType,slug=graphene.String())

    def resolve_question_list(self,info,*_):
        return Question.objects.all().only("user_name","date","slug")
    
    def resolve_question(self,info,slug):
        question_queryset = Question.objects.filter(slug=slug)
        if question_queryset.exists():
            return question_queryset.first()

schema = graphene.Schema(query = Query)