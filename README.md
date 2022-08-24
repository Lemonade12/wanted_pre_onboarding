# wanted_pre_onboarding

Node.js / Sequelize / postgreSQL

### 1. 채용공고 등록
#### request
```
{
    "company_id": 2,
    "position": "Nodejs 백엔드 개발",
    "compensation": 1000000,
    "content": "네이버에서 백엔드 개발자를 채용합니다",
    "skill": "Nodejs"
}
```
#### response
존재하지 않는 회사 => res.status : 404, message : 'COMPANY IS NOT FOUND'
성공 시 => res.status : 200, message : 'OPENING IS CREATED'

### 2. 채용공고 수정
#### request
채용공고id를 req.params, 수정하고 싶은내용은 body로 받는다
```
{
    "skill": "Django"
}
```
#### response
존재하지않는공고 => res.status : 404, message : 'OPENING IS NOT FOUND'
compnay_id를 수정하려고 하는 경우 => res.status : 403, message : 'CAN NOT UPDATE COMPANY_ID'

성공 시 => res.status : 200, message : 'OPENING IS UPDATED'


### 3. 채용공고 삭제
채용공고id를 받아서 해당 공고를 삭제(db에서 삭제이므로 soft delete로 구현하지는 않음)
#### request
채용공고id를 req.params 으로 받는다

#### response
성공 시 => res.status : 200, message : 'OPENING IS DELETED'
존재하지않는공고 => res.status : 404, message : 'OPENING IS NOT FOUND'

### 4. 채용공고 목록(4-1,4-2)
job_opening table 과 company table 을 조인하여 검색어가 없을 경우 모든 목록을 불러오고 검색어가 있을 경우 회사명, 기술 컬럼에서 해당 검색어를 포함하는 공고 목록만 불러옴, 채용공고id순 오름차순

#### request
search 값을 req.query 으로 받는다

#### response
'원' 으로 검색 시 :
```
[
    {
        "채용공고_id": 4,
        "회사명": "원티드랩",
        "국가": "한국",
        "지역": "서울",
        "채용포지션": "백엔드 주니어 개발",
        "채용보상금": 1000000,
        "사용기술": "Python"
    },
    {
        "채용공고_id": 7,
        "회사명": "원티드랩",
        "국가": "한국",
        "지역": "서울",
        "채용포지션": "Django 백엔드 개발",
        "채용보상금": 1000000,
        "사용기술": "Django"
    },
    {
        "채용공고_id": 8,
        "회사명": "원티드랩",
        "국가": "한국",
        "지역": "서울",
        "채용포지션": "Nodejs 백엔드 개발",
        "채용보상금": 1000000,
        "사용기술": "Nodejs"
    }
]
```

### 5. 채용 상세 페이지
채용공고id를 받아서 job_opening table과 company table 을 조인하여 채용내용 까지 가져오고, 해당 채용공고의 company.id 값을 통해 job_opening table에서 해당 회사의 채용공고 목록(해당 채용공고는 제외)을 가져옴(채용공고id순 오름차순)

#### request
채용공고id를 req.params.id 로 받는다
#### response
성공 시 => res.status : 200 , data :
```
{
    "채용공고_id": 4,
    "회사명": "원티드랩",
    "국가": "한국",
    "지역": "서울",
    "채용포지션": "백엔드 주니어 개발",
    "채용보상금": 1000000,
    "사용기술": "Python",
    "채용내용": "원티드랩에서 백엔드 주니어 개발자를 채용합니다.",
    "회사가올린다른채용공고": [
        7,
        8
    ]
}
```
존재하지않는공고 => res.status : 404, message : 'OPENING IS NOT FOUND'

### 6. 채용공고 지원
유저는 한개의 채용공고에 한번만 지원할 수 있으므로, user_id와 opening_id를 받아서 먼저 해당 공고가 존재하는지 체크 => 지원내역이 있는지 체크 후 create 해주었다

#### request
user_id 는 req.body.user_id
opening_id 는 req.params.id

#### response
존재하지않는공고 => res.status : 404, message : 'OPENING IS NOT FOUND'
이미지원한공고 => res.status : 409, message : 'APPLY IS ALREADY EXISTED'
