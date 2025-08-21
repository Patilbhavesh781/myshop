import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-yellow-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-yellow-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-md font-semibold"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline"
          >
            Create an account
          </button>
        </div>

        <div className="mt-2 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
