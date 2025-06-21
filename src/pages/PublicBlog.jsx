import { get, getDatabase, onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'

const PublicBlog = () => {
const [dataArray, setDataArray] = useState([]);
    const db = getDatabase();

    // const blogRef = get()


    // //console.log(blogRef);
    // blogRef.then((userInfo)=>{
    //     console.log(userInfo.val())
    // })

    //now to fetch data from firebase
    useEffect(() => {
        const dataRef = ref(db, 'users/uploadedBlog');

        const unsubscribe = onValue(dataRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            // Convert the object of objects from Firebase into an array
            const newArray = Object.keys(data).map(key => ({
              id: key, // Use the Firebase key as an ID
              ...data[key]
            }));
            setDataArray(newArray);
          } else {
            setDataArray([]); // Handle empty data
          }
        });
        

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
      }, []);
      console.log(dataArray)
  return (
    <div>
        <div>Public Blog</div>
        {dataArray.map((item)=>(
            <div className='flex items-start gap-6'>
                <div className='border bg-sky-300 flex justify-between items-start flex-col gap-6'>
                    <div>{item.title}</div>
                    <div>
                        <img className='w-[100px] h-[200px]' src={item.image} alt="" />
                    </div>
                    <div>{item.description}</div>
                    <div>{item.createdAt}</div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default PublicBlog