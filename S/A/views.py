from django.shortcuts import render
from .models import Project, Test
from .forms import ProjectForm
from django.http import HttpResponse
from datetime import datetime
from django.core import serializers


def Input(request, pk):
    strtempstring = pk
    temp = strtempstring.split("=")
    if (strtempstring == ''):
        dateandtime = datetime.now().strftime('%Y%m%d%H%M%S')
        query_results = Test.objects.filter().order_by("-CreatedAt")[:1].values("MAC_ID", "Device", "Key")
        strTemp = str(query_results[0])
        strTempList = strTemp.split("'")
        mac = str(strTempList[3])
        key = str(strTempList[5])
        return HttpResponse('RIS=*' + dateandtime + "<'. " + dateandtime + mac + "&" + key + ".'>")
    elif (temp[1] == ''):
        dateandtime = datetime.now().strftime('%Y%m%d%H%M%S')
        query_results = Test.objects.filter().order_by("-CreatedAt")[:1].values("MAC_ID", "Device", "Key")
        strTemp = str(query_results[0])
        print(strTemp)
        strTempList = strTemp.split("'")
        print(strTempList)
        mac = str(strTempList[3])
        data = str(strTempList[7])
        return HttpResponse('RIS=*' + dateandtime + "<'. " + dateandtime + mac + "&" + data + ".'>")
    else:
        temp = strtempstring.split("=", 2)
        if (temp[2] != ''):
            strdata = "1=" + temp[0] + "2=" + temp[1] + "6=" + temp[2]
            temp2 = temp[1]
            Temp1 = temp2.split("@", 2)
            dateandtime = datetime.now().strftime('%Y%m%d%H%M%S')
            Temp3 = "3=" + Temp1[0] + "4=" + Temp1[1] + "5=" + Temp1[2]
            temp3 = temp[2]
            Temp4 = temp3.split("&")
            Temp5 = "7=" + Temp4[0] + "8=" + Temp4[1] + "9=" + Temp4[2] + "10" + Temp4[3] + "11=" + Temp4[4] + "12=" + \
                    Temp4[5] + "13=" + Temp4[6] + "14=" + Temp4[7] + "15=" + Temp4[8] + "16=" + Temp4[9] + "17=" +\
                    Temp4[10]
            Test.objects.create(Device=Temp1[0], MAC_ID=Temp1[1], Key=Temp1[2], Username=Temp4[0], UsageDateAndTime=Temp4[1],
            Temperature=Temp4[2], pHin=Temp4[3], TDSin=Temp4[4], pHout=Temp4[5], TDSout=Temp4[6], MotorONInSeconds=Temp4[7],
            VolumeSampled=Temp4[8], NoOfHourUsed=Temp4[9], CartridgeLifeLeft=Temp4[10])
            return HttpResponse('RIS=*' + dateandtime + "<'. " + dateandtime + str(pk) + strdata + Temp3 + ".'>")
        else:
            temp2 = temp[1]
            Temp1 = temp2.split("@", 2)
            dateandtime = datetime.now().strftime('%Y%m%d%H%M%S')
            query_results = Test.objects.filter(MAC_ID=Temp1[1]).order_by("-CreatedAt")[:1].values("MAC_ID", "Data",
                                                                                                   "Device",
                                                                                                   "Key")
            strTemp = str(query_results[0])
            strTempList = strTemp.split("'")
            mac = str(strTempList[3])
            data = str(strTempList[7])
            return HttpResponse('RIS=*' + dateandtime + "<'. " + dateandtime + mac + "&" + data + ".'>")


def login(request):
    return render(request, 'home/login.html')


def register(request):
    form = ProjectForm

    if request.method == "POST":
        form = ProjectForm(request.POST)
        if form.is_valid():
            form.save()

    context = {'form': form}
    return render(request, 'home/registration.html', context)


def index(request):

    query_results = Test.objects.all().order_by("-CreatedAt")[:10]
    query_result = Test.objects.all().order_by("-CreatedAt")[:1]
    context = {'query_results_json': serializers.serialize('json', query_results),
               "query_results": query_results,
               "query_result": query_result}
    return render(request, 'home/index.html', context)


def maps(request):
    return render(request, 'home/maps.html')


def reports(request):
    query_results = Test.objects.all().order_by("-CreatedAt")
    query_result = Test.objects.all().order_by("-CreatedAt")[:10]
    context = {'query_results_json': serializers.serialize('json', query_results), "query_result": query_result}
    return render(request, "home/reports.html", context)


def profile(request):
    query_results = Project.objects.all()
    context = {"query_results": query_results}
    return render(request, 'home/profile.html')


def help(request):
    return render(request, 'home/faq.html')
