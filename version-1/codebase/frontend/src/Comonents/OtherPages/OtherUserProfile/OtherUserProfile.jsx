import React from 'react'
import { useParams } from 'react-router-dom';
import OtherUserPageHeader from './OtherUserPageHeader';
import OtherUserPostCard from './OtherUserPostCard';
import OtherUserRightBar from './OtherUserRightBar';
import OtherUserLeftBar from './OtherUserLeftBar';

const OtherUserProfile = () => {
  const { userName, userId } = useParams();
  return (
    <div>
        <div>
            <OtherUserPageHeader userId={userId} userName={userName} />
            {/* <OtherUserRightBar userId={userId} userName={userName} /> */}
            <OtherUserPostCard userId={userId} userName={userName} />
            {/* <OtherUserLeftBar userId={userId} userName={userName} /> */}
        </div>
    </div>
  )
}

export default OtherUserProfile