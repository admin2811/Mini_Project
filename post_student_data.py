import requests
import json

# URL cơ bản của API
base_url = "http://127.0.0.1:8080/api/post-student-data/"

# Nhập dữ liệu từ terminal
print('Tên học sinh: ')
student_name = input()
print('Điểm tổng kết môn QT HTTT: ')
result_MIS = float(input())
print('Kỹ năng lập trình: ')
level_programs_skill = input()
print('Kỹ năng làm việc nhóm: ')
team_work_skill = input()
print('Sở thích làm việc: ')
priority_work = input()
print('Giới tính: ')
student_gender = input()
print('Vai trò muốn nhận: ')
priority_role = input()

# Tạo payload JSON
data = {
    "student_name": student_name,
    "result_MIS": result_MIS,
    "level_programs_skill": level_programs_skill,
    "team_work_skill": team_work_skill,
    "priority_work": priority_work,
    "student_gender": student_gender,
    "priority_role": priority_role,
}

# Gửi request POST với payload JSON
try:
    headers = {'Content-Type': 'application/json'}
    response = requests.post(base_url, data=json.dumps(data), headers=headers)
    
    print("Response Status Code:", response.status_code)
    
    # Ghi dữ liệu trả về ra file JSON
    if response.status_code == 200:
        with open('student_data.json', 'w', encoding='utf-8') as json_file:
            json_file.write(response.text)
        print("File JSON đã được lưu: student_data.json")
    else:
        print("Response:", response.text)
except requests.exceptions.RequestException as e:
    print("Error:", e)