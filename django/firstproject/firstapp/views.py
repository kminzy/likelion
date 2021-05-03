from django.shortcuts import render

def welcome(request): #welcome함수 요청하면
    return render(request, "welcome.html") #render함수로 welcome.html 띄워준다

def hello(request):
    userName = request.GET['myname']
    return render(request, "hello.html", {'userName' : userName}) #hello.html로 userName값 전달
