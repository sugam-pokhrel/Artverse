import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Login from '../Login/Login';

function TalentCard({ data }) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [auth, setAuth] = useState(false);
  const [followCount, setFollowCount] = useState(data?.followers.length);
  const [isLoading, setIsLoading] = useState(true);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === 'authenticated') {
      setAuth(true);
    }
  }, [session]);

  const fetchData = async () => {
    if (!session || !data?.email) return;

    try {
      const url = '/api/follow/' + data.email;
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      const emailExists = json.follow.includes(session.data.user.email);
      setIsFollowed(emailExists);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [session, data?.email]);

  useEffect(() => {
    const getPosts = () => {
      fetch('/api/post/getpostbyEmail?email=' + data.email)
        .then((res) => res.json())
        .then((data) => {
          setLength(data.post.length);
        });
    };

    getPosts();
  }, [data.email]);

  function followUser() {
    setFollowCount((prevCount) => (isFollowed ? prevCount - 1 : prevCount + 1));
    setIsFollowed((prevIsFollowed) => !prevIsFollowed);

    const url = '/api/follow/' + data.email;
    if (auth) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likedby: session.data.user.email }),
      })
        .then((res) => {
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            return res.json();
          } else {
            return 0;
          }
        })
        .then((data) => {
          console.log(data);
        });
    }
  }

  var [length, setLength] = useState(0);

  function navigateToUser() {
    var email = data.email;
    var username = email.slice(0, email.indexOf('@'));
    router.push('/u/' + username);
  }

  if (!session) {
    return <Login />;
  }
      {!isLoading && (
        <>
          <div className='tc-data'>
            <div className='tc-img'>
              <img src={data.image} onClick={navigateToUser} alt={data.name} referrerPolicy='no-referrer' />
            </div>
            <div className='tc-name'>
              <p className='text-2xl font-bold' onClick={navigateToUser}>
                {data.name}
              </p>
              <p className='text-xl'>
                {data?.profession || 'Student'} . {followCount} Followers
              </p>
              <p className='text-xl'>{length} Projects . 0 Blogs</p>
            </div>
          </div>
          <div className='tc-fc'>
            {auth && (
              <div className='fc-btn btn btn-primary' onClick={followUser}>
                {isFollowed ? 'Unfollow' : 'Follow'}
              </div>
            )}
            <div className='fc-btn btn btn-warning' onClick={navigateToUser}>
              Visit Profile
            </div>
          </div>
        </>
      )}

  return (
    <div className='talent-card'>
      <div className='tc-data'>
        <div className='tc-img'>
          <img src={data.image} onClick={navigateToUser} alt={data.name} referrerPolicy='no-referrer' />
        </div>
        <div className='tc-name'>
          <p className='text-2xl font-bold' onClick={navigateToUser}>
            {data.name}
          </p>
          <p className='text-xl'>
            {data?.profession || 'Student'} . {followCount} Followers
          </p>
          <p className='text-xl'>{length} Projects . 0 Blogs</p>
        </div>
      </div>
      <div className='tc-fc'>
        {auth && (
          <div className='fc-btn btn btn-primary' onClick={followUser}>
            {isFollowed ? 'Unfollow' : 'Follow'}
          </div>
        )}
        <div className='fc-btn btn btn-warning' onClick={navigateToUser}>
          Visit Profile
        </div>
      </div>
    </div>
  );
}

export default TalentCard;
