# 과일채소가게 상품관리 프로그램

# 과일, 채소 초기 list 선언
fruit = ['사과', '오렌지', '파인애플', '망고']
vegetable = ['당근', '호박', '가지', '양파']

# 사용자로부터 입력을 받는 함수
def WriteItem(item):
    val = input(item)
    return val

# 카테고리 구분 및 상품 등록여부 구분 후 리스트에 추가하는 함수
def ExistItem(val):
    if (cate == '채소'):
        if (val in vegetable):
            print("이미 등록된 채소입니다. \n")
        else:
            vegetable.append(val)
    elif (cate == '과일'):
        if(val in fruit):
            print("이미 등록된 과일입니다. \n")
        else:
            fruit.append(val)

# 결과 리스트 출력하는 함수
def GetShowList():
    print(fruit, "\n", vegetable, "\n")

# 사용자로부터 카테고리 입력받음
cate = input("등록할 카테고리를 입력해주세요(과일, 채소) : ")

# 정확한 카테고리명을 입력했을 경우 상품명 입력 및 등록여부 구분하여 리스트에 추가
if (cate == '과일' or cate == '채소'):
    if(cate == '과일'):
        fruit_input = WriteItem("등록할 과일의 상품명을 입력하세요 : ")
        ExistItem(fruit_input)
    else:
        vegetable_input = WriteItem("등록할 채소의 상품명을 입력하세요 : ")
        ExistItem(vegetable_input)
else: # 정확하지 않은 카테고리명을 입력했을 경우 출력
  print("존재하지 않는 카테고리 입니다. \n")

# 결과 리스트 출력
GetShowList()