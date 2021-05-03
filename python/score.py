# 시험 점수 자동 채점 프로그램

# 초기값 설정
cut = 65
maximum = 100
minimum = 0

# 과목별 점수 입력받음
num1 = int(input("창사코 : "))
num2 = int(input("선형대수 : "))
num3 = int(input("컴퓨터공학 : "))

# 입력받은 점수 출력
print(num1, num2, num3)

# 100보다 큰 수를 입력받으면 잘못 입력되었다고 출력
if(num1 > maximum or num2 > maximum or num3 > maximum):
    print("잘못된 점수가 입력되었습니다.")
# 0보다 작은 수를 입력받으면 잘못 입력되었다고 출력
elif(num1 < minimum or num2 < minimum or num3 < minimum):
    print("잘못된 점수가 입력되었습니다.")
# 모든 과목의 점수가 65점 이상일 때 합격
elif(num1 > cut and num2 > cut and num3 > cut):
    print("합격입니다.")
# 그렇지 않으면 불합격
else:
    print("불합격입니다. 재수강하세요.")
