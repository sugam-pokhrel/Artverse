import React, { useEffect } from 'react'

function Upload() {
    var [page, setPage] = React.useState(1)
    const [image, setImage] = React.useState(null)
    function openFile() {
        document.getElementById('open').click()
    }
    function imageDone(e) {
        console.log(e.files[0])
        // check if the file is an image
        if (e.files[0].type.includes('image')) {
            setPage(2)
            setImage(e.files[0])
        } else {
            alert('Please upload an image.')
        }
    }



    useEffect(() => {
        document.title = 'Upload | Artverse'
    }, [])


    return (
        <>
            {(page == 1) && <div className='hero h-screen flex items-center flex-col justify-center '>
                <h2 className='text upload-title md:text-2xl text-sm font-bold py-10'> <span>1/2</span> Add a suitable thumbnail of your project.</h2>
                <div className="flex md:w-3/5 w-11/12 h-3/5  border border-dotted">
                    <div className="flex flex-col upload hover:bg-primary ease-out duration-300" onClick={openFile}>
                        <img className='upimg' src="https://www.freeiconspng.com/uploads/multimedia-photo-icon-31.png" alt="" />
                        <p>Please upload a picture that is attractive for other users.</p>
                        <input type="file" name='image' id='open' onChange={(e) => imageDone(e.target)} />
                    </div>
                </div>
            </div>}
            {(page == 2) && <div className='hero h-screen flex items-center flex-col justify-center '>
                <h2 className='text upload-title md:text-2xl text-xl font-bold py-10'> <span>2/2</span> Add title and Description about your project.</h2>
                <div className="flex md:w-3/5 w-11/12 h-5/6  border border-dotted">
                    <div className="flex py-10 gap-3 flex-col upload ease-out duration-300" >
                        <input type="text" className='outline-none border-none input bg-gradient-to-r from-transparent w-full to-transparent uploadInput' placeholder='Give a suitable Title' />
                        <img className='w-100 h-3/6' src={URL.createObjectURL(image)} alt="" />
                        <textarea name="desc" id="upload-textarea" placeholder='Describe your Project under 2000 words' cols="30" rows="10"></textarea>
                        <button className='bg-primary text-white py-2 px-4 rounded-md'>Upload</button>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default Upload