import {useRouter} from 'next/router';

export const Toolbar = () =>{
    const router = useRouter();

    return (
        <div className="w-full fixed  bg-gray-200 max-h-16 p-2 mb-4 flex justify-center justify-items-center text-2xl font-bold ">
            <div className="m-2 cursor-pointer hover:bg-gray-500 " onClick= {()=>router.push('/')}>Home</div>
            <div className="m-2 cursor-pointer hover:bg-gray-500 " onClick= {()=>router.push('/feed/1')}>Feed</div>
            <div className="m-2 cursor-pointer hover:bg-gray-500 " onClick= {()=>router.push('/profile')}>Profile</div>
            <div className="m-2 cursor-pointer hover:bg-gray-500 " onClick= {()=> window.location.href = 'https://www.google.com'}>Google</div>
        </div>
    )
}