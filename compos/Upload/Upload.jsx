import React, { useEffect, useState } from 'react'
import { storage, databases } from '../../appwrite'
import { ID } from 'appwrite'
import { useRouter } from 'next/router'

function Upload(props) {
    var [page, setPage] = React.useState(1)
    const [image, setImage] = React.useState(null)
    const [postData, setPostData] = useState({ title: '', desc: '' })
    var router = useRouter()
    const textChanged = e => {
        setPostData({
            ...postData, [e.target.name]: e.target.value
        })
    }

    const id = ID.unique()
    function openFile() {
        document.getElementById('open').click()
    }
    function imageDone(e) {

        const selectedFile = e.files[0];
        const customFileName = props.title.email;
        const modifiedFile = new File([selectedFile], customFileName, {
            type: selectedFile.type,
            lastModified: selectedFile.lastModified,
        });

        // check if the file is an image
        if (e.files[0].type.includes('image')) {
            setPage(2)
            setImage(modifiedFile)
        } else {
            alert('Please upload an image.')
        }
    }
    var [loading, setLoading] = React.useState(false)



    useEffect(() => {
        document.title = 'Upload | Artverse'
    }, [])


    const uploadImage = (e) => {
        setLoading(true)
        if (image) {
            e.preventDefault();

            const promise = storage.createFile(
                '646ebfc7beadb77d8861',
                id,
                image
            );

            promise.then(function (response) {
                console.log(response); // Success
                const result = storage.getFileView('646ebfc7beadb77d8861', response.$id);
                console.log(result)
                const promisex = databases.createDocument('646ed509771c8bf97447', '646ed512bc1b4def6d45', ID.unique(), { createdBy: props.title.email, title: postData.title, desc: postData.desc, image: result.href })


                promisex.then(function (response) {
                    router.push("/p/" + response.$id); // Success
                }, function (error) {
                    setLoading(false)
                    console.log(error); // Failure
                    alert("Your post couldn't be uploaded. Description cannot be greater than 900 words. Shortern it and try again")
                });
            }, function (error) {
                console.log(error); // Failure
            });

        }


    }


    return (
        <>
            {(!loading && page == 1) && <div className='hero h-screen flex items-center flex-col justify-center '>
                <h2 className='text upload-title md:text-2xl text-sm font-bold py-10'> <span>1/2</span> Add a suitable thumbnail of your project.</h2>
                <div className="flex md:w-3/5 w-11/12 h-3/5  border border-dotted">
                    <div className="flex flex-col upload hover:bg-primary ease-out duration-300" onClick={openFile}>
                        <img className='upimg' src="https://www.freeiconspng.com/uploads/multimedia-photo-icon-31.png" alt="" />
                        <p>Please upload a picture that is attractive for other users.</p>
                        <input type="file" name='image' id='open' onChange={(e) => imageDone(e.target)} />
                    </div>
                </div>
            </div>}
            {(!loading && page == 2) && <div className='hero h-screen flex items-center flex-col justify-center '>
                <h2 className='text upload-title md:text-2xl text-xl font-bold py-10'> <span>2/2</span> Add title and Description about your project.</h2>
                <div className="flex md:w-3/5 w-11/12 h-5/6  border border-dotted">
                    <div className="flex py-10 gap-3 flex-col upload ease-out duration-300" >
                        <input onChange={e => { textChanged(e) }} name='title' required type="text" className='focus:bg-base-300 p-5 rounded-none outline-none border-none input bg-gradient-to-r from-transparent w-full to-transparent uploadInput' placeholder='Give a suitable Title' />
                        <img className='w-100 h-3/6' src={URL.createObjectURL(image)} alt="" />
                        <textarea onChange={e => { textChanged(e) }} required name="desc" id="upload-textarea" className='text focus:bg-base-300 p-5' placeholder='Describe your Project under 2000 words, add Hasgtags for better reach' cols="30" rows="10"></textarea>
                        <button onClick={(e) => { uploadImage(e) }} className='bg-primary text-white py-2 px-4 rounded-md'>Upload</button>
                    </div>
                </div>
            </div>
            }
            {(loading) && <div className="loading">
                <div className="lds-ripple"><div></div><div></div></div>
                <p className='text sm:text-2xl text-xl'> Your post is being uploaded to server.</p>
            </div>}


        </>
    )
}

export default Upload