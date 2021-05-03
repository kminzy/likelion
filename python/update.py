# 유저 DB를 갱신하는 프로그램

# 유저의 정보를 담을 dictionary 변수 선언
dicUser = {}

# 유저의 정보를 입력받을 userinfo함수 생성
def userinfo(comment):
    val = input(comment)
    return val

# 이름, 나이, 연락처를 userinfo함수를 통해 입력받음
name = userinfo("이름 : ")
age = userinfo("나이 : ")
phone = userinfo("연락처 : ")

# 초기에 선언했던 dictionary변수에 입력받은 유저의 정보 업데이트
dicUser.update({'name':name}) # key:name / value:입력받은 이름
dicUser.update({'age':age}) # key:age / value:입력받은 나이
dicUser.update({'phone':phone}) # key:phone / value:입력받은 연락처

# 업데이트된 dicUser 출력
print(dicUser)