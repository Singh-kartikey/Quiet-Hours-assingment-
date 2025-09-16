import Navbar from "./components/navbar";
export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-amber-500 text-white px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Quiet Hours Scheduler</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          Plan your silent-study blocks and stay focused. Get reminders via email so you never miss your quiet hours!
        </p>

        {/* Big Button to /create-new */}
        <a
          href="/create-new"
          className="px-10 py-5 bg-white text-amber-500 text-xl font-bold rounded-full shadow-lg hover:bg-gray-100 transition duration-200"
        >
          Create New Block
        </a>
      </section>


      {/* Features Section */}
      {/* Features Section */}
      <section className="py-16 bg-gray-100 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Features</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Create Silent Blocks</h3>
            <p className="text-gray-700">Set your study sessions and focus time with ease.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Email Reminders</h3>
            <p className="text-gray-700">Get notified 10 minutes before your quiet block starts.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Track Your Focus</h3>
            <p className="text-gray-700">Stay organized and improve productivity over time.</p>
          </div>
        </div>
      </section>


      {/* About / Call-to-Action */}
      <section className="py-16 bg-amber-500 text-white px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Focus?</h2>
        <p className="mb-6">Sign up now and start scheduling your quiet hours!</p>

      </section>
    </>
  );
}
