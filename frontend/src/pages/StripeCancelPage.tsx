import { Link } from "react-router-dom";

const StripeCancelPage = () => {
  return (
    <div className="w-full flex flex-col  justify-center items-center leading-8">
      <h1 className="text-2xl ">Payment Cancelled</h1>
      <p className="my-3">Please subscribe to a plan!</p>

      <button>
        <Link className="bg-gray-800 text-white px-4 py-2 rounded-lg" to="/">
          Back Home
        </Link>
      </button>
    </div>
  );
};

export default StripeCancelPage;
