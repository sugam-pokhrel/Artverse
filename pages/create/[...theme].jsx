import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Login from '../../compos/Login/Login';
import { data } from 'autoprefixer';
import Preview from '../../compos/Portfolio/Preview';



function Thems() {
  const session = useSession();
  var router = useRouter();
  var [preview, setPreview] = React.useState(false);
  const [prot, setport] = useState(true)

  useEffect(() => {
    async function fetchingData() {
      try {
        const response = await fetch('/api/portfolio/check');
        const data = await response.json();
        console.log(data)
        setport(data);
      } catch (error) {
        // Handle errors
      }
    }

    fetchingData();
  }, []);
  useEffect(() => {
    if (router.query.theme) {
      var params = router.query.theme;
      if (params.length === 2 && params[1] == 'preview') {
        setPreview(true);
      } else {
        setPreview(false);
      }

    }
  }, [router.query.theme]);

  if (session) {
    const [userData, setUserData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const [websiteDets, setWebsiteDets] = React.useState({
      websiteDetail: {
        title: '',
      },
      landing: {
        bgImg: '',
        heading: '',
        subHeading: '',
      },
      about: {
        heading: '',
        aboutImage: '',
        aboutDesc: '',
      },
      project: '',
      contact: '',
    });

    function fetchInfos(e) {
      const { name, bgImg, bio, image, projects, email, location } = e;
      if (!prot) {
        setWebsiteDets({
          ...websiteDets,
          websiteDetail: {
            ...websiteDets.websiteDetail,
            title: name ? `${name}'s Portfolio` : ''
          },
          landing: {
            ...websiteDets.landing,
            bgImg: bgImg || '',
            heading: name ? `Hello, I am ${name}` : '',
            subHeading: bio || ''
          },
          about: {
            ...websiteDets.about,
            heading: 'About Me',
            aboutImage: image || '',
            aboutDesc: bio || ''
          },
          project: {
            ...websiteDets.project,
            heading: 'My Projects',
            projects: projects || ''
          },
          contact: {
            ...websiteDets.contact,
            heading: 'Contact Me',
            email: email || '',
            location: location || ''
          }
        });
      }


    }



    useEffect(() => {
      if (session.status === 'authenticated') {
        getUserData();
      }
      if (session.status === 'unauthenticated') {
        router.push('/login');
      }
    }, [session.status]);

    function getUserData() {
      fetch("/api/users/getloggedin")
        .then(res => res.json())
        .then(data => {
          setUserData(data.user[0]);
          checkInfostatus(data.user[0]);
          console.log(userData)
          setLoading(false);
          if (!prot) {
            fetchInfos(data.user[0]);

          }

          fetch('/api/portfolio/' + data.user[0].email)
            .then(res =>

              res.json()

            )
            .then(data => {



              const updatedWebsiteDets = {
                ...websiteDets,
                websiteDetail: {
                  title: data.websiteDetailtitle || '',
                },
                landing: {
                  bgImg: data.landingbgImg || '',
                  heading: data.landingheading || '',
                  subHeading: data.landingsubHeading || '',
                },
                about: {
                  heading: data.aboutheading || '',
                  aboutImage: data.aboutaboutImage || '',
                  aboutDesc: data.aboutaboutDesc || '',
                },
                project: data.projectheading || '',
                contact: data.contactheading || '',
              };

              setWebsiteDets(updatedWebsiteDets);
              console.log(websiteDets)


            })
        });


    }


    useEffect(() => {
      if (prot) {

        getUserData()
      }



    }, []);






    const [infoStatus, setInfoStatus] = React.useState(0);

    function checkInfostatus(data) {
      let count = 0;
      if (data.name) {
        count = count + 1;
      }
      if (data.email) {
        count = count + 1;
      }
      if (data.bio) {
        count = count + 1;
      }
      if (data.location) {
        count = count + 1;
      }
      if (data.profession) {
        count = count + 1;
      }

      let percent = (count / 5) * 100;
      percent = Math.round(percent);
      setInfoStatus(percent);
      if (percent !== 100) {
        router.push('/');
      }
    }

    function setWebsiteDetail(e) {
      setWebsiteDets({
        ...websiteDets,
        websiteDetail: {
          ...websiteDets.websiteDetail,
          title: e.target.value,
        },
      });
    }

    function addDb() {
      let requestBody = { email: session.data.user.email, landingbgImg: websiteDets.landing.bgImg }

      let objectsToAdd = websiteDets;
      for (const [name, value] of Object.entries(objectsToAdd)) {
        if (Object.keys(value).length > 0) {
          for (const [key, val] of Object.entries(value)) {
            if (val.trim() !== "") {
              requestBody[name + key] = val;
            }
          }
        }
      }
      delete requestBody.project0;
      delete requestBody.project1;
      delete requestBody.project3;
      delete requestBody.project4;
      delete requestBody.project5;
      delete requestBody.project6;
      delete requestBody.project7;
      delete requestBody.project8;
      delete requestBody.project9;
      delete requestBody.project10;
      delete requestBody.contact0;
      delete requestBody.contact1;
      delete requestBody.contact2;
      delete requestBody.contact3;
      delete requestBody.contact4;
      delete requestBody.contact5;
      delete requestBody.contact6;
      delete requestBody.contact8;
      delete requestBody.contact9;


      let url = '/api/portfolio/' + session.data.user.email;

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          console.log(data);
        })
        .catch((error) => {
          // Handle the error
          console.error('Error:', error);
        });



      // Save data to the database or perform other actions
    }

    function seePreview() {
      addDb()
      router.push(router.query.theme[0] + "/preview")
    }

    return (
      <div className='pf-home'>
        {(!preview) && <div className="pf-left">
          <div className="pl-header">
            <h2>Add your Data</h2>
          </div>
          <div className="pf-data">
            <div className="pd-wrap">
              <h3>Website Detail</h3>
              <div className="pd-input">
                <p>Website's Title</p>
                <input
                  type="text"
                  placeholder="Enter your website's title"
                  value={websiteDets.websiteDetail.title}
                  onChange={(e) =>
                    setWebsiteDets({
                      ...websiteDets,
                      websiteDetail: {
                        ...websiteDets.websiteDetail,
                        title: e.target.value
                      }
                    })
                  }
                />
              </div>
            </div>
            <div className="pd-wrap">
              <h3>Landing page</h3>
              <div className="pd-input">
                <p>Background Image Url</p>
                <input
                  type="text"
                  placeholder="Enter your background's url"
                  value={websiteDets.landing.bgImg}
                  onChange={(e) =>
                    setWebsiteDets({
                      ...websiteDets,
                      landing: { ...websiteDets.landing, bgImg: e.target.value }
                    })
                  }
                />
              </div>
              <div className="pd-input">
                <p>Landing Heading Text</p>
                <input
                  type="text"
                  placeholder="Enter Landing Heading Text"
                  value={websiteDets.landing.heading}
                  onChange={(e) =>
                    setWebsiteDets({
                      ...websiteDets,
                      landing: { ...websiteDets.landing, heading: e.target.value }
                    })
                  }
                />
              </div>
              <div className="pd-input">
                <p>Landing Sub Heading Text</p>
                <input
                  type="text"
                  placeholder="Enter Landing Sub Heading Text"
                  value={websiteDets.landing.subHeading}
                  onChange={(e) =>
                    setWebsiteDets({
                      ...websiteDets,
                      landing: { ...websiteDets.landing, subHeading: e.target.value }
                    })
                  }
                />
              </div>
            </div>
            <div className="pd-wrap">
              <h3>About</h3>
              <div className="pd-input">
                <p>About Heading Text</p>
                <input
                  type="text"
                  placeholder="Enter About Heading Text"
                  value={websiteDets.about.heading}
                  onChange={(e) =>
                    setWebsiteDets({
                      ...websiteDets,
                      about: { ...websiteDets.about, heading: e.target.value }
                    })
                  }
                />
              </div>
              <div className="pd-input">
                <p>About Image Url</p>
                <input
                  type="text"
                  placeholder="Enter About Image Url"
                  value={websiteDets.about.aboutImage}
                  onChange={(e) =>
                    setWebsiteDets({
                      ...websiteDets,
                      about: { ...websiteDets.about, aboutImage: e.target.value }
                    })
                  }
                />
              </div>
              <div className="pd-input">
                <p>About Description</p>
                <textarea
                  cols="30"
                  rows="10"
                  value={websiteDets.about.aboutDesc}
                  onChange={(e) =>
                    setWebsiteDets({
                      ...websiteDets,
                      about: { ...websiteDets.about, aboutDesc: e.target.value }
                    })
                  }
                  placeholder="Enter About Description"
                ></textarea>
              </div>
            </div>
            <div className="pd-wrap">
              <h3>Projects</h3>
              <p>
                Projects will automatically be fetched from your profile. To add more
                projects here, upload them from the Homepage.
              </p>
              <button className="btn btn-primary" onClick={() => router.push("/upload")}>
                Upload Project
              </button>
            </div>
            <div className="pd-wrap">
              <h3>Contact Details</h3>
              <p>
                Contact details will automatically be fetched from your profile.
                Review or edit them from the profile page.
              </p>
              <button className="btn btn-primary" onClick={() => router.push("/profile/edit")}>
                Edit Profile
              </button>
            </div>
            <div className="pd-wrap pd-btns">
              <button onClick={addDb} className="btn btn-warning">
                Save
              </button>
              <button onClick={seePreview} className="btn btn-info">
                preview
              </button>
            </div>
          </div>
        </div>}
        {preview && <Preview data={websiteDets} user={userData} theme={router.query.theme[0]} />}
      </div>
    )
  }
  else {
    return <Login />
  }

}

export default Thems