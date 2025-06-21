// components/booking/PicInfo.tsx
'use client'; // This directive is necessary for client-side interactivity in App Router

export default function PicInfo() {

    return(
        <>
            <div className="mt-2 h-[343px] bg-white w-full max-w-8xl rounded-lg shadow-md p-6 flex flex-row">
                <div className="w-28"><p className="text-md">PIC Info</p></div>
                <div className="w-full h-1 bg-black" />
            </div>
        </>
    )
}
