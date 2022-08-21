# wanted_pre_onboarding

Node.js / Sequelize / postgreSQL

1. 채용공고 등록
job_opening table 에 채용공고를 create

2. 채용공고 수정
채용공고id를 req.params, 수정하고 싶은내용은 body로 받아서 job_opening table 에 채용공고를 update
존재하는 공고인지 체크, company_id 수정 못하도록

3. 채용공고 삭제
채용공고id를 받아서 해당 공고를 삭제(db에서 삭제이므로 soft delete로 구현하지는 않음)
존재하는 공고인지 체크

4. 채용공고 목록(4-1,4-2)
job_opening table 과 company table 을 조인하여 검색어가 없을 경우 모든 목록을 불러오고 검색어가 있을 경우 회사명 컬럼에서 해당 검색어를 포함하는 공고 목록만 불러옴
채용공고id순 오름차순

5. 채용 상세 페이지
채용공고id를 받아서 job_opening table과 company table 을 조인하여 채용내용 까지 가져오고, 해당 채용공고의 company.id 값을 통해 job_opening table에서 해당 회사의 채용공고 목록(해당 채용공고는 제외)을 가져옴
존재하는 공고인지 체크
해당회사의 채용공고 목록(채용공고id순 오름차순)

6. 채용공고 지원
유저는 한개의 채용공고에 한번만 지원할 수 있으므로, user_id와 opening_id를 받아서 해당 데이터가 있는지 체크 후 지원한 내역이 없는 경우 create 해주었음
