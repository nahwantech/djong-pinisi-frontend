import PicInfo from "../../components/booking/PicInfo";
import TravelerInfo from "../../components/booking/TravelerInfo";

// app/booking/page.tsx
export default function Booking() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      {/* Add some dummy content to make the page scrollable */}
      <PicInfo />

      {/* Traveller Info */}
      <TravelerInfo />
    </main>
  )
}