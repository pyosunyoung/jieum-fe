import React, { useState } from 'react'
import "./AcceptMemberPage.style.css"
import AcceptMemberRow from './components/AcceptMemberRow';
import UnacceptMemberRow from './components/UnacceptMemberRow';

const AcceptMemberPage = () => {
    const [acceptedList,setAcceptedList] = useState([ //승인된 인원들
        {name: "표선영", passionTemp: 31, fightingMessage:"성실하게 참여하겠습니다"},
    ]);
    const [unacceptedList,setUnacceptedList] = useState([ //아직 승인 안 된 인원들
        {name: "박정효", passionTemp: 33, fightingMessage:"꼭 함께 하고 싶습니다!"},
        {name: "김주은", passionTemp: 28, fightingMessage:"함께 끝까지 하고 싶어요!"},
        {name: "고하늘", passionTemp: 36, fightingMessage:"화이팅입니다!!"},
    ]);

    const handleRefuse=()=>{ //거절 버튼 누를 때

    }
    const handleAccept=()=>{ //승인 버튼 누를 때

    }

  return (
    <div className='accept-member-page'>
        <div className='member-page-subject'>웹프로그래밍</div>
        
        <div className='accept-member-container'>
            <div className='accepted-member-section'>
                <div className='accept-title main-color-title'>승인</div>
                {acceptedList.map((member)=>(
                    <AcceptMemberRow member={member}/>
                ))}
            </div>
            

            <div className='unaccepted-member-section'>
                <div className='accept-title gray-title'>미승인</div>
                {unacceptedList.map((member)=>(
                    <UnacceptMemberRow member={member} handleRefuse={handleRefuse} handleAccept={handleAccept}/>
                ))}
            </div>
            
        </div>
    </div>
  )
}

export default AcceptMemberPage
