// app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      {/* Add some dummy content to make the page scrollable */}
      <div className="mt-16 h-[1000px] bg-white w-full max-w-2xl rounded-lg shadow-md flex items-center justify-center">
        <p className="text-xl text-gray-600">Scrollable Content Area</p>
      </div>
    </main>
  )
}